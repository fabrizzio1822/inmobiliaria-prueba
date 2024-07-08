import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
export async function GET(req) {
  await dbConnect();
  try {
    const brands = await Product.distinct("brand");
    return NextResponse.json(brands);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Hubo un problema. Intenta otra vez!" },
      { status: 500 }
    );
  }
}