import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const products = await Product.find();
    return response.status(200).json(products);
  }
  if (request.method === "POST") {
    try {
      const fishData = request.body;
      const fish = new Product(fishData);

      await fish.save();

      response.status(201).json({ status: "New Fish product" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
