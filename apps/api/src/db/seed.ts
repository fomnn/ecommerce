import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import useDrizzle from "../helpers/use-drizzle";
import * as schema from "./schema";

export default async function seed(d1: D1Database) {
  const db = useDrizzle(d1);

  await db.delete(schema.productsTable);
  await db.delete(schema.usersTable);
  await db.delete(schema.cartItemsTable);
  await db.delete(schema.imageUrlsTable);

  const products = await db.insert(schema.productsTable).values(
    Array.from({ length: 4 }).map(_ => ({
      id: uuidv4(),
      description: faker.lorem.paragraph(),
      price: faker.number.float(),
      title: faker.lorem.words(),
      category: faker.helpers.arrayElement(["makanan_anjing", "makanan_kucing", "makanan_burung"]),
      weight: faker.number.int(),
    })),
  ).returning();

  const productIds = products.map(p => p.id);

  await db.insert(schema.usersTable).values(
    Array.from({ length: 4 }).map(_ => ({
      id: uuidv4(),
      address: faker.lorem.words(),
      email: faker.internet.email(),
      fullname: faker.person.fullName(),
      phone: faker.string.numeric(),
      password: faker.internet.password(),
    })),
  ).returning();

  await db.insert(schema.imageUrlsTable).values(
    Array.from({ length: 20 }).map(_ => (
      {
        id: uuidv4(),
        productId: faker.helpers.arrayElement(productIds),
        url: faker.image.urlPicsumPhotos(),
      }),
    ),
  );
}
