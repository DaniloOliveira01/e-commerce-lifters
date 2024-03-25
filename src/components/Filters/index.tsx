import { CategoriesFilters, ColorFilters } from "./FilterLayout";

export const FilterLayout = () => {
  return (
    <section className="flex w-[280px] flex-col justify-start lg:items-start items-center gap-5 mt-20 lg:pl-20">
      <article className="flex lg:flex-row flex-col justify-center items-center gap-3">
        <h3 className="text-xl font-semibold text-black">Filters</h3>

        <span className="text-sm text-[#C4C4C4] hover:underline cursor-pointer">
          Clear filters
        </span>
      </article>

      <CategoriesFilters />
      <ColorFilters />
    </section>
  );
};
