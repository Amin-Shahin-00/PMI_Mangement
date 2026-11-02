import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const members = sqliteTable('members', { email: text('email').primaryKey(), name: text('name').notNull(), role: text('role').notNull(), userId: text('user_id') });
export const projects = sqliteTable('projects', { id: text('id').primaryKey(), name: text('name').notNull(), description: text('description').notNull(), color: text('color').notNull() });
export const tasks = sqliteTable('tasks', { id: text('id').primaryKey(), title: text('title').notNull(), description: text('description').notNull(), project: text('project').notNull(), status: text('status').notNull(), priority: text('priority').notNull(), assignee: text('assignee').notNull(), due: text('due').notNull(), points: integer('points').notNull(), sprint: text('sprint').notNull(), team: text('team').notNull().default(''), type: text('type').notNull(), created: text('created').notNull() });
export const comments = sqliteTable('comments', { id: text('id').primaryKey(), task: text('task').notNull(), author: text('author').notNull(), body: text('body').notNull(), created: text('created').notNull() });
export const sprints = sqliteTable('sprints', { id: text('id').primaryKey(), name: text('name').notNull(), goal: text('goal').notNull(), start: text('start').notNull(), end: text('end').notNull(), status: text('status').notNull() });
export const accounts=sqliteTable('accounts',{username:text('username').primaryKey(),name:text('name').notNull(),passwordHash:text('password_hash').notNull(),salt:text('salt').notNull(),role:text('role').notNull()});
export const sessions=sqliteTable('sessions',{tokenHash:text('token_hash').primaryKey(),username:text('username').notNull(),expires:integer('expires').notNull()});
export const teams=sqliteTable('teams',{id:text('id').primaryKey(),name:text('name').notNull(),description:text('description').notNull()});
export const teamMembers=sqliteTable('team_members',{id:text('id').primaryKey(),team:text('team').notNull(),username:text('username').notNull()});
export const loginAttempts=sqliteTable('login_attempts',{username:text('username').primaryKey(),failures:integer('failures').notNull(),blockedUntil:integer('blocked_until').notNull()});

