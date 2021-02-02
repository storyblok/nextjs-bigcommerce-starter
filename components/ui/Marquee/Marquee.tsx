import cn from 'classnames'
import s from './Marquee.module.css'
import { FC, ReactNode, Component } from 'react'
import Ticker from 'react-ticker'
import { ProductCard } from '@components/product'
import { SbEditableContent } from "storyblok-react"
interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'primary' | 'secondary'
  blok?: SbEditableContent
  products?: ReactNode[] | Component[] | any[]
}

const Marquee: FC<Props> = ({
  className = '',
  children,
  products,
  variant = 'primary',
  blok
}) => {
  const activeVariant =  blok?.variant ? blok.variant : variant
  const rootClassName = cn(
    s.root,
    {
      [s.primary]: activeVariant === 'primary',
      [s.secondary]: activeVariant === 'secondary',
    },
    className
  )
  const activeProducts = blok?.products ? 
  blok.products.items.map((sbProduct: any) => 
    blok.products?.fetchedItems?.find(({node}:any) => 
    node.entityId === sbProduct.id)).filter(Boolean) 
  : products;

  return (
    <div className={rootClassName}>
      <Ticker offset={80}>
        {({ index }) => (<div className={s.container}>
          { children }
          { activeProducts &&
            activeProducts.map(({ node }: any) => (
              <ProductCard
                key={node.path}
                product={node}
                variant="slim"
                imgWidth={320}
                imgHeight={320}
              />
            ))
          }
        </div>)}
      </Ticker>
    </div>
  )
}

export default Marquee
