import FormButton from "@/components/FormButton";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prismaConnect";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "add product/E-commerce shop",
  description: "spend your money cous",
};

async function addProduct(data: FormData) {
  "use server";
  const name = data.get("name")?.toString();
  const description = data.get("description")?.toString();
  const imgurl = data.get("imgurl")?.toString();
  const price = Number(data.get("price") || 0);
  if (!name || !description || !imgurl || !price)
    throw new Error("Missing fields");

  await prisma.product.create({
    data: {
      name,
      description,
      imgUrl: imgurl,
      price,
    },
  });

  redirect("/");
}

export default async function AddProduct() {
  const session = await getServerSession(authOptions);
  return (
    <div className="max-w-[800px] flex justify-center items-center flex-col mx-auto my-5 ">
      <h1 className="my-3">Add Product</h1>
      {!session ? (
        <div className="flex justify-center h-screen items-center gap-5">
          <span className="font-bold text-base">
            You need to be logged in to add products
            <Link
              href="/api/auth/signin?callbackUrl=/addproduct"
              className="btn btn-ghost btn-outline mx-3"
            >
              Sign in{" "}
            </Link>
          </span>
        </div>
      ) : (
        <form action={addProduct}>
          <input
            type="text"
            placeholder="Product name"
            className="input input-bordered mb-2 w-full"
            required
            name="name"
          />
          <textarea
            name="description"
            placeholder="Product desc"
            required
            className="textarea textarea-bordered mb-2 w-full"
          />
          <input
            type="url"
            placeholder="Product image url"
            className="input input-bordered mb-2 w-full"
            name="imgurl"
            required
          />
          <input
            type="number"
            placeholder="Product price"
            name="price"
            className="input input-bordered mb-2 w-full"
            required
          />
          <FormButton
            type="submit"
            className=" btn btn-outline btn-ghost mt-2 w-full "
          >
            Add Product
          </FormButton>
        </form>
      )}
    </div>
  );
}
