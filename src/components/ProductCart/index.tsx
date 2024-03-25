import { Photo } from "@/@types";
import { useCart } from "@/context/AddProductCartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import { ButtonOrange } from "../Buttons";

interface WindowCartProps {
  setIsCart: Dispatch<SetStateAction<boolean>>;
}

export const ProductCart = ({ setIsCart }: WindowCartProps) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState<string>("0");
  const router = useRouter();

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cart.forEach(item => {
        const numericValue = parseFloat(item.valor.replace("$", ""));
        if (!isNaN(numericValue)) {
          total += numericValue;
        }
      });
      setTotalPrice(total.toFixed(2));
    };

    calculateTotalPrice();
  }, [cart]);

  const handleCheckout = () => {
    router.push({
      pathname: "/checkout",
      query: {
        cart: JSON.stringify(cart),
        totalPrice,
      },
    });
  };

  return (
    <section
      onMouseLeave={() => setIsCart(false)}
      className="bg-white z-50 absolute w-[350px] px-5 h-[600px] rounded-2xl top-16 right-2 flex flex-col justify-start items-center gap-5 py-10"
    >
      <span
        onClick={clearCart}
        className="self-start cursor-pointer text-base text-black hover:underline hover:text-secondary"
      >
        Limpar tudo
      </span>

      {cart.length > 0 ? (
        cart.map((item, index) => (
          <ProductCartItem
            key={index}
            item={item}
            removeFromCart={removeFromCart}
          />
        ))
      ) : (
        <EmptyCart />
      )}

      <div className="mt-auto flex flex-col justify-center items-center gap-3">
        <h2 className="text-xl font-bold text-black">Total: R$ {totalPrice}</h2>

        <ButtonOrange onClick={handleCheckout} text="Checkout" />
      </div>
    </section>
  );
};

const ProductCartItem = ({
  item,
  removeFromCart,
}: {
  item: any;
  removeFromCart: any;
}) => {
  const handleRemoveFromCart = () => {
    removeFromCart(item.titulo);
  };

  return (
    <aside className="flex justify-between items-start gap-5 px-3">
      <div className="flex justify-start items-start gap-3">
        {filterCapaPhoto(item.fotos) && (
          <figure className="relative overflow-hidden rounded-2xl w-[80px] h-[80px]">
            <Image
              src={filterCapaPhoto(item.fotos)?.url || ""}
              layout="fill"
              objectFit="contain"
            />
          </figure>
        )}

        <div className="flex flex-col gap-3">
          <span className="text-black">{item.titulo}</span>

          <div className="flex justify-start items-center gap-2">
            <span className="text-black w-[30px] h-[30px] text-sm flex justify-center items-center border-2 border-black">
              {item.size}
            </span>

            <div
              className={`w-[20px] h-[20px] rounded-full`}
              style={{ backgroundColor: item.color }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <span className="text-black text-xl">{item.valor}</span>

        <FaRegTrashAlt onClick={handleRemoveFromCart} size={25} color="#000" />
      </div>
    </aside>
  );
};

const EmptyCart = () => (
  <article className="flex flex-col justify-center items-center">
    <h3 className="text-2xl text-black">Carrinho vazio!</h3>
    <ButtonOrange text={<Link href={"/"}>Buy Now</Link>} />
  </article>
);

const filterCapaPhoto = (photos: Photo[]): Photo | undefined => {
  return photos.find(photo => photo.capa);
};
