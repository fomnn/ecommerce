import type { ProductWithImageUrls } from "@/types/product";
import ProductCart from "@/components/ProductCard";
import { apiFetch } from "@/lib/ofetch";
import { useGetProducts } from "@/services/product-service";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import cs from "clsx";
import { useMemo, useState } from "react";
import SolarMagniferLinear from "~icons/solar/magnifer-linear";

type ProductCategory = "makanan_anjing" | "makanan_kucing" | "makanan_burung";

enum SortByOption {
  PriceAscending = "Harga Terendah",
  PriceDescending = "Harga Tertinggi",
}

interface ShopSearch {
  category?: ProductCategory;
  sortBy?: SortByOption;
}

export const Route = createFileRoute("/shop")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    return {
      category: (search.category as ProductCategory),
      sortBy: (search.sortBy as SortByOption) || SortByOption.PriceAscending,
    };
  },
  loader: async () => {
    const { products } = await apiFetch<{ products: ProductWithImageUrls[] }>("/products");

    return products;
  },
});

function RouteComponent() {
  const { category, sortBy } = Route.useSearch();
  const data = Route.useLoaderData();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const productsFiltered = useMemo(() => {
    let data2;
    switch (category) {
      case "makanan_anjing":
        data2 = data!.filter(p => p.category === "makanan_anjing");
        break;
      case "makanan_kucing":
        data2 = data!.filter(p => p.category === "makanan_kucing");
        break;
      case "makanan_burung":
        data2 = data!.filter(p => p.category === "makanan_burung");
        break;
      case undefined:
        data2 = data;
        break;
      default:
        data2 = data;
        break;
    }

    if (searchText && searchText !== "") {
      data2 = data2?.filter(d => d.title.includes(searchText));
    }

    return data2;
  }, [category, searchText, data]);

  const productsSorted = useMemo(() => {
    switch (sortBy) {
      case SortByOption.PriceAscending:
        return productsFiltered?.sort((a, b) => a.price - b.price);
      case SortByOption.PriceDescending:
        return productsFiltered?.sort((a, b) => b.price - a.price);
      default:
        return productsFiltered?.sort((a, b) => a.price - b.price);
    }
  }, [productsFiltered, sortBy]);

  function handleChangeSelectedSortOption(selectedSortOption: SortByOption) {
    navigate({
      to: ".",
      search: {
        category,
        sortBy: selectedSortOption,
      },
    });
  }

  return (
    <div className="px-16 py-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-8">
          <div className="flex gap-2">
            <Link
              to="."
              search={{ category: category === "makanan_anjing" ? undefined : "makanan_anjing" }}
              className={cs("border border-zinc-300 px-4 py-1 rounded text-sm", {
                "bg-orange-200 border-orange-400": category === "makanan_anjing",
              })}
              type="button"
            >
              Makanan Anjing
            </Link>
            <Link
              to="."
              search={{ category: category === "makanan_kucing" ? undefined : "makanan_kucing" }}
              className={cs("border border-zinc-300 px-4 py-1 rounded text-sm", {
                "bg-orange-200 border-orange-400": category === "makanan_kucing",
              })}
              type="button"
            >
              Makanan Kucing
            </Link>
            <Link
              to="."
              search={{ category: category === "makanan_burung" ? undefined : "makanan_burung" }}
              className={cs("border border-zinc-300 px-4 py-1 rounded text-sm", {
                "bg-orange-200 border-orange-400": category === "makanan_burung",
              })}
              type="button"
            >
              Makanan Burung
            </Link>
          </div>
          <div className="border flex gap-3 items-center rounded px-2 py-1">
            <SolarMagniferLinear className="text-zinc-400" />
            <input
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search"
              className="focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm">Sort By</p>
          <select
            defaultValue={sortBy}
            onChange={e => handleChangeSelectedSortOption(e.target.value as SortByOption)}
            className="border px-2 py-1 rounded-md"
          >
            <option value={SortByOption.PriceAscending}>Harga Terendah</option>
            <option value={SortByOption.PriceDescending}>Harga Tertinggi</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-6 mt-6">
        {
          productsSorted?.map((product, i) => {
            return <ProductCart product={product} key={i} />;
          })
        }
      </div>
    </div>
  );
}
