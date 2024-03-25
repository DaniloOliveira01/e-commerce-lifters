import { useApi } from "@/context/FetchProductContext";
import { useEffect, useState } from "react";

export const CategoriesFilters = () => {
  const { produtos, setFiltroCategoria } = useApi();
  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCheckboxChange = (categoria: string) => {
    setCheckboxState(prevState => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  };

  useEffect(() => {
    const categoriasSelecionadas = Object.keys(checkboxState).filter(
      categoria => checkboxState[categoria],
    );

    setFiltroCategoria(
      categoriasSelecionadas.length > 0 ? categoriasSelecionadas : null,
    );
  }, [checkboxState, setFiltroCategoria]);

  return (
    <section className="flex flex-col justify-center items-start gap-5">
      <span className="text-xl font-bold text-black">Categoria:</span>

      <article className="flex flex-col justify-center items-start gap-5">
        {produtos?.map((item, index) => (
          <div key={index} className="flex justify-center items-center gap-5">
            <input
              type="checkbox"
              checked={checkboxState[item.categoria] || false}
              onChange={() => handleCheckboxChange(item.categoria)}
            />{" "}
            -{" "}
            <span className="text-black text-lg font-bold">
              {item.categoria}
            </span>
          </div>
        ))}
      </article>
    </section>
  );
};
