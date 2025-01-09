import type { JwtVariables } from "hono/jwt";
import { Hono } from "hono";

type Bindings = Env;
type Variables = JwtVariables;

export default function honoInstance() {
  return new Hono<{ Bindings: Bindings; Variables: Variables }>();
}
