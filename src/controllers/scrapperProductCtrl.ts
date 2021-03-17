import scrapper from '../utils/scrapper'

export default async function scrapperProductCtrl(req, res) {
    const { url } = req.body
    // scraping of the url
    scrapper(url, url)

    res.send({ ok: true })
}