import Product from "@/models/product";
import Category from "@/models/category";
import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  await dbConnect();
  const { page, minPrice, maxPrice, category, tag, brand, location } = req.query;
  let filter = {};

  if (minPrice) {
    filter.price = { ...filter.price, $gte: minPrice };
  }
  if (maxPrice) {
    filter.price = { ...filter.price, $lte: maxPrice };
  }
  if (category) {
    try {
      const categoryDoc = await Category.findOne({ name: category }).exec();
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  if (tag) {
    filter.tags = tag;
  }
  if (brand) {
    filter.brand = brand;
  }
  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }
  try {
    const products = await Product.find(filter)
      .skip((page - 1) * 10)
      .limit(10)
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}