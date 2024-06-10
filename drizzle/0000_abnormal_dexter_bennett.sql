CREATE TABLE IF NOT EXISTS "tododrizzle" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" varchar NOT NULL,
	"completed" boolean DEFAULT false
);
