import { Photo } from "@/@types";
import { useApi } from "@/context/FetchProductContext";
import { truncateText } from "@/utils/TruncateText";
import Image from "next/image";
import Link from "next/link";

import { ButtonOrange } from "../Buttons";

export const ProductsCards: React.FC = () => {
  const { produtos } = useApi();

  return (
    <section className="pt-20 flex-wrap flex justify-center items-center gap-10">
      {produtos.map((item, index) => (
        <aside
          key={index}
          className="bg-slate-50 rounded-2xl w-[250px] py-5 flex flex-col justify-start items-center gap-2"
        >
          {filterCapaPhoto(item.fotos) && (
            <figure className="relative overflow-hidden rounded-2xl w-[200px] h-[200px]">
              <Image
                src={filterCapaPhoto(item.fotos)?.url || ""}
                layout="fill"
                objectFit="contain"
              />
            </figure>
          )}

          <h3 className="text-secondary text-lg font-bold">{item.titulo}</h3>

          <span className="text-black font-medium text-center text-sm px-3">
            {truncateText(item.descricao, 50)}
          </span>

          <span className="text-secondary text-lg font-bold">
            Price: {item.valor}
          </span>

          <ButtonOrange
            text={
              <Link
                href={{
                  pathname: `/product/${item.titulo}`,
                  query: {
                    productData: JSON.stringify(item),
                  },
                }}
              >
                Veja mais
              </Link>
            }
          />
        </aside>
      ))}
    </section>
  );
};

const filterCapaPhoto = (photos: Photo[]): Photo | undefined => {
  return photos.find(photo => photo.capa);
};
