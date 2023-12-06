"use server";

import PriceConverter from "@/components/priceConverter";
import prisma from "@/lib/prismaConnect";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { incrementProductQuantity } from "./actions";
import AddToCartButton from "./addToCartButton";

interface productProp {
  params: {
    slug: string;
  };
}
const products = cache(async (slug: string) => {
  const products = await prisma.product.findUnique({
    where: {
      id: slug,
    },
  });
  if (!products) notFound();
  return products;
});
export async function generateMetadata({
  params: { slug },
}: productProp): Promise<Metadata> {
  const product = await products(slug);
  return {
    title: product?.name + " | E-commerce shop",
    description: product?.description,
    openGraph: {
      images: [
        {
          url: product?.imgUrl,
        },
      ],
    },
  };
}
export default async function ProductPage({ params: { slug } }: productProp) {
  const product = await products(slug);

  return (
    <div className="card w-90  bg-base-100  shadow-xl  flex  md:items-center flex-col md:flex-row gap-4 mx-auto mt-10 my-5 sm:px-6 px-3 ">
      <div className="image-full my-2">
        <Image
          src={product?.imgUrl}
          alt={product?.name}
          width={500}
          height={500}
          className="object-cover aspect-auto  w-full rounded-lg"
        />
      </div>
      <div className=" flex-[50%] flex flex-col gap-3 py-3">
        <h1 className="card-title my-2">{product?.name}</h1>
        <div className="flex gap-3 items-center">
          {PriceConverter(product?.price)}
          <span className="underline text-primary">Free shipping</span>
        </div>
        <p className=""> {product?.description}</p>
        <div className="card-actions justify-end">
          <AddToCartButton
            productId={product?.id}
            incrementProductFunc={incrementProductQuantity}
            className="btn btn-primary rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
