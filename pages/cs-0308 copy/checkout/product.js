import Navbar from '@/components/cart/navbar'
import ProductList from '@/components/cart/product-list'
import Link from 'next/link'

import styles from '@/components/cart/cart.module.css'

export default function Product() {
  return (
    <>
      <div className={styles['container']}>
        <Navbar />
        <h3>商品列表</h3>
        <hr />
        <Link href="/cs-0308/checkout/cart">連至 購物車</Link>
        <div className={styles['product']}>
          <ProductList />
        </div>
      </div>
    </>
  )
}
