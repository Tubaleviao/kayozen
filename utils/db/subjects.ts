import { eq } from "drizzle-orm"
import { db } from "./index.ts"
import { KayoClass } from "../interfaces.ts"
import { subject } from "./schema/subjects.ts"

export async function getSchoolSubjects(
	schoolId: string,
): Promise<KayoClass[]> {
	const classes = await db
		.select({
			id: subject.id,
			name: subject.name,
		})
		.from(subject)
		.where(eq(subject.school, schoolId))

	return classes
}
