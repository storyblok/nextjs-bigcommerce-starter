import cn from 'classnames'
import { FC, ReactNode, Component } from 'react'
import { SbEditableContent } from "storyblok-react"
import s from './Grid.module.css'
import { ProductCard } from '@components/product'
interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  layout?: 'A' | 'B' | 'C' | 'D' | 'normal'
  products?: ReactNode[] | Component[] | any[]
  variant?: 'default' | 'filled'
  blok?: SbEditableContent
}

const Grid: FC<Props> = ({
  className,
  layout = 'A',
  children,
  products = [],
  blok, 
  variant = 'default',
}) => {
  const activeLayout =  blok?.layout ? blok.layout : layout
  const rootClassName = cn(
    s.root,
    {
      [s.layoutA]: activeLayout === 'A',
      [s.layoutB]: activeLayout === 'B',
      [s.layoutC]: activeLayout === 'C',
      [s.layoutD]: activeLayout === 'D',
      [s.layoutNormal]: activeLayout === 'normal',
      [s.default]: variant === 'default',
      [s.filled]: variant === 'filled',
    },
    className
  )
  const activeProducts = blok?.product ? 
  blok.product?.items?.map((sbProduct: any) => 
    blok.product?.fetchedItems?.find(({node}:any) => 
    node.entityId === sbProduct.id)).filter(Boolean) 
  : products;

  return <div className={rootClassName}>
    { children }
          {activeProducts ? activeProducts?.map(({ node }: any) => (
            <ProductCard
              key={node.path}
              product={node}
              variant="simple"
              // The first & last image are the largest one in the grid
              imgWidth={1600}
              imgHeight={1600}
            />
          )) : null }
  </div>
}

export default Grid
