import { FilterLayout } from "@/components/Filters";
import { ProductsCards } from "@/components/ProductsCards";

export const HomePageFrame = () => {
  return (
    <main className="flex lg:flex-row flex-col justify-start items-start   lg:gap-20">
      <FilterLayout />
      <ProductsCards />
    </main>
  );
};
