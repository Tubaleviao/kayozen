CREATE TABLE "organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(250) NOT NULL,
	CONSTRAINT "organization_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "plans_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "people" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(250) NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(100),
	"password_hash" varchar,
	"plan" varchar(50) DEFAULT 'free' NOT NULL,
	"permission" varchar(100) DEFAULT 'user' NOT NULL,
	"fictitious" boolean DEFAULT false NOT NULL,
	"cpf" varchar(20),
	"google_picture" varchar,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "people_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"cnpj" varchar(20),
	"name" varchar(250),
	"owner_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "schools_cnpj_unique" UNIQUE("cnpj")
);
--> statement-breakpoint
CREATE TABLE "professor_subject" (
	"id" serial PRIMARY KEY NOT NULL,
	"professor_id" varchar(36) NOT NULL,
	"subject_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "subject_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "org_school" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization" integer NOT NULL,
	"school" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lecture" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" integer NOT NULL,
	"school" varchar(36) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lecture_employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"lecture" integer NOT NULL,
	"employee" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_lecture" (
	"id" serial PRIMARY KEY NOT NULL,
	"lecture" integer NOT NULL,
	"student" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_class" (
	"id" serial PRIMARY KEY NOT NULL,
	"student" varchar(36) NOT NULL,
	"class" integer NOT NULL,
	"joined" timestamp NOT NULL,
	"departed" timestamp
);
--> statement-breakpoint
CREATE TABLE "class" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "person_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"person" varchar(36) NOT NULL,
	"role" varchar(100) NOT NULL,
	"enrolled" timestamp DEFAULT now(),
	"unenrolled" timestamp
);
--> statement-breakpoint
CREATE TABLE "person_school" (
	"id" serial PRIMARY KEY NOT NULL,
	"school" varchar(36) NOT NULL,
	"person" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schools" ADD CONSTRAINT "schools_owner_id_people_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "professor_subject" ADD CONSTRAINT "professor_subject_professor_id_people_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "professor_subject" ADD CONSTRAINT "professor_subject_subject_id_subject_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subject"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_school" ADD CONSTRAINT "org_school_organization_organization_id_fk" FOREIGN KEY ("organization") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_school" ADD CONSTRAINT "org_school_school_schools_id_fk" FOREIGN KEY ("school") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_subject_subject_id_fk" FOREIGN KEY ("subject") REFERENCES "public"."subject"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_school_schools_id_fk" FOREIGN KEY ("school") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lecture_employee" ADD CONSTRAINT "lecture_employee_lecture_lecture_id_fk" FOREIGN KEY ("lecture") REFERENCES "public"."lecture"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lecture_employee" ADD CONSTRAINT "lecture_employee_employee_people_id_fk" FOREIGN KEY ("employee") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_lecture" ADD CONSTRAINT "student_lecture_lecture_lecture_id_fk" FOREIGN KEY ("lecture") REFERENCES "public"."lecture"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_lecture" ADD CONSTRAINT "student_lecture_student_people_id_fk" FOREIGN KEY ("student") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class" ADD CONSTRAINT "student_class_student_people_id_fk" FOREIGN KEY ("student") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_class" ADD CONSTRAINT "student_class_class_class_id_fk" FOREIGN KEY ("class") REFERENCES "public"."class"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person_role" ADD CONSTRAINT "person_role_person_people_id_fk" FOREIGN KEY ("person") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person_role" ADD CONSTRAINT "person_role_role_roles_name_fk" FOREIGN KEY ("role") REFERENCES "public"."roles"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person_school" ADD CONSTRAINT "person_school_school_schools_id_fk" FOREIGN KEY ("school") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person_school" ADD CONSTRAINT "person_school_person_people_id_fk" FOREIGN KEY ("person") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
