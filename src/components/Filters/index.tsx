import { ButtonOrange } from "../Buttons";
import { CategoriesFilters } from "./CategoriesFilters";

export const FilterLayout = () => {
  return (
    <section className="flex flex-col justify-center lg:items-start items-center gap-5 mt-10 lg:pl-20">
      <article className="flex lg:flex-row flex-col justify-center items-center gap-5">
        <h3 className="text-2xl font-bold text-black">Filtros</h3>

        <ButtonOrange text={"Limpar Filtros"} />
      </article>

      <CategoriesFilters />
    </section>
  );
};
