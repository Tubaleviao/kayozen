ALTER TABLE "subject" ADD COLUMN "school" varchar(36);--> statement-breakpoint
ALTER TABLE "subject" ADD CONSTRAINT "subject_school_schools_id_fkey" FOREIGN KEY ("school") REFERENCES "schools"("id");