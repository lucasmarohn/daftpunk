import Client from 'shopify-buy';
const API_KEY = process.env.SHOPIFY_API_KEY

export const client = Client.buildClient({
  domain: 'mutt-couture.myshopify.com',
  storefrontAccessToken: API_KEY
});