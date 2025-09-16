DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS org_school CASCADE;
DROP TABLE IF EXISTS lecture CASCADE;
DROP TABLE IF EXISTS class CASCADE;
DROP TABLE IF EXISTS subject CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS employee_school CASCADE;
DROP TABLE IF EXISTS lecture_employee CASCADE;
DROP TABLE IF EXISTS student_lecture CASCADE;
DROP TABLE IF EXISTS student_class CASCADE;
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS person_role CASCADE;

CREATE TABLE organization (
id SERIAL PRIMARY key,
name VARCHAR(250) NOT NULL UNIQUE);

CREATE TABLE class (
id SERIAL PRIMARY key,
name VARCHAR(50) NOT NULL);

CREATE TABLE subject (
id SERIAL PRIMARY key,
name VARCHAR(100) NOT NULL UNIQUE);

CREATE TABLE roles (
id SERIAL PRIMARY key,
name VARCHAR(100) NOT NULL UNIQUE);

CREATE TABLE people (
id VARCHAR(36) PRIMARY KEY NOT NULL,
name VARCHAR(250) NOT NULL,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password_hash varchar,
cpf VARCHAR(20) UNIQUE,
google_picture VARCHAR,
created_at TIMESTAMP DEFAULT now());

CREATE TABLE schools (
id VARCHAR(36) PRIMARY KEY NOT NULL,
cnpj VARCHAR(20) UNIQUE,
name VARCHAR(250),
owner_id VARCHAR(36) NOT NULL,
created_at TIMESTAMP DEFAULT now(),
FOREIGN KEY(owner_id) REFERENCES people(id));

CREATE TABLE org_school (
id SERIAL PRIMARY key,
organization INTEGER NOT NULL,
school VARCHAR(36) NOT NULL,
FOREIGN KEY(organization) REFERENCES organization(id),
FOREIGN KEY(school) REFERENCES schools(id));

CREATE TABLE lecture (
id SERIAL PRIMARY key,
subject INTEGER NOT NULL,
school VARCHAR(36) NOT NULL,
start_time TIMESTAMP NOT NULL,
end_time TIMESTAMP NOT NULL,
FOREIGN KEY(subject) REFERENCES subject(id),
FOREIGN KEY(school) REFERENCES schools(id));

CREATE TABLE employee_school (
id SERIAL PRIMARY key,
school VARCHAR(36) NOT NULL,
employee VARCHAR(36) NOT NULL,
FOREIGN KEY(school) REFERENCES schools(id),
FOREIGN KEY(employee) REFERENCES people(id));

CREATE TABLE lecture_employee (
id SERIAL PRIMARY key,
lecture INTEGER NOT NULL,
employee VARCHAR(36) NOT NULL,
FOREIGN KEY(lecture) REFERENCES lecture(id),
FOREIGN KEY(employee ) REFERENCES people(id));

CREATE TABLE student_lecture (
id SERIAL PRIMARY key,
lecture integer NOT NULL,
student VARCHAR(36) NOT NULL,
FOREIGN KEY(lecture ) REFERENCES lecture(id),
FOREIGN KEY(student) REFERENCES people(id));

CREATE TABLE student_class (
id SERIAL PRIMARY key,
student VARCHAR(36) NOT NULL,
class INTEGER NOT NULL,
joined TIMESTAMP NOT NULL,
departed TIMESTAMP,
FOREIGN KEY(student) REFERENCES people(id),
FOREIGN KEY(class) REFERENCES class(id));

CREATE TABLE person_role (
id SERIAL PRIMARY key,
person VARCHAR(36) NOT NULL,
role varchar(100) NOT NULL,
enrolled TIMESTAMP NOT NULL,
unenrolled TIMESTAMP,
FOREIGN KEY(person) REFERENCES people(id),
FOREIGN KEY(role) REFERENCES roles(name));

INSERT INTO roles (name) VALUES 
  ('student'),
  ('teacher'),
  ('coordinator')
