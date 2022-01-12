import { client } from '../lib/shopifyClient'

export const getShopifyProducts = async(id, count) => {
    try {
        const shopifyProducts = await client.collection.fetchWithProducts(id, {
            productsFirst: count,
        })
        return shopifyProducts
    } catch(e) {
        console.error("SHOPIFY PRODUCTS:", e)
        return []
    }
}