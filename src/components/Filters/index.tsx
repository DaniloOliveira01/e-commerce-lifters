import { useApi } from "@/context/FetchProductContext";
import { useEffect, useState } from "react";

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

const CategoriesFilters = () => {
  const { produtos, filterCategorie, setFilterCategorie } = useApi();
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>(
    {},
  );

  const handleCheckboxChange = (categorie: string) => {
    setCheckboxState(prevState => ({
      ...prevState,
      [categorie]: !prevState[categorie],
    }));
  };

  useEffect(() => {
    const selectedCategorie = Object.keys(checkboxState).filter(
      categoria => checkboxState[categoria],
    );

    setFilterCategorie(selectedCategorie.length > 0 ? selectedCategorie : null);
  }, [checkboxState, setFilterCategorie]);

  useEffect(() => {
    console.log("DEBUG", filterCategorie);
  }, [filterCategorie]);

  return (
    <section className="flex flex-col justify-center items-start gap-5">
      <span className="text-base font-bold text-black">Categories</span>

      <article className="flex flex-col justify-center items-start gap-5">
        {produtos?.map((item, index) => (
          <div key={index} className="flex justify-center items-center gap-5">
            <input
              className="w-[20px] h-[20px] bg-secondary"
              type="checkbox"
              checked={checkboxState[item.categoria] || false}
              onChange={() => handleCheckboxChange(item.categoria)}
            />{" "}
            <span className="text-black text-base">{item.categoria}</span>
          </div>
        ))}
      </article>
    </section>
  );
};

const ColorFilters = () => {
  const CircleColor = [
    { code: "#DF9167" },
    { code: "#7B61FF" },
    { code: "#219653" },
    { code: "#2F80ED" },
    { code: "#EB5757" },
    { code: "#56CCF2" },
    { code: "#4F4F4F" },
    { code: "#BB6BD9" },
    { code: "#F2F2F2" },
    { code: "#6FCF97" },
  ];

  return (
    <section className="flex flex-col justify-start items-start gap-5">
      <span className="text-base font-bold text-black">Color</span>

      <div className="flex justify-start items-center flex-wrap gap-3">
        {CircleColor.map(item => (
          <div
            key={item.code}
            className="w-[25px] h-[25px] border-2 border-black rounded-full"
            style={{ background: item.code }}
          />
        ))}
      </div>
    </section>
  );
};
