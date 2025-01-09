import { cors } from "hono/cors";
import authenticationRoute from "./api/authentication";
import cartItemsRoute from "./api/cart-items";
import imageUrlsRoute from "./api/image-urls";
import productsRoute from "./api/products";
import usersRoute from "./api/users";
import seed from "./db/seed";
import honoInstance from "./helpers/hono-instance";

const app = honoInstance();

app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/products", productsRoute);
app.route("/cart-items", cartItemsRoute);
app.route("/users", usersRoute);
app.route("/auth", authenticationRoute);
app.route("/image-urls", imageUrlsRoute);

app.get("/seed", async (c) => {
  try {
    await seed(c.env.DB);
    return c.text("Success");
  }
  catch (e) {
    console.log(e);
    return c.text("there is an error");
  }
});

export default app;
