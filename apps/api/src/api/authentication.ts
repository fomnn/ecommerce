import type { JWTPayload } from "hono/utils/jwt/types";
import { and, eq } from "drizzle-orm";
import { sign, verify } from "hono/jwt";
import { v4 as uuidv4 } from "uuid";
import { usersTable } from "../db/schema";
import honoInstance from "../helpers/hono-instance";
import useDrizzle from "../helpers/use-drizzle";

const authenticationRoute = honoInstance();

authenticationRoute.post("/login", async (c) => {
  const db = useDrizzle(c.env.DB);
  const {
    email,
    password,
  } = await c.req.json();

  const users = await db
    .select()
    .from(usersTable)
    .where(
      and(
        eq(usersTable.email, email),
        eq(usersTable.password, password),
      ),
    );

  const user = users[0];

  if (!user) {
    return c.text("User not found", 404);
  }
  const payload: JWTPayload = {
    user_id: user.id,

    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2,
  };

  const secret = "secretsecretsecretsecret";

  const token = await sign(payload, secret);

  return c.json({
    user,
    token,
  });
});

authenticationRoute.post("/sign-up", async (c) => {
  const db = useDrizzle(c.env.DB);

  const {
    fullname,
    password,
    email,
    address,
    phone,
  } = await c.req.json();

  const id = uuidv4();

  await db
    .insert(usersTable)
    .values({
      id,
      fullname,
      password,
      email,
      address,
      phone,
    });

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  const user = users[0];

  const payload: JWTPayload = {
    user_id: user.id,

    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2,
  };

  const secret = "secretsecretsecretsecret";

  const token = await sign(payload, secret);

  return c.json({
    user,
    token,
  });
});

authenticationRoute.post("/verify", async (c) => {
  const db = useDrizzle(c.env.DB);
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return c.text("There is no token", 400);
  }

  const secret = "secretsecretsecretsecret";

  const payload = await verify(token, secret);
  const userId = payload.user_id as string;

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  const user = users[0];

  return c.json({
    user,
  });
});

export default authenticationRoute;
