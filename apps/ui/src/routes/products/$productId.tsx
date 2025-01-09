import { useGetProductById } from "@/services/product-service";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const productId = Route.useParams().productId;
  const { data: productData } = useGetProductById(productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const router = useRouter();
  const onBack = () => router.history.back();
  // TODO: perbaiki back button
  // TODO: add to cart functionality
  return (
    <div className="px-16 py-8">
      <button onClick={onBack}>back</button>
      <div className="flex gap-8 min-h-[90vh]">
        <div className="w-5/12 h-[60vh] flex gap-3">
          <div className="w-1/12 overflow-y-hidden">
            <div className="space-y-3">
              { productData?.image_urls && productData.image_urls.map((imageUrl, i) => {
                return (
                  <div
                    className="w-full aspect-square bg-zinc-200 cursor-pointer"
                    onClick={() => setSelectedImageIndex(i)}
                    key={imageUrl.id}
                  >
                    <img
                      src={imageUrl.url}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-11/12">
            {productData?.image_urls[selectedImageIndex] && (
              <img
                src={productData.image_urls[selectedImageIndex].url}
                alt=""
                className="size-full bg-zinc-300 object-cover"
              />
            )}
          </div>
        </div>
        <div className="w-7/12 flex flex-col gap-2">
          <div className="">
            {/* <span className="text-sm text-orange-700">{}</span> */}
            <h1 className="text-2xl">{productData?.title}</h1>
          </div>
          <p className="text-3xl font-semibold">
            $
            {productData?.price.toFixed(2)}
          </p>
          <div className="">
            <h3 className="font-semibold">Description</h3>
            <p>{productData?.description }</p>
          </div>
          <div className="flex gap-3 mt-10">
            <button className="py-2 w-full border border-zinc-300 rounded-full bg-zinc-100">Add to Cart</button>
            <button className="py-2 w-full rounded-full bg-orange-400 text-black border border-orange-700">Checkout Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
