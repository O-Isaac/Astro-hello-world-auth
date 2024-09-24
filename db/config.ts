import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true, optional: false }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }),
    github_id: column.text({ optional: true, unique: true }),
  },
});

export const Session = defineTable({
  columns: {
    id: column.text({ unique: true, optional: false }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Session,
  },
});
