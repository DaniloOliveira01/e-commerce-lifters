import { Product } from "@/@types";
import { ButtonBlack, ButtonGray } from "@/components/Buttons";
import { useCart } from "@/context/AddProductCartContext";
import { useProductSelection } from "@/context/ProductSelectionContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface ProductImageProps {
  url: string;
}

interface ColorProps {
  codigo: string;
  isSelected: boolean;
  onClick: () => void;
}

interface SizeProps {
  size: string;
  isSelected: boolean;
  onClick: () => void;
}

interface CartItem extends Product {
  color: string;
  size: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ url }) => (
  <figure className="relative w-[260px] h-[260px]">
    <Image src={url} objectFit="contain" layout="fill" />
  </figure>
);

export const Color: React.FC<ColorProps> = ({
  codigo,
  isSelected,
  onClick,
}) => (
  <div
    className={`w-[60px] h-[60px] rounded-full cursor-pointer ${
      isSelected ? "border-4 border-black" : ""
    }`}
    style={{ backgroundColor: codigo === "#0000" ? "#000" : codigo }}
    onClick={onClick}
    role="button"
    aria-pressed={isSelected}
  />
);

const Size: React.FC<SizeProps> = ({ size, isSelected, onClick }) => (
  <div
    className={`w-[60px] h-[60px] border-2 flex justify-center items-center cursor-pointer ${
      isSelected ? "border-black" : ""
    }`}
    onClick={onClick}
    role="button"
    aria-pressed={isSelected}
  >
    <span className="text-black font-semibold lg:text-left text-center">
      {size}
    </span>
  </div>
);

const getProductFromQuery = (query: any): Product | null => {
  if (!query.productData) return null;
  const productData = Array.isArray(query.productData)
    ? query.productData[0]
    : query.productData;
  return JSON.parse(productData) as Product;
};

export const InfoProducts: React.FC = () => {
  const router = useRouter();
  const product = getProductFromQuery(router.query);
  const { addToCart } = useCart();
  const {
    selectedColor,
    selectedSize,
    selectColor,
    selectSize,
    clearSetSelecteds,
  } = useProductSelection();

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize)
      return toast.warn(
        "Choose the color and size of the product before adding to cart!",
      );

    toast.success("Product added to cart!");
    const cartItem: CartItem = {
      ...product,
      color: selectedColor,
      size: selectedSize,
    };
    addToCart(cartItem);
    clearSetSelecteds();
  };

  return (
    <section className="flex lg:flex-row flex-col-reverse justify-center items-center gap-5 h-full pt-10 lg:pt-24">
      <aside className="max-w-[900px] grid grid-cols-2 justify-center items-center gap-3">
        {product?.fotos.map((item, index) => (
          <ProductImage key={index} url={item.url} />
        ))}
      </aside>

      <article className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-5 p-5">
        <h3 className="lg:text-4xl text-3xl text-black">{product?.titulo}</h3>
        <span className="lg:w-[600px] w-[350px] text-lg text-black lg:text-left text-center">
          {product?.descricao}
        </span>

        <span className="text-black font-semibold lg:text-left text-center">
          Color
        </span>
        <aside className="flex justify-center gap-5">
          {product?.cores.map((item, index) => (
            <Color
              key={index}
              codigo={item.codigo}
              isSelected={item.codigo === selectedColor}
              onClick={() => selectColor(item.codigo)}
            />
          ))}
        </aside>

        <span className="text-black font-semibold lg:text-left text-center">
          Size
        </span>
        <aside className="flex flex-wrap justify-center gap-3">
          {product?.tamanhos.map((size, index) => (
            <Size
              key={index}
              size={size}
              isSelected={size === selectedSize}
              onClick={() => selectSize(size)}
            />
          ))}
        </aside>

        <div className="flex justify-center items-center gap-3">
          <ButtonBlack onClick={handleAddToCart} text={"Add to Bag"} />
          <ButtonGray text={<Link href={"/"}>Back</Link>} />
        </div>
      </article>
    </section>
  );
};
