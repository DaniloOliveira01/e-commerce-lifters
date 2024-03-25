import { ProductCart } from "@/components/ProductCart";
import { useCart } from "@/context/AddProductCartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";

import { DATA_HEADER } from "./data";

const HeaderLinks = () => {
  return (
    <nav className="lg:flex hidden justify-center items-center gap-10">
      {DATA_HEADER.map(item => (
        <Link href={item.link} key={item.id}>
          <span className="cursor-pointer text-lg">{item.page}</span>
        </Link>
      ))}
    </nav>
  );
};

const HeaderWeb = () => {
  const { cart } = useCart();
  const [isCart, setIsCart] = useState(false);

  return (
    <header className="bg-primary flex justify-between items-center lg:px-20 px-5 h-[60px] border-b-2 border-zinc-400">
      <aside className="flex justify-center items-center gap-10">
        <Link href={"/"}>
          <h3 className="text-primary font-bold text-xl cursor-pointer">
            Lifters Shop
          </h3>
        </Link>

        <HeaderLinks />
      </aside>

      <div className="flex justify-center items-center gap-5">
        <div
          onClick={() => setIsCart(!isCart)}
          className="flex justify-center items-center gap-3 cursor-pointer"
        >
          <figure className="relative w-[17px] h-[21px]">
            <Image
              src={"/images/header/cart-shop.webp"}
              alt={`Carrinho de compras na cor branca com ${cart.length} items.`}
              objectFit={"contain"}
              layout={"fill"}
            />
          </figure>

          <span className="text-lg">{cart.length}</span>
        </div>

        <span className="text-lg ">Login</span>
      </div>

      {isCart && <ProductCart setIsCart={setIsCart} />}
    </header>
  );
};

export default HeaderWeb;
