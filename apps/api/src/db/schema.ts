import { relations, sql } from "drizzle-orm";
import { check, int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull().unique(),
  weight: int("weight").notNull(),
  price: real("price").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  created_at: int("created_at", { mode: "timestamp_ms" }).$default(() => new Date()),
  updated_at: int("updated_at", { mode: "timestamp_ms" }).$default(() => new Date()).$onUpdate(() => new Date()),
}, table => ([
  check("category_check", sql`${table.category} IN ('makanan_anjing', 'makanan_kucing', 'makanan_burung')`),
]));

export const imageUrlsTable = sqliteTable("image_urls", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => productsTable.id),
  url: text("url").notNull(),
});

export const imageUrlsRelations = relations(imageUrlsTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [imageUrlsTable.productId],
    references: [productsTable.id],
  }),
}));

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  fullname: text("fullname").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  password: text("password").notNull(),
  address: text("address").notNull(),
  created_at: int("created_at", { mode: "timestamp_ms" }).$default(() => new Date()),
  updated_at: int("updated_at", { mode: "timestamp_ms" }).$default(() => new Date()).$onUpdate(() => new Date()),
});

export const cartItemsTable = sqliteTable("cart_items", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id),
  productId: text("product_id").notNull().references(() => productsTable.id),
  quantity: int("quantity").$default(() => 1),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  cartItems: one(cartItemsTable),
}));

export const cartItemsRelations = relations(cartItemsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [cartItemsTable.userId],
    references: [usersTable.id],
  }),
  product: one(productsTable, {
    fields: [cartItemsTable.productId],
    references: [productsTable.id],
  }),
}));

export const productsRelations = relations(productsTable, ({ one }) => ({
  imageUrl: one(imageUrlsTable),
  cartItems: one(cartItemsTable),
}));
