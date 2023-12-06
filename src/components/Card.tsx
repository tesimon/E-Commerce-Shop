import { incrementProductQuantity } from "@/app/productPage/[slug]/actions";
import AddToCartButton from "@/app/productPage/[slug]/addToCartButton";
import Image from "next/image";
import Link from "next/link";
import PriceConverter from "./priceConverter";
interface Props {
  product: {
    id: any;
    name: string;
    description: string;
    imgUrl: string;
    price: number;
    createdAt: any;
    updatedAt: any;
  };
}
export default function Card({ product }: Props) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <div className="card  bg-base-100 shadow-xl items-center justify-center">
      <figure>
        <Image
          width={400}
          height={400}
          src={product.imgUrl}
          alt="Shoes"
          className="w-full object-contain  "
        />
      </figure>
      <div className="card-body">
        <Link href={`/productPage/${product.id}`} className="card-title">
          {product.name}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </Link>
        <span className="badge badge-info my-2">
          {PriceConverter(product.price)}
        </span>
        <p className="text-sm"> {product.description}</p>
        <div className="card-actions justify-center my-2">
          <AddToCartButton
            productId={product.id}
            incrementProductFunc={incrementProductQuantity}
            className=" btn-sm  "
          />

          <Link
            href={`/productPage/${product.id}`}
            className="btn btn-outline btn-accent btn-sm  rounded-md"
          >
            check it out
          </Link>
        </div>
      </div>
    </div>
  );
}
