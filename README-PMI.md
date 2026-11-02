# MIRROR Mangement

Open START_LOCAL.cmd and visit http://127.0.0.1:5180/login.
Keep the launcher window open while using the website.

Administrator login: username admin, password 1234.

Use Accounts to create usernames and passwords. Use Teams to create or edit teams and select their accounts. Create a task, choose a team and an assignee, and set a due date. The assignee must belong to the selected team when both are provided.

Regular accounts can see and update work assigned to them or to their teams. Only the administrator can create accounts, manage teams, change assignments, create projects and sprints, or delete tasks. Discussion comments are limited to accessible tasks.

Calendar provides a month view, previous/next month navigation, a Today shortcut, daily agendas, upcoming deadlines, and sprint start/end dates. Use task due dates to put work on the calendar.

Logout clears the browser session and invalidates it in the database. Passwords are salted and hashed; sessions expire after seven days. Login attempts are limited after repeated failures.

All 12 previous tasks and their comments were reset. Projects and sprint definitions were retained. Sample-data creation has been removed. The admin account is the only account currently created.

This website runs locally, using saved data under .wrangler/state. Online hosting and cross-computer access have not been configured. The Desktop folder retains its original PMI_Mangement name; the website branding is MIRROR Mangement.

Checks passed for the production build, TypeScript, login/logout, task reset, account creation, team membership, future due dates, member task visibility, assignment protection and administrator-only actions.
