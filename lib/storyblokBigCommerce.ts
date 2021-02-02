import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import { BigcommerceConfig } from '@framework/api'
import { SbEditableContent } from "storyblok-react"
import { StoryData } from 'storyblok-js-client'

type detailsContext = {
    story?: StoryData
    preview?: boolean
    config?: BigcommerceConfig
}

export default async function getDetailsFromStory({ story, config, preview }: detailsContext) {
    let storyContent = Object.assign({}, story?.content)
    const { categories } = await getSiteInfo({ config, preview })

    let finalPromises = await storyContent.body.map(async (blok: SbEditableContent) => {
        const promises = await Object.keys(blok).map(async key => {
          // check all the entries for plugins and fetch the items
          if(blok[key].hasOwnProperty('plugin') && blok[key].plugin === 'sb-bigcommerce') {
              const type = blok[key].items[0].type
              const itemIds = blok[key].items.map((i: { id: any }) => i.id)
    
              if(type === 'product' ) {
                const fetchedItems = await getAllProducts({
                  variables: { entityIds: itemIds! },
                  config,
                  preview,
                })
                blok[key].fetchedItems = fetchedItems.products
                return fetchedItems
              } else if(type === 'category' ) {
                blok[key].fetchedItems = categories.filter((c: { entityId: any; }) => itemIds.includes(c.entityId))
              }
           }
        })
        return await Promise.all(promises)
    })
    await Promise.all(finalPromises)
    return storyContent
}
