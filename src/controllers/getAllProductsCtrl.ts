import ProductModel from "../models/Product";

export default async function getAllProductsCtrl(req, res) {
    const { url } = req.body
    const products = await ProductModel.find({
        origin: url
    })

    res.send(products)
}