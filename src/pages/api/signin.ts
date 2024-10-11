import { lucia } from "@/auth";
import UserRepository from "@/repository/user";
import { RestResponse } from "@/utils";
import { userSchema } from "@/validations";
import type { APIContext } from "astro";
import { Argon2id } from "oslo/password";
import { ZodError } from "zod";

const userRepository = new UserRepository();

export async function POST(context: APIContext): Promise<Response> {
  const response = new RestResponse({ status: 200, message: "ok" });

  try {
    const formData = await context.request.formData();
    const formDataObj = Object.fromEntries(formData);

    const { password, username } = userSchema.parse(formDataObj);
    const matchedUser = await userRepository.getUserByUsername(username);

    if (!matchedUser) {
      response.setStatus(400);
      response.setMessage("Incorrect Username or password");
      return response.rest;
    }

    if (!matchedUser.password) {
      response.setStatus(400);
      response.setMessage("Invalid password");
      return response.rest;
    }

    const isValidPassword = await new Argon2id().verify(
      matchedUser.password,
      password
    );

    if (!isValidPassword) {
      response.setStatus(400);
      response.setMessage("Incorrect Username or password");
      return response.rest;
    }

    const session = await lucia.createSession(matchedUser.id, {});
    const cookieSession = lucia.createSessionCookie(session.id);

    context.cookies.set(
      cookieSession.name,
      cookieSession.value,
      cookieSession.attributes
    );

    return response.rest;
  } catch (error) {
    if (error instanceof ZodError) {
      response.setStatus(400);
      response.setResponse(error.issues);
      response.setMessage("Bad Request");
    } else {
      response.setStatus(500);
      response.setMessage("Internal Server Error");
    }

    return response.rest;
  }
}
