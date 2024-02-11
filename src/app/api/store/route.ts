import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!name) return new NextResponse("Name is required!", { status: 400 });

    const existingStore = await prismadb.store.findFirst({
      where: { name },
    });

    if (existingStore) {
      return NextResponse.json({ error: { name: "Store name already exists" } }, { status: 400 });
    }

    const newStore = await prismadb.store.create({
      data: { name, userId },
    });

    return NextResponse.json(newStore);
  } catch (err: unknown) {
    console.error(err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
