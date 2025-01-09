import { userStore } from "@/store/auth-store";
import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import SolarCartBroken from "~icons/solar/cart-broken";
import SolarUserLinear from "~icons/solar/user-linear";

export default function Header() {
  const user = useStore(userStore);
  return (
    <header className="flex justify-between border-b shadow px-16 h-14 items-center">
      <div className="">
        <p>Logo</p>
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <a>About Us</a>
        </div>
        <div className="w-[1.5px] rounded-md h-6 bg-zinc-300"></div>
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <SolarCartBroken />
          </Link>
          {user
            ? (
                <Link to="/profile">
                  <SolarUserLinear />
                </Link>
              )
            : (
                <Link to="/auth/login" className="px-3 py-1 rounded-md bg-amber-400">
                  Sign In
                </Link>
              )}
        </div>
      </div>
    </header>
  );
}
