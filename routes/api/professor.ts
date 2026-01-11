import { Handlers } from "$fresh/server.ts"
import { db } from "../../utils/db.ts"
import { makeUsername } from "../../utils/make_username.ts"
import { v1 } from "jsr:@std/uuid"
import { logError } from "../../utils/errors.ts"

interface Data {
    error?: string
    success?: boolean
}

export const handler: Handlers<Data> = { // needs to be protected in the future
    async POST(req, _ctx) {
        const form = await req.json()

        const { name, email, subject, schoolId } = form

        if (!name || !subject || !schoolId) {
            console.error("missing fields", name, subject, schoolId)
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
            })
        }

        try {

            // insert person_role, person_school
            const personId = v1.generate()

            await db.query(
                "INSERT INTO people (id, username, name, email) VALUES ($1, $2, $3, $4)",
                [personId, makeUsername(), name, email],
            )

            await db.query(
                "INSERT INTO subject (name) VALUES ($1)",
                [subject],
            )

            await db.query(
                "INSERT INTO person_role (person, role) VALUES ($1, $2)",
                [personId, 1],
            )

        } catch (err) {
            if (String(err).includes("duplicate key")) {
                return new Response(JSON.stringify({ error: "Email already exists" }), {
                    status: 400,
                })
            }
            logError(err)
            return new Response(JSON.stringify({ error: "Internal error" }), {
                status: 500,
            })
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
        })
    },

    async GET(_, ctx) {
        return await ctx.render({})
    },
}
