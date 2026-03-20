-- Custom SQL migration file, put your code below! --
INSERT INTO roles (name) 
VALUES ('student'),
  ('teacher'),
  ('coordinator');

INSERT INTO plans (name)
VALUES ('free'),
  ('basic'),
  ('pro'),
  ('enterprise');

INSERT INTO permissions (name)
VALUES ('admin'),
  ('user');
