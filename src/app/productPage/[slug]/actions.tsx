"use server";

import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/prismaConnect";
import { revalidatePath } from "next/cache";
export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());
  const product = cart.productItems.find(
    (product) => product.productId === productId
  );
  if (product) {
    await prisma.cartItem.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }
  revalidatePath("/productPage/[slug]");
}
