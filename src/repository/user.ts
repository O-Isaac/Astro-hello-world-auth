import { db, eq, User } from "astro:db";

export default class UserRepository {
  public async getUser(id: string) {
    return db.select().from(User).where(eq(User.id, id)).get();
  }

  public async getUserByUsername(username: string) {
    return db.select().from(User).where(eq(User.username, username)).get();
  }

  public async getUsers() {
    return await db.select().from(User);
  }
}
