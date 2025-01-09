import { and, eq } from "drizzle-orm";
import { jwt } from "hono/jwt";
import { v4 as uuidv4 } from "uuid";
import honoInstance from "../helpers/hono-instance";
import useDrizzle from "../helpers/use-drizzle";
import { cartItemsTable, imageUrlsTable, productsTable } from "./../db/schema";

type CartItemWithProduct = typeof cartItemsTable.$inferSelect & {
  product: typeof productsTable.$inferSelect;
  image_urls: (typeof imageUrlsTable.$inferSelect)[];
};

const cartItemsRoute = honoInstance();

cartItemsRoute.use(
  "/*",
  jwt({
    secret: "secretsecretsecretsecret",
  }),
);

cartItemsRoute.get("/", async (c) => {
  const db = useDrizzle(c.env.DB);

  const cartItems: CartItemWithProduct[] = [];

  const userId = c.get("jwtPayload").user_id as string;

  const cartItemsData = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.userId, userId));

  for (const ci of cartItemsData) {
    const products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, ci.productId));

    const product = products[0];

    const image_urls = await db
      .select()
      .from(imageUrlsTable)
      .where(eq(imageUrlsTable.productId, ci.productId));

    cartItems.push({
      ...ci,
      product,
      image_urls,
    });
  }

  return c.json({
    cartItems,
  });
});

cartItemsRoute.post("/", async (c) => {
  const db = useDrizzle(c.env.DB);

  const {
    productId,
    userId,
  } = await c.req.json();

  const alreadyThere = await db
    .select()
    .from(cartItemsTable)
    .where(and(
      eq(cartItemsTable.productId, productId),
      eq(cartItemsTable.userId, userId),
    ));

  if (alreadyThere.length > 0) {
    const cartItems = await db
      .update(cartItemsTable)
      .set({
        quantity: alreadyThere[0].quantity! + 1,
      })
      .where(eq(cartItemsTable.id, alreadyThere[0].id))
      .returning();

    const cartItem = cartItems[0];

    return c.json({
      cartItem,
      message: "Updated quantity",
    });
  }

  const cartItems = await db
    .insert(cartItemsTable)
    .values({
      id: uuidv4(),
      productId,
      userId,
    })
    .returning();

  const cartItem = cartItems[0];

  return c.json({
    cartItem,
    message: "Created",
  });
});

cartItemsRoute.put("/:id", async (c) => {
  const db = useDrizzle(c.env.DB);
  const id = c.req.param("id");

  const {
    quantity,
  } = await c.req.json();

  const cartItems = await db
    .update(cartItemsTable)
    .set({
      quantity,
    })
    .where(eq(cartItemsTable.id, id))
    .returning();

  const cartItem = cartItems[0];

  return c.json({
    cartItem,
    message: "Updated",
  });
});

cartItemsRoute.delete("/", async (c) => {
  const db = useDrizzle(c.env.DB);
  const userId = c.get("jwtPayload").user_id as string;

  await db
    .delete(cartItemsTable)
    .where(eq(cartItemsTable.userId, userId))
    .returning();

  return c.json({
    message: "Deleted",
  });
});

cartItemsRoute.delete("/:id", async (c) => {
  const db = useDrizzle(c.env.DB);
  const id = c.req.param("id");

  const cartItems = await db
    .delete(cartItemsTable)
    .where(eq(cartItemsTable.id, id))
    .returning();

  const cartItem = cartItems[0];

  return c.json({
    cartItem,
    message: "Deleted",
  });
});

export default cartItemsRoute;
