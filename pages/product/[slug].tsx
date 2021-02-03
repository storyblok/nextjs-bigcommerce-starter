import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

// Data

import { getConfig } from '@framework/api'
import getProduct from '@framework/api/operations/get-product'
import getAllPages from '@framework/api/operations/get-all-pages'
import getAllProductPaths from '@framework/api/operations/get-all-product-paths'
import Storyblok, { useStoryblok } from '@lib/storyblok'
import SbEditable from "storyblok-react"

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  let story = {}

  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  const sbParams = {
    version: "draft"
  }

  try {
    const { data } = await Storyblok.get(`cdn/stories/product/${params!.slug}`, sbParams)
    if(data.story) story = data.story
  } catch(e) {
    console.error(`Product ${params!.slug} doesn't exist in Storyblok`)
  }

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: { pages, product, story },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product) => {
            arr.push(`/${locale}/product${product.node.path}`)
          })
          return arr
        }, [])
      : products.map((product) => `/product${product.node.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
  story
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // @ts-ignore 
  const liveStory = useStoryblok(story) 
  const router = useRouter()

  const hasStory = typeof liveStory.content !== 'undefined'

  if(router.isFallback) {
    return (<h1>Loading...</h1>)
  } else if (hasStory) {
    return (
      <SbEditable content={liveStory.content} key={liveStory.content._uid}>
        <ProductView product={product} story={liveStory.content} />
      </SbEditable>
    )
  }

  return (<ProductView product={product} />)
}

Slug.Layout = Layout
