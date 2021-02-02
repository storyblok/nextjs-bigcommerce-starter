import { Layout, DynamicComponent } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { SbEditableContent } from "storyblok-react"
import Storyblok, { useStoryblok } from '@lib/storyblok'
import getDetailsFromStory from '@lib/storyblokBigCommerce'


import { getConfig } from '@framework/api'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const sbParams = {
    version: preview ? "draft" : "published"
  }
 
  const { data: { story }} = await Storyblok.get('cdn/stories/home', sbParams)
  const copyOfStory = Object.assign({}, story)
  const fullProducts = await getDetailsFromStory({ story, config, preview })
  copyOfStory.content = fullProducts

  return {
    props: {
      story: copyOfStory,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  story,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const liveStory = useStoryblok(story);

  const components = liveStory.content.body.map((blok: SbEditableContent) => { 
    return (<DynamicComponent blok={blok} key={blok._uid} />)
  })

  return (
    <div>
      { components }
    </div>
  )
}

Home.Layout = Layout
