import type { CartItemWithProduct } from "@/types/cart-item";
import { useDeleteAllCartItemByUserId, useGetCartItems } from "@/services/cart-items-service";
import { userStore } from "@/store/auth-store";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import clsx from "clsx";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import SolarDeliveryLinear from "~icons/solar/delivery-linear";
import SolarMapPointLinear from "~icons/solar/map-point-linear";

export const Route = createFileRoute("/cart/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data } = useGetCartItems();
  const { mutate: deleteAllCartItem } = useDeleteAllCartItemByUserId();
  const user = useStore(userStore);

  function handleCheckout() {
    deleteAllCartItem(null, {
      onSuccess: () => {
        toast("Checkout Success");
        navigate({
          to: "/shop",
        });
      },
    });
  }
  return (
    <div className="px-16 py-8 flex gap-12">
      <div className="w-8/12 space-y-6">
        <h1 className="text-3xl">Checkout</h1>
        <div className="border px-4 py-4 rounded">
          <h2 className="text-lg font-semibold">Book Information</h2>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="">
              <h3>Full Name</h3>
              <p className="font-semibold">{user?.fullname}</p>
            </div>
            <div className="">
              <h3>Email</h3>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div className="">
              <h3>Phone Number</h3>
              <p className="font-semibold">{user?.phone}</p>
            </div>
          </div>
        </div>
        <div className="border px-4 py-4 rounded space-y-4">
          <div className="">
            <h2 className="text-lg font-semibold">Payment Detail</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi deleniti cumque quos quia eveniet recusandae?</p>
          </div>
          <div className="w-full h-[1px] bg-zinc-200"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label>Card Number</label>
              <div className="flex border rounded px-2 py-1">
                <input
                  type="text"
                  className="w-full focus:outline-none"
                />
                <span className="text-sm">VISA</span>
              </div>
            </div>
            <div className="">
              <label>Card Number</label>
              <div className="flex gap-4">
                <select className="border rounded w-full px-2 py-1">
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
                <select className="border rounded w-full px-2 py-1">
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label>Card Number</label>
              <input
                type="text"
                className="border rounded px-2 py-1 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <OrderSummary cartItems={data?.cartItems} handleCheckout={handleCheckout} />
    </div>
  );
}

function OrderSummary({ cartItems, handleCheckout }: { cartItems?: CartItemWithProduct[]; handleCheckout: () => void }) {
  const deliveryFee = 10;

  const [isAgree, setIsAgree] = useState(false);

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

        <div className="space-y-2">
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              defaultChecked={isAgree}
              onChange={() => setIsAgree(ia => !ia)}
              className="mt-1.5"
            />
            <p>
              By clicking this, I agree to
              {" "}
              <a href="" className="text-sky-600">
                Terms & Conditions
              </a>
              {" "}
              and
              {" "}
              <a href="" className="text-sky-600">
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="">
            <button
              disabled={!isAgree}
              className={clsx("bg-amber-400 w-full py-2 rounded", {
                "cursor-not-allowed": !isAgree,
              })}
              onClick={handleCheckout}
            >
              Pay for my Booking
            </button>
          </div>
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
