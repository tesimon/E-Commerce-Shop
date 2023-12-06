import { authOptions } from "@/lib/authOptions";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cookies } from "next/dist/client/components/headers";
import prisma from "./prismaConnect";

export type cartWithProducts = Prisma.CartGetPayload<{
  include: {
    productItems: {
      include: {
        product: true;
      };
    };
  };
}>;

export type typesCarts = cartWithProducts & {
  size: number;
  subTotal: number;
};

export type typeCartItems = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;

export async function getCart(): Promise<typesCarts | null> {
  const session = await getServerSession(authOptions);

  let cart: cartWithProducts | null = null;
  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        productItems: {
          include: {
            product: true,
          },
        },
      },
    });
  } else {
    const cartId = cookies().get("cartId")?.value;
    cart = cartId
      ? await prisma.cart.findUnique({
          where: {
            id: cartId,
          },
          include: {
            productItems: {
              include: {
                product: true,
              },
            },
          },
        })
      : null;
  }
  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.productItems.reduce((acc, item) => acc + item.quantity, 0),
    subTotal: cart.productItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}

export async function createCart(): Promise<typesCarts> {
  const session = await getServerSession(authOptions);

  let tempoCart: Cart;

  if (session) {
    tempoCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    tempoCart = await prisma.cart.create({
      data: {},
    });
    cookies().set("cartId", tempoCart.id);
  }

  return {
    ...tempoCart,
    productItems: [],
    size: 0,
    subTotal: 0,
  };
}

export async function mergingAnonymousToUserCart(userId: string) {
  const localCardId = cookies().get("cartId")?.value;
  const cart = localCardId
    ? await prisma.cart.findUnique({
        where: {
          id: localCardId,
        },
        include: {
          productItems: true,
        },
      })
    : null;
  if (!cart) return;
  const userCart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
    include: {
      productItems: true,
    },
  });
  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedcartItems = mergeCartItems(
        cart?.productItems,
        userCart?.productItems
      );
      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });
      await tx.cartItem.createMany({
        data: mergedcartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          productItems: {
            createMany: {
              data: cart?.productItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where: {
        id: localCardId,
      },
    });
    cookies().set("cartId", "");
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
