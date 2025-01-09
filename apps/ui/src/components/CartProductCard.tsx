import type { CartItemWithProduct } from "@/types/cart-item";
import { useAddCartItemQuantity, useDeleteCartItemById, useReduceCartItemQuantity } from "@/services/cart-items-service";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import SolarAddCircleLinear from "~icons/solar/add-circle-linear";
import SolarMinusCircleLinear from "~icons/solar/minus-circle-linear";
import SolarTrashBinMinimalisticBroken from "~icons/solar/trash-bin-minimalistic-broken";

export default function CartProductCard({ cartItem }: { cartItem: CartItemWithProduct }) {
  const { mutate: reduceQuantity } = useReduceCartItemQuantity(cartItem.id, cartItem.quantity!);
  const { mutate: addQuantity } = useAddCartItemQuantity(cartItem.id, cartItem.quantity!);
  const { mutate: deleteCartitem } = useDeleteCartItemById(cartItem.id);
  return (
    <div className="flex gap-4 py-5">
      <div className="w-2/12 bg-orange-50 aspect-square">
        <img src={cartItem.image_urls[0].url} alt="" />
      </div>
      <div className="w-10/12 flex flex-col justify-between">
        <div className="">
          <h2 className="text-lg line-clamp-2">
            {cartItem.product.title}
          </h2>
          <p className="text-sm mt-1">
            Weight:
            <span>
              {cartItem.product.weight}
              {" "}
              gram
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-2xl">
            $
            {cartItem.product.price.toFixed(2)}
          </p>
          <div className="flex gap-6 items-center">
            <Link
              to="/products/$productId"
              params={{ productId: cartItem.productId }}
              className="text-xs text-sky-600"
            >
              See Detail product
            </Link>
            <button onClick={() => deleteCartitem()}>
              <SolarTrashBinMinimalisticBroken />
            </button>
            <div className="flex items-center gap-2">
              <button disabled={cartItem.quantity === 1} onClick={() => reduceQuantity()}>
                <SolarMinusCircleLinear
                  className={clsx({
                    "text-zinc-400 cursor-not-allowed": cartItem.quantity === 1,
                  })}
                />
              </button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => addQuantity()}>
                <SolarAddCircleLinear />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
