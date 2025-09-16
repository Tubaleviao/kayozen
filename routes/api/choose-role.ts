import { Handlers } from "$fresh/server.ts";
import { query } from "../../utils/db.ts"; // your db helper
import { DbUser } from "../../utils/interfaces.ts"

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const role = form.get("role")?.toString();

    if (!role) {
      return new Response("Role required", { status: 400 });
    }

    const user = ctx.state.dbUser as DbUser;
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await query("UPDATE people SET role = $1 WHERE id = $2", [
      role,
      user.id,
    ]);

    return Response.redirect(new URL("/dashboard", req.url));
  },
};
