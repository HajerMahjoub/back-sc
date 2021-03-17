import ProductModel from "../models/Product";

export default async function getProductCtrl(req, res) {
    const { id } = req.params

    const products = await ProductModel.find({
        _id: id
    })

    res.send(products)
}