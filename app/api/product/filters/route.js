import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";
import Category from "@/models/category";
import Tag from "@/models/tag"; // Importa el modelo Tag

export async function GET(req) {
  try {
    await dbConnect();
    console.log("Database connected successfully");

    const searchParams = queryString.parseUrl(req.url).query;
    console.log("Search parameters:", searchParams);

    const { page, category, tag } = searchParams || {};
    const pageSize = 20;
    const filter = {};

    if (category) {
      const categoryName = category;
      const categoryObjectId = await Category.findOne({ name: categoryName }).select('_id');
      if (categoryObjectId) {
        filter.category = categoryObjectId._id;
      }
    }

    if (tag) {
      const tagName = tag;
      const tagObjectId = await Tag.findOne({ name: tagName }).select('_id');
      if (tagObjectId) {
        filter.tags = tagObjectId._id;
      }
    }

    console.log("Filter applied:", filter);

    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    console.log("Pagination settings - currentPage:", currentPage, "skip:", skip);

    const allProducts = await Product.find(filter)
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    console.log("All products retrieved:", allProducts);

    const paginatedProducts = allProducts.slice(skip, skip + pageSize);

    console.log("Paginated products:", paginatedProducts);

    return NextResponse.json(
      {
        products: paginatedProducts,
        currentPage,
        totalPages: Math.ceil(allProducts.length / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error while filtering products:", err);
    return NextResponse.json(
      {
        products: [],
        err: err.message,
      },
      { status: 500 }
    );
  }
}
