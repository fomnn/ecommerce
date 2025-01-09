import type { CartItemWithProduct } from "@/types/cart-item";
import CartProductCard from "@/components/CartProductCard";
import { useGetCartItems } from "@/services/cart-items-service";
import { createFileRoute, Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useMemo } from "react";
import SolarDeliveryLinear from "~icons/solar/delivery-linear";
import SolarMapPointLinear from "~icons/solar/map-point-linear";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetCartItems();
  return (
    <div className="px-16 py-8 flex gap-12">
      <div className="w-8/12">
        <h1 className="text-3xl">My Cart</h1>
        <div className="divide-y">
          {data && data.cartItems.length > 0
            ? data.cartItems.map((cartItem, i) => (
                <CartProductCard cartItem={cartItem} key={i} />
              ))
            : (
                <p className="text-sm text-zinc-400 mt-8">
                  Cart Items still empty.
                  {" "}
                  <Link to="/shop" className="text-orange-500">Go to Shop</Link>
                </p>
              )}
        </div>
      </div>
      <OrderSummary cartItems={data?.cartItems} />
    </div>
  );
}

function OrderSummary({ cartItems }: { cartItems?: CartItemWithProduct[] }) {
  const deliveryFee = 10;

  const amount = useMemo(() => {
    let tempAmount = 0;

    if (!cartItems) {
      return tempAmount;
    }

    for (const cartItem of cartItems) {
      tempAmount += cartItem.quantity! * cartItem.product.price;
    }

    return tempAmount;
  }, [cartItems]);

  const tax = useMemo(() => {
    return amount * 0.05;
  }, [amount]);

  return (
    <div className="w-4/12 divide-y mt-12 sticky top-12 h-fit bg-white border px-6 py-4">
      <div className="">
        <h2 className="font-semibold">Order Summary</h2>
        <div className="py-2 space-y-1">
          {cartItems && cartItems?.length > 0
            ? cartItems?.map((cartItem, i) => (
              <ProductSummary key={i} cartItem={cartItem} />
            ))
            : <p className="text-sm text-zinc-400">Cart item still empty</p>}

        </div>
      </div>
      <div className="py-2 space-y-1">
        <div className="flex items-center justify-between">
          <p>Delivery today with</p>
          <span>
            $
            {deliveryFee.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SolarDeliveryLinear />
          <p className="font-semibold">Skinny Express</p>
        </div>
        <div className="flex items-center gap-2">
          <SolarMapPointLinear />
          <p>
            Delivery to
            {" "}
            <span className="font-semibold">Jakarta, Indonesia</span>
          </p>
        </div>
      </div>
      <div className="py-2 space-y-1">
        <div className="flex items-center justify-between">
          <p>Amount</p>
          <span>
            $
            {amount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p>Tax</p>
          <span>
            $
            {tax.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between py-2 font-semibold">
          <p>Order Total</p>
          <span className="font-semibold">
            $
            {(amount + tax + deliveryFee).toFixed(2)}
          </span>
        </div>
        <div className="">
          <Link
            disabled={cartItems?.length === 0}
            to="/cart/checkout"
            className={clsx("block text-center bg-amber-400 w-full py-2 rounded", {
              "cursor-not-allowed": cartItems?.length === 0,
            })}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductSummary({ cartItem }: { cartItem: CartItemWithProduct }) {
  return (
    <div className="flex items-center justify-between">
      <p>
        x
        {cartItem.quantity}
        {" "}
        {cartItem.product.title}
      </p>
      <span>
        $
        {(cartItem.quantity! * cartItem.product.price).toFixed(2)}
      </span>
    </div>
  );
}
