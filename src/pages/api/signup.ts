import { lucia } from "@/auth";
import { userSchema } from "@/validations";
import type { APIContext } from "astro";
import { User, db } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { ZodError } from "zod";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const formData = await context.request.formData();
    const formDataObject = Object.fromEntries(formData);
    const { username, password } = userSchema.parse(formDataObject);

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    await db.insert(User).values({
      id: userId,
      username,
      password: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return context.redirect("/");
  } catch (error) {
    return context.redirect("/");
  }
}
