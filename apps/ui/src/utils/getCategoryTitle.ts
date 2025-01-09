import type { CategorySlugs } from "@/types/product";

export default (categorySlug: CategorySlugs) => {
  switch (categorySlug) {
    case "makanan_anjing":
      return "Makanan Anjing";
    case "makanan_kucing":
      return "Makanan Kucing";
    case "makanan_burung":
      return "Makanan Burung";
    default:
      return null;
  }
};
