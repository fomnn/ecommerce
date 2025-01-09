import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

export default function useDrizzle(d1: D1Database) {
  return drizzle(d1, { schema });
}
