import { lucia } from "@/auth";
import UserRepository from "@/repository/user";
import { userSchema } from "@/validations";
import type { APIContext } from "astro";
import { Argon2id } from "oslo/password";
import { ZodError } from "zod";

const userRepository = new UserRepository();

export async function POST(context: APIContext): Promise<Response> {
  try {
    const formData = await context.request.formData();
    const formDataObj = Object.fromEntries(formData);

    const { password, username } = userSchema.parse(formDataObj);
    const matchedUser = await userRepository.getUserByUsername(username);

    if (!matchedUser) {
      return new Response("Incorrect Username or password", { status: 400 });
    }

    if (!matchedUser.password) {
      return new Response("Invalid password", { status: 400 });
    }

    const isValidPassword = await new Argon2id().verify(
      matchedUser.password,
      password
    );

    if (!isValidPassword) {
      return new Response("Incorrect Username or password", { status: 400 });
    }

    const session = await lucia.createSession(matchedUser.id, {});
    const cookieSession = lucia.createSessionCookie(session.id);

    context.cookies.set(
      cookieSession.name,
      cookieSession.value,
      cookieSession.attributes
    );
    return context.redirect("/");
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
    }

    return context.redirect(context.request.url);
  }
}
