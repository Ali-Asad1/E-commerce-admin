import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(req: NextRequest, { params }: { params: { storeId: string; billboardId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 404 });
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const editedBillboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(editedBillboard);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { storeId: string; billboardId: string } }) {
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

    const editedBillboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(editedBillboard);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
