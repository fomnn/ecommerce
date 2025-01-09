import { eq } from "drizzle-orm";
import { imageUrlsTable } from "../db/schema";
import honoInstance from "../helpers/hono-instance";
import useDrizzle from "../helpers/use-drizzle";

const imageUrlsRoute = honoInstance();

imageUrlsRoute.get("/", async (c) => {
  const db = useDrizzle(c.env.DB);
  const productId = c.req.query("product-id");

  let imageUrls;
  if (productId) {
    imageUrls = await db
      .select()
      .from(imageUrlsTable)
      .where(
        eq(
          imageUrlsTable.productId,
          productId,
        ),
      );
  }
  else {
    imageUrls = await db
      .select()
      .from(imageUrlsTable);
  }

  return c.json({
    imageUrls,
  });
});

export default imageUrlsRoute;
