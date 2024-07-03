import { MetadataRoute } from "next"

import { getProducts } from "./actions/product"

const defaultUrl = process.env.BASE_URL
  ? process.env.BASE_URL
  : "http://localhost:3000"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  return products.map((product) => ({
    url: `${defaultUrl}/products/${product.id}`,
    lastModified: new Date(product.created_at),
  }))
}
