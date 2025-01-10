import { isNavigationOpen, useMobileNavigation } from "@/hooks/mobileNavigation";
import { userStore } from "@/store/auth-store";
import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import SolarCartBroken from "~icons/solar/cart-broken";
import SolarHamburgerMenuLinear from "~icons/solar/hamburger-menu-linear";
import SolarUserLinear from "~icons/solar/user-linear";

export default function Header() {
  const user = useStore(userStore);
  const { closeNavigation, openNavigation } = useMobileNavigation();
  const isOpen = useStore(isNavigationOpen);
  return (
    <header className="flex justify-between border-b shadow px-4 sm:px-16 h-14 items-center">
      <div className="">
        <p className="text-xl font-bold">Logo</p>
      </div>
      <div className="hidden sm:flex gap-8 items-center">
        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about-us">About Us</Link>
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
      <button
        type="button"
        className="block sm:hidden"
        onClick={() => isOpen ? closeNavigation() : openNavigation()}
      >
        <SolarHamburgerMenuLinear className="text-lg" />
      </button>
    </header>
  );
}
