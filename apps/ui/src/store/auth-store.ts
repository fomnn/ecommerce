import type { User } from "@/types/user";
import { Store } from "@tanstack/store";

export const userStore = new Store<User | null>(null);
