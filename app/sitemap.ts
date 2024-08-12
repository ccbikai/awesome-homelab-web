import { MetadataRoute } from "next"

import { getProducts } from "./actions/product"

export const runtime = "nodejs"

const defaultUrl = process.env.BASE_URL
  ? process.env.BASE_URL
  : "http://localhost:3000"

const getProjectPath = (data: any) => {
  const project = new URL(data.product_website)
  return project.pathname
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  return products.map((product) => ({
    url: `${defaultUrl}/products${getProjectPath(product)}`,
    lastModified: new Date(product.created_at),
  }))
}
