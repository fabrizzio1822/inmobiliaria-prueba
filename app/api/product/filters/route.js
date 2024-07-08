import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";
import Category from "@/models/category";
export async function GET(req) {
  await dbConnect();
  const searchParams = queryString.parseUrl(req.url).query;
  const { page, category, brand, tag, ratings, minPrice, maxPrice } = searchParams || {};
  const pageSize = 6;
  const filter = {};
  if (category) {
    const categoryName = category;
    const categoryObjectId = await Category.findOne({ name: categoryName }).select('_id');
    if (categoryObjectId) {
      filter.category = categoryObjectId._id;
    }
  }
  if (brand) {
    filter.brand = brand;
  }
  if (tag) {
    filter.tags = tag;
  }
  if (minPrice && maxPrice) {
    filter.price = {
      $gte: minPrice,
      $lte: maxPrice,
    };
  }
  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    // Retrieve all products based on the applied filters
    const allProducts = await Product.find(filter)
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });
    const calculateAverageRating = (ratings) => {
      if (!Array.isArray(ratings) || ratings.length === 0) return 0;
      let totalRating = 0;
      ratings.forEach((rating) => {
        totalRating += rating.rating;
      });
      return totalRating / ratings.length;
    };
    const productsWithAverageRating = allProducts.map((product) => ({
      ...product.toObject(),
      averageRating: calculateAverageRating(product.ratings),
    }));
    const filteredProducts = productsWithAverageRating.filter((product) => {
      if (!ratings) {
        return true;
      }
      const targetRating = Number(ratings);
      const difference = product.averageRating - targetRating;
      return difference >= -0.5 && difference <= 0.5; 
    });
    const totalFilteredProducts = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);
    return NextResponse.json(
      {
        products: paginatedProducts,
        currentPage,
        totalPages: Math.ceil(totalFilteredProducts / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("filter products err => ", err);
    return NextResponse.json(
      {
        products: [],
        err: err.message,
      },
      { status: 500 }
    );
  }
}