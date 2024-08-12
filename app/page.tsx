import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/cult/fade-in"
import { DirectorySearch } from "@/components/directory-search"
import { Hero } from "@/components/hero-homelab"

import {
  EmptyFeaturedGrid,
  FeaturedGrid,
  ResourceCardGrid,
} from "../components/directory-card-grid"
import { NavSidebar } from "../components/nav-homelab"
import { getCachedFilters } from "./actions/cached_actions"
import { getProducts } from "./actions/product"

export const runtime = "nodejs"

// Select the resources you want to feature.. AD SPACE?
const FEATURED_IDS = [
  // "3b741434-1bdb-4903-91e9-a7fa154a8fdf",
  // "f8a5db00-c80e-4fe4-80a7-af9d79a03690",
  // "ad4b9d2e-6461-4eed-afbf-86aa284000cc",
  "efa4416b-98f8-444a-be5b-c797e47b841b",
  "cd8dab1e-4fd0-4a23-b60b-7f4933cf2c0f",
] // Replace 'id1', 'id2', 'id3' with actual IDs you want to feature

async function Page({ searchParams }: { searchParams: { search?: string } }) {
  let data = await getProducts(searchParams.search)
  let filters = await getCachedFilters()
  const filteredFeaturedData = data.filter((d: any) =>
    FEATURED_IDS.includes(d.id)
  )

  return (
    <>
      <NavSidebar
        categories={filters.categories}
        labels={filters.labels}
        tags={filters.tags}
      />

      <div className="max-w-full px-2 md:pl-4 md:pr-0 pt-2">
        <FadeIn>
          <ResourceCardGrid
            sortedData={data}
            filteredFeaturedData={filteredFeaturedData}
          >
            <div className="grid grid-cols-1  xl:grid-cols-6 lg:gap-16 pb-8 pt-8 relative">
              <div className="col-span-1 md:col-span-2 z-10">
                <Hero>
                  <DirectorySearch />
                </Hero>
              </div>

              <div className="col-span-1 md:col-span-4 mt-6 md:mt-0">
                {filteredFeaturedData.length >= 1 ? (
                  <Suspense fallback={<div>Loading...</div>}>
                    <div className=" relative">
                      <FeaturedGrid featuredData={filteredFeaturedData} />
                    </div>
                  </Suspense>
                ) : (
                  <div className="relative">{/* <EmptyFeaturedGrid /> */}</div>
                )}
              </div>
            </div>
          </ResourceCardGrid>
        </FadeIn>
      </div>
    </>
  )
}

export default Page
