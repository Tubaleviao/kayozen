import { defineRelations } from "drizzle-orm/relations"
import { people } from "./schema/people.ts"
import { personRole } from "./schema/person-role.ts"
import { roles } from "./schema/roles.ts"
import { schools } from "./schema/schools.ts"
import { lecture } from "./schema/lecture.ts"
import { lectureEmployee } from "./schema/lecture-employee.ts"
import { studentLecture } from "./schema/student-lecture.ts"
import { subject } from "./schema/subjects.ts"

export const relations = defineRelations(
	{
		people,
		personRole,
		roles,
		schools,
		lecture,
		lectureEmployee,
		studentLecture,
		subject,
	},
	(r) => ({
		people: {
			roles: r.many.personRole({
				from: r.people.id,
				to: r.personRole.person,
			}),
			schools: r.many.schools({
				from: r.people.id,
				to: r.schools.ownerId,
			}),
			employeeLectures: r.many.lectureEmployee({
				from: r.people.id,
				to: r.lectureEmployee.employee,
			}),
			studentLectures: r.many.studentLecture({
				from: r.people.id,
				to: r.studentLecture.student,
			}),
		},

		lecture: {
			subject: r.one.subject({
				from: r.lecture.subject,
				to: r.subject.id,
			}),
			school: r.one.schools({
				from: r.lecture.school,
				to: r.schools.id,
			}),
			employees: r.many.lectureEmployee({
				from: r.lecture.id,
				to: r.lectureEmployee.lecture,
			}),
			students: r.many.studentLecture({
				from: r.lecture.id,
				to: r.studentLecture.lecture,
			}),
		},

		lectureEmployee: {
			lecture: r.one.lecture({
				from: r.lectureEmployee.lecture,
				to: r.lecture.id,
			}),
			employee: r.one.people({
				from: r.lectureEmployee.employee,
				to: r.people.id,
			}),
		},

		studentLecture: {
			lecture: r.one.lecture({
				from: r.studentLecture.lecture,
				to: r.lecture.id,
			}),
			student: r.one.people({
				from: r.studentLecture.student,
				to: r.people.id,
			}),
		},

		subject: {
			lectures: r.many.lecture({
				from: r.subject.id,
				to: r.lecture.subject,
			}),
		},

		schools: {
			lectures: r.many.lecture({
				from: r.schools.id,
				to: r.lecture.school,
			}),
		},
	}),
)