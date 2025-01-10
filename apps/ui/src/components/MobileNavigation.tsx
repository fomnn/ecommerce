import { isNavigationOpen } from "@/hooks/mobileNavigation";
import { userStore } from "@/store/auth-store";
import { Link, useLocation } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import SolarCartBroken from "~icons/solar/cart-broken";
import SolarUserLinear from "~icons/solar/user-linear";

export default function MobileNavigation() {
  const user = useStore(userStore);
  const isOpen = useStore(isNavigationOpen);

  function handleClose() {
    isNavigationOpen.setState(() => false);
  }
  return (
    <div style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }} className="z-50 px-16 py-4 *:text-xl h-[calc(100dvh-56px)] transition-all duration-300 bg-white absolute w-full top-14 flex flex-col gap-4 items-center justify-center pb-36">
      <Link to="/" onClick={handleClose}>Home</Link>
      <Link to="/shop" onClick={handleClose}>Shop</Link>
      <Link to="/" onClick={handleClose}>About Us</Link>
      <div className="h-[1.1px] w-1/3 bg-zinc-300"></div>
      <Link to="/cart" onClick={handleClose}>
        <SolarCartBroken />
      </Link>
      {user
        ? (
            <Link to="/profile" onClick={handleClose}>
              <SolarUserLinear />
            </Link>
          )
        : (
            <Link
              to="/auth/login"
              onClick={handleClose}
              className="px-3 py-1 rounded-md bg-amber-400"
            >
              Sign In
            </Link>
          )}
    </div>
  );
}
