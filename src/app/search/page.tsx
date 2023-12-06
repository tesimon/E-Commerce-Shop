import Card from "@/components/Card";
import prisma from "@/lib/prismaConnect";
import { Metadata } from "next";

interface SearchProps {
  searchParams: {
    query: string;
  };
}

export function generateMetadata({
  searchParams: { query },
}: SearchProps): Metadata {
  return {
    title: `Search : ${query} E-commecrce shop`,
  };
}

export default async function Search({ searchParams: { query } }: SearchProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      id: "desc",
    },
  });

  if (products === null || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 h-screen">
        <h1 className="text-3xl font-bold ">Search results</h1>
        <span className="flex justify-center items-center">
          No products found based on your{" "}
          <p className="font-bold  mx-2">"{query}"</p> search
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center gap-3 my-5 ">
      <h2 className="text-3xl font-bold">
        Search results for <span className=" mx-2">" {query} "</span>
      </h2>
      <section className="my-8 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        {products.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </section>
    </div>
  );
}
