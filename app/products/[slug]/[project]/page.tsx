import { notFound, redirect } from "next/navigation"

import { FadeIn } from "@/components/cult/fade-in"
import { getProductByUserProject } from "@/app/actions/product"

import { ProductDetails } from "./details"

export const runtime = "nodejs"

const defaultUrl = process.env.BASE_URL
  ? process.env.BASE_URL
  : "http://localhost:3000"

const getProjectPath = (data: any) => {
  const project = new URL(data.product_website)
  return project.pathname
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; project: string }
}) {
  let data = await getProductByUserProject(params.slug, params.project)

  if (!data) {
    return {}
  }

  const product = data[0] || {}

  const metabase = {
    name: product.full_name,
    title: `${product.full_name} - ${product.punchline} | Awesome Homelab`,
    description: product.punchline,
    keywords: product.labels?.join(","),
  }

  return {
    metadataBase: new URL(defaultUrl),
    title: metabase.title,
    description: metabase.description,
    keywords: metabase.keywords,
    alternates: {
      canonical: `${defaultUrl}/products${getProjectPath(product)}`,
    },
    structuredData: {
      "@context": "http://schema.org",
      "@type": "WebSite",
      name: metabase.name,
      url: process.env.BASE_URL,
      description: metabase.description,
    },
    socialMediaTags: {
      "og:title": metabase.name,
      "og:description": metabase.description,
    },
  }
}

const ProductIdPage = async ({
  params,
}: {
  params: { slug: string; project: string }
}) => {
  let data = await getProductByUserProject(params.slug, params.project)

  if (!data) {
    notFound()
    // redirect("/")
  }

  return (
    <>
      <div className="z-10">
        <div className=" py-4 w-full relative  mx-auto max-w-6xl">
          <FadeIn>{data ? <ProductDetails product={data[0]} /> : null}</FadeIn>
        </div>
      </div>
    </>
  )
}

export default ProductIdPage
