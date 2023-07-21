import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //checking if the user exist
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unaouthorized", { status: 401 });
    }

    //checking if the name is exist
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    //creating store
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    // returning store
    return NextResponse.json(store)

  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
