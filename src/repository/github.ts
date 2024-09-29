import { db, eq, Github, User } from "astro:db";

export default class GithubUserRepository {
  public async getUser(id: string) {
    return db.select().from(Github).where(eq(User.github_id, id)).get();
  }

  public async getUsers() {
    return await db.select().from(Github);
  }
}
