import type { ProductWithImageUrls } from "@/types/product";
import { useAddCartItem } from "@/services/cart-items-service";
import { userStore } from "@/store/auth-store";
import getCategoryTitle from "@/utils/getCategoryTitle";
import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import toast from "react-hot-toast";

export default function ProductCart({ product }: { product: ProductWithImageUrls }) {
  const categoryTitle = getCategoryTitle(product.category);

  const { mutate: add } = useAddCartItem();
  const user = useStore(userStore);

  function handleAddCartItem() {
    if (!user) {
      return toast("You have to login first");
    }
    add({
      productId: product.id,
      userId: user.id,
    }, {
      onSuccess: () => {
        toast("Added product to cart");
      },
    });
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <img
        alt=""
        src={product.image_urls[0].url ?? ""}
        className="w-full bg-zinc-200 aspect-square"
      />
      <div className="px-2 py-3">
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="font-semibold"
        >
          {product.title}
        </Link>
        <p className="text-xs">{categoryTitle}</p>
        <p className="mt-2">
          $
          {product.price.toFixed(2)}
        </p>
        <div className="flex justify-end">
          <button onClick={handleAddCartItem} className="bg-blue-500 text-white px-4 py-1 rounded-md mt-4 hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
