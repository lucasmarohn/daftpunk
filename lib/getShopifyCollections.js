import { client } from '../lib/shopifyClient'

export const getShopifyCollections = async() => {
    try {
        const collections = await client.collection.fetchAll()
        return collections
    } catch(e) {
        console.error("SHOPIFY COLLECTION:", e)
        return []
    }
}