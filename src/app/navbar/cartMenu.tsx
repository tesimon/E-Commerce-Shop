"use client";
import PriceConverter from "@/components/priceConverter";
import { typesCarts } from "@/lib/cart";
import Link from "next/link";

interface Props {
  cartdetails: typesCarts | null;
}
const CartMenu = ({ cartdetails }: Props) => {
  const togglecartMenu = () => {
    const element = document.activeElement as HTMLElement;
    if (element) {
      element.blur();
    }
  };
  return (
    <div>
      <div className=" dropdown dropdown-left " role="button" tabIndex={0}>
        <button
          className="font-bold btn btn-outline btn-sm  items-center inline-flex gap-1 rounded-md"
          onClick={() => {}}
        >
          {cartdetails?.size ? cartdetails.size : 0}
          <svg
            width="20px"
            height="20px"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16.5" cy="18.5" r="1.5" />
            <circle cx="9.5" cy="18.5" r="1.5" />
            <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
          </svg>
        </button>

        <div
          tabIndex={0}
          className="dropdown-content  z-[20] card card-compact w-64 p-2 shadow bg-base-100 mt-10 mr-3 gap-3 "
        >
          <div className="card-body">
            <span className="text-primary font-bold text-[15px]">
              items : {cartdetails?.size || 0}
            </span>
            <span className="card-info inline-flex gap-1 text-secondary">
              sub total : {PriceConverter(cartdetails?.subTotal || 0)}
            </span>
            <Link
              href={"/cart"}
              onClick={togglecartMenu}
              className="btn btn-primary btn-sm w-full"
            >
              view cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartMenu;
