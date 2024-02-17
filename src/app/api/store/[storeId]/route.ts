import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest, { params }: { params: { storeName: string } }) {
  try {
    const user = auth();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

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
