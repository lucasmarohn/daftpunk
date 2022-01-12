// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '../../lib/shopifyClient'

export default async function handler(req, res) {
    const productsById = await client.collection.fetchWithProducts(req.query.id, { productsFirst: 4 })
    res.status(200).json(productsById.products)
  }
  