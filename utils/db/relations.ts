
import { personRole } from "./schema/person-role.ts"
import { people } from "./schema/people.ts"
import { defineRelations } from "drizzle-orm/relations"
import { schools } from "./schema/schools.ts"
import { roles } from "./schema/roles.ts"

export const relations = defineRelations({people, personRole, roles, schools}, (r) => ({
	people: {
        roles: r.many.personRole({
            from: r.personRole.person,
            to: r.people.id
        }),
        schools: r.many.schools({
            from: r.schools.ownerId,
            to: r.people.id
        })
    }
}))
