"use client";

import PriceConverter from "@/components/priceConverter";
import { typeCartItems } from "@/lib/cart";
import Image from "next/image";
import { useTransition } from "react";
interface CartItems {
  product: typeCartItems;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartPage({
  product: { product, quantity, cartId },
  setProductQuantity,
}: CartItems) {
  const [isPending, startTransition] = useTransition();
  const QuantityOption: JSX.Element[] = [];

  for (let i = 1; i <= 20; i++) {
    QuantityOption.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <>
      <div className="card flex gap-5 flex-col lg:flex-row  justify-center lg:items-center">
        <div className="flex-1">
          <Image
            src={product?.imgUrl}
            width={300}
            height={300}
            alt={product?.name}
            className="object-contain aspect-auto w-full "
          />
        </div>
        <div className=" flex flex-col  gap-2 max-w-[700px] ">
          <h1 className="card-title">{product?.name}</h1>
          <span className="">
            {" "}
            <p className="text-zinc-500 text-[17px]">Description </p>{" "}
            {product?.description}
          </span>
          <span className="badge badge-secondary">
            price {PriceConverter(product?.price)}
          </span>
          <div className="quantities">
            <span>Quantity : </span>
            <select
              className="select w-full max-w-[60px] select-sm"
              defaultValue={quantity}
              onChange={(e) => {
                const quantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product?.id, quantity);
                });
              }}
            >
              <option value="0">0 (remove cart)</option>
              {QuantityOption}
            </select>
            {isPending && <span className="loading loading-ball " />}
          </div>
          <span className="inline-flex items-center gap-1">
            {" "}
            Total {PriceConverter(product?.price * quantity)}
          </span>
        </div>
      </div>
      <div className="divider" />
    </>
  );
}
