import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(req: NextRequest, { params }: { params: { storeId: string; categoryId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 404 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId) return new NextResponse("Billboard ID is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const editedCategory = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(editedCategory);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { storeId: string; categoryId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 404 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const editedBillboard = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(editedBillboard);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
