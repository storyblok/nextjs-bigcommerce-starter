import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/api/operations/get-all-pages'
import { Layout } from '@components/common'
import Storyblok, { useStoryblok } from '@lib/storyblok'
import { Container } from '@components/ui'
import SbEditable from "storyblok-react";

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const sbParams = {
    version: preview ? "draft" : "published"
  }
 
  const { data: { story }} = await Storyblok.get('cdn/stories/blog', sbParams)

  const { pages } = await getAllPages({ config, preview })
  return {
    props: {
      story,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Blog({ story }: InferGetStaticPropsType<typeof getStaticProps>) {
  const liveStory = useStoryblok(story);
  const content = liveStory.content
  const bg = content?.color ? content.color.color : 'violet'
  const author = content?.author
  const image = content?.image || 'jacket.png'

  return (
    <SbEditable content={content} key={content._uid}>
    <div className="pb-20">
      <div className="text-center pt-40 pb-56" style={{ backgroundColor: bg }}>
        <Container>
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            { content?.title }
          </h2>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            { content?.intro }
          </p>
         {author ? (<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="flex">
              <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://vercel.com/api/www/avatar/61182a9f6bda512b4d9263c9c8a60aabe0402f4c?s=204"
                  alt="Avatar"
                />
              </div>
              <div className="ml-4">
                <div className="leading-6 font-medium text-white">
                  José Rodriguez
                </div>
                <div className="leading-6 font-medium text-gray-200">
                  CEO, Acme
                </div>
              </div>
            </div>
          </div>) : null }
        </Container>
      </div>
      <Container>
        <div className="-mt-40 mx-auto max-w-2xl">
          <img src={image} alt="Jacket" />
        </div>
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto" dangerouslySetInnerHTML={
              {__html: Storyblok.richTextResolver.render(content?.long_text) }
        } />
      </Container>
    </div>
    </SbEditable>
  )
}

Blog.Layout = Layout
