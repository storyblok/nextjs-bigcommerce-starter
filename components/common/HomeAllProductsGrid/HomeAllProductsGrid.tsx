import { FC } from 'react'
import Link from 'next/link'
import { Grid } from '@components/ui'
import { SbEditableContent } from "storyblok-react"
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'

interface Props {
  categories?: any
  brands?: any
  newestProducts?: any
  blok?: SbEditableContent
}

const Head: FC<Props> = ({ categories, brands, newestProducts, blok }) => {
  const activeProducts = blok?.products ? 
    blok?.products?.items.map((sbProduct: any) => 
      blok?.products?.fetchedItems?.find(({node}:any) => 
      node.entityId === sbProduct.id)).filter(Boolean)  
    : newestProducts;
  const activeCategories = blok?.products ? 
    blok?.categories?.items.map((sbCategory: any) => 
      blok?.categories?.fetchedItems?.find((category:any) => 
      category.entityId === sbCategory.id)).filter(Boolean)  
    : categories;

  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>All Categories</a>
              </Link>
            </li>
            {activeCategories.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accents-8 text-base">
                <Link href={getCategoryPath(cat.path)}>
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          {(brands && brands.length) ? (<ul className="">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getDesignerPath('')}>
                <a>All Designers</a>
              </Link>
            </li>
            {brands.flatMap(({ node }: any) => (
              <li key={node.path} className="py-1 text-accents-8">
                <Link href={getDesignerPath(node.path)}>
                  <a>{node.name}</a>
                </Link>
              </li>
            ))}
          </ul>) : null }
        </div>
      </div>
      <div className="flex-1">
        <Grid layout="normal">
          {activeProducts.map(({ node }: any) => (
            <ProductCard
              key={node.path}
              product={node}
              variant="simple"
              imgWidth={480}
              imgHeight={480}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Head
