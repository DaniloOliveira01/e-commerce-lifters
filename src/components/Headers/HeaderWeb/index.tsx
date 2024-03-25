import { ProductCart } from "@/components/ProductCart";
import { useCart } from "@/context/AddProductCartContext";
import Link from "next/link";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";

import { DATA_HEADER } from "../data";

const HeaderLinks = () => {
  return (
    <nav className="lg:flex hidden justify-center items-center gap-10">
      {DATA_HEADER.map(item => (
        <Link href={item.link} key={item.id}>
          <span className="hover:text-secondary cursor-pointer text-xl">
            {item.page}
          </span>
        </Link>
      ))}
    </nav>
  );
};

const HeaderWeb = () => {
  const { cart } = useCart();
  const [isCart, setIsCart] = useState(false);

  return (
    <header className="bg-primary flex justify-between items-center lg:px-20 px-5 h-[80px] border-b-2 border-zinc-400">
      <aside className="flex justify-center items-center gap-10">
        <Link href={"/"}>
          <h3 className="text-primary font-bold lg:text-4xl text-2xl cursor-pointer">
            Lifters Shop
          </h3>
        </Link>

        <HeaderLinks />
      </aside>

      <figure
        onClick={() => setIsCart(!isCart)}
        className="relative cursor-pointer"
      >
        <div className="bg-red-600 absolute w-[20px] h-[20px] rounded-full flex justify-center items-center">
          <span className="text-sm text-white">{cart.length}</span>
        </div>
        <IoMdCart size={40} color="#fff" />
      </figure>

      {isCart && <ProductCart setIsCart={setIsCart} />}
    </header>
  );
};

export default HeaderWeb;
