import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true, optional: false }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }),
    avatar: column.text({ optional: true }),
    public: column.boolean({ optional: true }),
    github_id: column.text({ optional: true, unique: true }),
  },
});

const Github = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
      unique: true,
      optional: false,
      references: () => User.columns.github_id,
    }),
    avatar: column.text({ optional: true }),
    username: column.text({ optional: true }),
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
    Github,
  },
});
