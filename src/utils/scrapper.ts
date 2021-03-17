import axios from "axios"
import * as cheerio from "cheerio"
import ProductModel from "../models/Product";

export default async function scrapper(origin, url) {
    console.log('scrapping: ', url)

    const { data: html } = await axios.get(url)
    const $ = cheerio.load(html);

    // get current url infos
    const title = $('.summary .product_title').text()
    const prices = []
    const pricesTags = $('.summary .price bdi')
    pricesTags.each((i, elm) => {
        prices.push($(elm).text())
    })
    const description = $('.summary .post-content').text()

    const images = []
    const imagesTags = $('.woocommerce-product-gallery__image')
    imagesTags.each((i, elm) => {
        const imgUrl = $(elm).attr('data-thumb')
        images.push(imgUrl)
    })

    const product = {
        title,
        prices,
        description,
        images,
        origin,
        url
    }

    // save product to mongodb
    const model = new ProductModel(product)
    model.save(function (err) {
        if (err) console.error(err)
        else console.log('Saved')
    });

    // get related products
    const relatedPoducts = $('.products a')

    const urls = []

    relatedPoducts.each((i, elm) => {
        urls.push($(elm).attr('href'))
    })

    const uniqUrls = urls.filter(function(item, pos) {
        return urls.indexOf(item) == pos;
    })

    uniqUrls.forEach(url => {
        scrapper(origin, url)
    })
}