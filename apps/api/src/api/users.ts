import { eq } from "drizzle-orm";
import { jwt } from "hono/jwt";
import { usersTable } from "../db/schema";
import honoInstance from "../helpers/hono-instance";
import useDrizzle from "../helpers/use-drizzle";

const usersRoute = honoInstance();

usersRoute.use(
  "/*",
  jwt({
    secret: "secretsecretsecretsecret",
  }),
);

usersRoute.get("/", async (c) => {
  const db = useDrizzle(c.env.DB);
  const userId = c.get("jwtPayload").user_id as string;

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  const user = users[0];

  return c.json({
    user,
  });
});

usersRoute.put("/", async (c) => {
  const db = useDrizzle(c.env.DB);
  const userId = c.get("jwtPayload").user_id as string;

  const {
    fullname,
    address,
    email,
    phone,
  } = await c.req.json();

  const users = await db
    .update(usersTable)
    .set({
      fullname,
      address,
      email,
      phone,
    })
    .where(eq(usersTable.id, userId))
    .returning();

  const user = users[0];

  return c.json({
    user,
    message: "Updated",
  });
});

usersRoute.delete("/", async (c) => {
  const db = useDrizzle(c.env.DB);
  const userId = c.get("jwtPayload").user_id as string;

  const users = await db
    .delete(usersTable)
    .where(eq(usersTable.id, userId))
    .returning();

  const user = users[0];

  return c.json({
    user,
    message: "Deleted",
  });
});

export default usersRoute;
