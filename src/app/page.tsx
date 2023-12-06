import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import PriceConverter from "@/components/priceConverter";
import prisma from "@/lib/prismaConnect";
import Image from "next/image";
import Link from "next/link";
import { incrementProductQuantity } from "./productPage/[slug]/actions";
import AddToCartButton from "./productPage/[slug]/addToCartButton";

type Props = {
  searchParams: {
    page: string;
  };
};
const Home = async ({ searchParams: { page = "1" } }: Props) => {
  const currentPage = parseInt(page);

  const productSizePerPage = 6;
  const heroContent = 1;
  const totalProduct = await prisma.product.count();

  const totalPages = Math.ceil(
    (totalProduct - heroContent) / productSizePerPage
  );

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    take: productSizePerPage + (currentPage === 1 ? heroContent : 0),
    skip:
      productSizePerPage * (currentPage - 1) +
      (currentPage === 1 ? 0 : heroContent),
  });

  if (!products) throw new Error("Failed to fetch products");
  return (
    <>
      {currentPage === 1 && (
        <header className=" flex md:justify-around justify-center gap-5  lg:flex-row flex-col-reverse mx-4 my-16 ">
          <div className="card-side max-w-[600px] flex flex-col gap-5">
            <Link
              href={"/"}
              className="link link-primary text-lg w-max rounded-lg"
            >
              New release
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold font-sans mt-4 ">
              {products[0].name}
            </h1>
            <span className="badge badge-info mt-2">
              {PriceConverter(products[0].price)}
            </span>
            <p className="my-5 text-sm font-mono  font-bold leading-7">
              {products[0].description}
            </p>
            <div className="flex gap-3 ">
              <AddToCartButton
                productId={products[0].id}
                incrementProductFunc={incrementProductQuantity}
                className="btn btn-primary"
              />

              <Link
                href={`/productPage/${products[0].id}`}
                className="btn btn-outline rounded-md"
              >
                check it out
              </Link>
            </div>
          </div>

          <Image
            src={products[0].imgUrl}
            alt="ai-image"
            width="500"
            height="500"
            className="object-contain w-full rounded-md max-w-[700px]"
          />
        </header>
      )}
      <section className="my-8 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};
export default Home;
