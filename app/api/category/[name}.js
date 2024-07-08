import Category from "@/models/category";
import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  await dbConnect();
  const { name } = req.query;
  try {
    const category = await Category.findOne({ name }).exec();
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ id: category._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}