import { Photo } from "@/@types";
import { useCart } from "@/context/AddProductCartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { ButtonWhite } from "../Buttons";

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
        const totalValue = parseFloat(item.valor.replace("$", ""));
        if (!isNaN(totalValue)) {
          total += totalValue;
        }
      });
      setTotalPrice(total.toFixed(2));
    };

    calculateTotalPrice();
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length < 1) return toast.warn("Your shopping cart is empty!");

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
      className="bg-primary z-50 absolute w-[350px] px-5 h-[400px] top-16 right-2 flex flex-col justify-start items-center gap-5 py-10 overflow-y-auto box-shadow"
    >
      <span
        onClick={clearCart}
        className="self-start cursor-pointer text-base text-primary font-medium hover:underline"
      >
        Clear Cart
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
        <hr className="w-full h-2" />

        <h2 className="text-xl font-bold text-primary">
          Total: R$ {totalPrice}
        </h2>

        <ButtonWhite onClick={handleCheckout} text="Checkout" />
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
    toast.error(`${item.titulo} removed from cart!`);
    removeFromCart(item.titulo);
  };

  return (
    <aside className="flex justify-between items-start gap-5 px-3">
      <div className="flex justify-start items-start gap-3">
        {filterCapaPhoto(item.fotos) && (
          <figure className="relative w-[80px] h-[80px]">
            <Image
              src={filterCapaPhoto(item.fotos)?.url || ""}
              layout="fill"
              objectFit="contain"
            />
          </figure>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-primary text-base">{item.titulo}</span>

          <div className="flex justify-start items-center gap-2">
            <span className="text-primary w-[25px] h-[25px] text-sm flex justify-center items-center border-2 border-white">
              {item.size}
            </span>

            <div
              className={`w-[25px] h-[25px] rounded-full`}
              style={{ backgroundColor: item.color }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-6">
        <span className="text-primary font-semibold text-xl">{item.valor}</span>

        <FaRegTrashAlt
          className="cursor-pointer"
          onClick={handleRemoveFromCart}
          size={25}
          color="#FF0000"
        />
      </div>
    </aside>
  );
};

const EmptyCart = () => (
  <article className="flex flex-col justify-center items-center gap-5">
    <h3 className="text-2xl text-primary">Empty Cart</h3>
    <ButtonWhite text={<Link href={"/"}>Buy Now</Link>} />
  </article>
);

const filterCapaPhoto = (photos: Photo[]): Photo | undefined => {
  return photos.find(photo => photo.capa);
};
