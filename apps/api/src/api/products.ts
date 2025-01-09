import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import honoInstance from "../helpers/hono-instance";
import useDrizzle from "../helpers/use-drizzle";
import { imageUrlsTable, productsTable } from "./../db/schema";

const productsRoute = honoInstance();

type ProductWithImageUrls = (typeof productsTable.$inferSelect) & {
  image_urls: (typeof imageUrlsTable.$inferSelect)[];
};


productsRoute.get("/", async (c) => {
  const db = useDrizzle(c.env.DB);
  const products: ProductWithImageUrls[] = [];

  const results = await db.select().from(productsTable);

  for (const product of results) {
    const image_urls = await db
      .select()
      .from(imageUrlsTable)
      .where(eq(imageUrlsTable.productId, product.id));

    products.push({
      image_urls,
      ...product,
    });
  }

  return c.json({
    products,
  });
});

productsRoute.get("/:id", async (c) => {
  const db = useDrizzle(c.env.DB);
  const id = c.req.param("id");

  const results = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));

  const image_urls = await db
    .select()
    .from(imageUrlsTable)
    .where(eq(imageUrlsTable.productId, results[0].id));

  const product = {
    image_urls,
    ...results[0],
  };

  return c.json({
    product,
  });
});

productsRoute.post("/", async (c) => {
  const db = useDrizzle(c.env.DB);

  const {
    title,
    description,
    price,
    weight,
    category,
  } = await c.req.json();

  const products = await db
    .insert(productsTable)
    .values({
      category,
      id: uuidv4(),
      title,
      description,
      price,
      weight,
    })
    .returning();

  const product = products[0];

  return c.json({
    product,
    message: "Created",
  });
});

productsRoute.put("/:id", async (c) => {
  const db = useDrizzle(c.env.DB);
  const id = c.req.param("id");

  const {
    title,
    description,
    price,
    weight,
    category,
  } = await c.req.json();

  const products = await db
    .update(productsTable)
    .set({
      title,
      category,
      description,
      price,
      weight,
    })
    .where(eq(productsTable.id, id))
    .returning();

  const product = products[0];

  return c.json({
    product,
    message: "Updated",
  });
});

productsRoute.delete("/:id", async (c) => {
  const db = useDrizzle(c.env.DB);
  const id = c.req.param("id");

  const products = await db
    .delete(productsTable)
    .where(eq(productsTable.id, id))
    .returning();

  const product = products[0];

  return c.json({
    product,
    message: "Deleted",
  });
});

export default productsRoute;
