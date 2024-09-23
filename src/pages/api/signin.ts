import { lucia } from "@/auth";
import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext): Promise<Response> {
  // Form Data
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Validation
  if (typeof username !== "string") {
    return new Response("Invalid username", {
      status: 400,
    });
  }

  if (typeof password !== "string") {
    return new Response("Invalid username", {
      status: 400,
    });
  }

  // Search User
  const matchedUsers = await db
    .select()
    .from(User)
    .where(eq(User.username, username));

  const matchedUser = matchedUsers.at(0);

  // User not found
  if (!matchedUser) {
    return new Response("Incorrect Username or password", { status: 400 });
  }

  if (!matchedUser.password) {
    return new Response("Invalid password", { status: 400 });
  }

  const validPassword = await new Argon2id().verify(
    matchedUser.password,
    password
  );

  if (!validPassword) {
    return new Response("Incorrect Username or password", { status: 400 });
  }

  // Create session

  const session = await lucia.createSession(matchedUser.id, {});
  const cookieSession = lucia.createSessionCookie(session.id);

  context.cookies.set(
    cookieSession.name,
    cookieSession.value,
    cookieSession.attributes
  );

  return context.redirect("/");
}
