"use server";
import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/prismaConnect";
import { revalidatePath } from "next/cache";
export default async function ProductQuantityUpdate(
  productId: string,
  quantity: number
) {
  const cart = (await getCart()) ?? (await createCart());
  const cartItem = cart.productItems.find(
    (product) => product.productId === productId
  );
  if (cartItem) {
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity,
      },
    });
  }
  if (quantity === 0) {
    if (cartItem) {
      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });
    }
  }

  if (!cartItem) {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  revalidatePath("/cart");
}
