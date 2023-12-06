import PriceConverter from "@/components/priceConverter";
import { getCart } from "@/lib/cart";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "../loading";
import CartPage from "./CartPage";
import ProductQuantityUpdate from "./actions";
export default async function Cart() {
  const userCart = await getCart();

  return (
    <Suspense fallback={<Loading />}>
      <div className="my-10">
        <div className="flex flex-col justify-center lg:items-start items-center ">
          <h1 className="text-3xl my-10 ">Shopping Cart</h1>
          {!userCart?.productItems.length && (
            <div className=" mx-auto flex flex-col justify-center items-center gap-3 my-3 ">
              <h1 className="text-3xl font-bold ">Cart is empty</h1>
              <span className="flex justify-center items-center ">
                <Link href="/" className="btn btn-ghost">
                  Continue Shopping
                </Link>
              </span>
            </div>
          )}
          {userCart?.productItems.map((product) => (
            <CartPage
              product={product}
              key={product.id}
              setProductQuantity={ProductQuantityUpdate}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4  justify-center">
          <span className="badge badge-primary inline-flex font-bold gap-1">
            Total {PriceConverter(userCart?.subTotal || 0)}
          </span>
          <button className="btn btn-outline w-[200px]">Checkout</button>
        </div>
      </div>
    </Suspense>
  );
}
