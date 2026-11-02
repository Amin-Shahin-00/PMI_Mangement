CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`task` text NOT NULL,
	`author` text NOT NULL,
	`body` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`email` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`user_id` text
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sprints` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`goal` text NOT NULL,
	`start` text NOT NULL,
	`end` text NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`project` text NOT NULL,
	`status` text NOT NULL,
	`priority` text NOT NULL,
	`assignee` text NOT NULL,
	`due` text NOT NULL,
	`points` integer NOT NULL,
	`sprint` text NOT NULL,
	`type` text NOT NULL,
	`created` text NOT NULL
);
