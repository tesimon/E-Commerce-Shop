"use client";

import { useState, useTransition } from "react";

type ButtonProps = {
  incrementProductFunc: (productId: string) => Promise<void>;
  productId: string;
  className?: string;
};

export default function AddToCartButton({
  incrementProductFunc,
  productId,
  className,
}: ButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [sucsess, setsucsess] = useState(false);

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        className={`btn btn-primary ${className} rounded-md`}
        onClick={() => {
          setsucsess(false);
          startTransition(async () => {
            await incrementProductFunc(productId);
            setsucsess(true);
          });
        }}
      >
        {isPending && !sucsess ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          "Add to cart"
        )}
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

      {sucsess && (
        <span className=" text-slate-500 text-xs">Added to cart</span>
      )}
    </div>
  );
}
