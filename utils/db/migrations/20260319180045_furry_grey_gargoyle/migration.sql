CREATE TYPE "roles_type" AS ENUM('student', 'teacher', 'coordinator');--> statement-breakpoint
CREATE TABLE "class" (
	"id" serial PRIMARY KEY,
	"name" varchar(50) NOT NULL,
	"school" varchar(36)
);
--> statement-breakpoint
CREATE TABLE "lecture_employee" (
	"id" serial PRIMARY KEY,
	"lecture" integer NOT NULL,
	"employee" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lecture" (
	"id" serial PRIMARY KEY,
	"subject" integer NOT NULL,
	"school" varchar(36) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_school" (
	"id" serial PRIMARY KEY,
	"organization" integer NOT NULL,
	"school" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" serial PRIMARY KEY,
	"name" varchar(250) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "people" (
	"id" varchar(36) PRIMARY KEY,
	"name" varchar(250) NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"email" varchar(100),
	"password_hash" varchar,
	"plan" varchar(50) DEFAULT 'free' NOT NULL,
	"permission" varchar(100) DEFAULT 'user' NOT NULL,
	"fictitious" boolean DEFAULT false NOT NULL,
	"cpf" varchar(20),
	"google_picture" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "person_role" (
	"id" serial PRIMARY KEY,
	"person" varchar(36) NOT NULL,
	"role" "roles_type" NOT NULL,
	"enrolled" timestamp DEFAULT now(),
	"unenrolled" timestamp
);
--> statement-breakpoint
CREATE TABLE "person_school" (
	"id" serial PRIMARY KEY,
	"school" varchar(36) NOT NULL,
	"person" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" serial PRIMARY KEY,
	"name" varchar(50) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "professor_subject" (
	"id" serial PRIMARY KEY,
	"professor_id" varchar(36) NOT NULL,
	"subject_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY,
	"name" "roles_type" NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"id" varchar(36) PRIMARY KEY,
	"cnpj" varchar(20) UNIQUE,
	"name" varchar(250),
	"owner_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "student_class" (
	"id" serial PRIMARY KEY,
	"student" varchar(36) NOT NULL,
	"class" integer NOT NULL,
	"joined" timestamp NOT NULL,
	"departed" timestamp
);
--> statement-breakpoint
CREATE TABLE "student_lecture" (
	"id" serial PRIMARY KEY,
	"lecture" integer NOT NULL,
	"student" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL UNIQUE
);
--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_school_schools_id_fkey" FOREIGN KEY ("school") REFERENCES "schools"("id");--> statement-breakpoint
ALTER TABLE "lecture_employee" ADD CONSTRAINT "lecture_employee_lecture_lecture_id_fkey" FOREIGN KEY ("lecture") REFERENCES "lecture"("id");--> statement-breakpoint
ALTER TABLE "lecture_employee" ADD CONSTRAINT "lecture_employee_employee_people_id_fkey" FOREIGN KEY ("employee") REFERENCES "people"("id");--> statement-breakpoint
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_subject_subject_id_fkey" FOREIGN KEY ("subject") REFERENCES "subject"("id");--> statement-breakpoint
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_school_schools_id_fkey" FOREIGN KEY ("school") REFERENCES "schools"("id");--> statement-breakpoint
ALTER TABLE "org_school" ADD CONSTRAINT "org_school_organization_organization_id_fkey" FOREIGN KEY ("organization") REFERENCES "organization"("id");--> statement-breakpoint
ALTER TABLE "org_school" ADD CONSTRAINT "org_school_school_schools_id_fkey" FOREIGN KEY ("school") REFERENCES "schools"("id");--> statement-breakpoint
ALTER TABLE "person_role" ADD CONSTRAINT "person_role_person_people_id_fkey" FOREIGN KEY ("person") REFERENCES "people"("id");--> statement-breakpoint
ALTER TABLE "person_role" ADD CONSTRAINT "person_role_role_roles_name_fkey" FOREIGN KEY ("role") REFERENCES "roles"("name");--> statement-breakpoint
ALTER TABLE "person_school" ADD CONSTRAINT "person_school_school_schools_id_fkey" FOREIGN KEY ("school") REFERENCES "schools"("id");--> statement-breakpoint
ALTER TABLE "person_school" ADD CONSTRAINT "person_school_person_people_id_fkey" FOREIGN KEY ("person") REFERENCES "people"("id");--> statement-breakpoint
ALTER TABLE "professor_subject" ADD CONSTRAINT "professor_subject_professor_id_people_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "people"("id");--> statement-breakpoint
ALTER TABLE "professor_subject" ADD CONSTRAINT "professor_subject_subject_id_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id");--> statement-breakpoint
ALTER TABLE "schools" ADD CONSTRAINT "schools_owner_id_people_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "people"("id");--> statement-breakpoint
ALTER TABLE "student_class" ADD CONSTRAINT "student_class_student_people_id_fkey" FOREIGN KEY ("student") REFERENCES "people"("id");--> statement-breakpoint
ALTER TABLE "student_class" ADD CONSTRAINT "student_class_class_class_id_fkey" FOREIGN KEY ("class") REFERENCES "class"("id");--> statement-breakpoint
ALTER TABLE "student_lecture" ADD CONSTRAINT "student_lecture_lecture_lecture_id_fkey" FOREIGN KEY ("lecture") REFERENCES "lecture"("id");--> statement-breakpoint
ALTER TABLE "student_lecture" ADD CONSTRAINT "student_lecture_student_people_id_fkey" FOREIGN KEY ("student") REFERENCES "people"("id");