import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";

// config to store sessions in db
const adapter = new BetterSqlite3Adapter(db, {
  user: "users", // users db table name
  session: "sessions", //table name where session should be stored.
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production", // only work across https
    },
  },
});

export async function createAuthSession(userId) {
  const session = lucia.createSession(userId, {}); // you can pass an extra data to the session
  const sessionCookie = lucia.createSessionCookie(session.id);
  // To set sessionCookie to an outgoing response in a Next Js app we use cookie fxn from next js.
  // sets cookies to nextjs outgoing response.

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes // secure settings for prod envs
  ); // next js 15 (await cookies()).get() -- .set() etc
}

export async function verifyAuth() {
  // Check if request is from an auth user.
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    // get new cookie each time a rquest is made to increase login time set in expiry
    // next Js does not like it to set cookie when rendering a page so we do it here
  } catch (error) {
    console.log("An error occurred");
  }

  if (!result.session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  return result; // will have user and session key
}

export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
