import { eq } from "drizzle-orm"
import { db } from "./index.ts"
import { KayoClass } from "../interfaces.ts"
import { classTable } from "./schema/class.ts"

export async function getSchoolClasses(
	schoolId: string,
): Promise<KayoClass[]> {
	const classes = await db
		.select({
			id: classTable.id,
			name: classTable.name,
		})
		.from(classTable)
		.where(eq(classTable.school, schoolId))

	return classes
}
