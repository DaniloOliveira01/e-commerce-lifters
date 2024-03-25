import { Photo } from "@/@types";
import { useApi } from "@/context/FetchProductContext";
import Image from "next/image";
import Link from "next/link";

import { ButtonBlack } from "../Buttons";

export const ProductsCards: React.FC = () => {
  const { produtos } = useApi();

  return (
    <section className="pt-20 flex-wrap flex justify-start items-center gap-10">
      {produtos.map((item, index) => (
        <aside
          key={index}
          className="w-[264px] flex flex-col justify-start items-start gap-2"
        >
          {filterCapaPhoto(item.fotos) && (
            <figure className="relative w-[264px] h-[264px]">
              <Image
                src={filterCapaPhoto(item.fotos)?.url || ""}
                layout="fill"
                objectFit="contain"
              />
            </figure>
          )}

          <div className="flex justify-start items-start flex-wrap gap-3">
            {item.tamanhos.map((item, index) => (
              <span
                className="text-sm text-black border-[1px] border-black w-[30px] h-[30px] flex justify-center items-center"
                key={index}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex justify-between gap-16">
            <h3 className="text-lg text-black">{item.titulo}</h3>

            <span className="text-lg text-black font-bold">{"M"}</span>
          </div>

          <ButtonBlack
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
