import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest, { params }: { params: { storeName: string } }) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await prismadb.store.findFirst({
      where: {
        name: params.storeName,
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(store);
  } catch (error: unknown) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    const { name } = body;
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prismadb.store
      .update({
        where: {
          id: params.storeId,
          userId,
        },
        data: {
          name,
        },
      })
      .catch(() => null);

    if (!store) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(store);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await prismadb.store
      .delete({
        where: {
          id: params.storeId,
          userId,
        },
      })
      .catch(() => null);

    if (!store) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(store);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
