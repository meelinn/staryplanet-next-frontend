import { useState } from 'react'
import Link from 'next/link'
import CartList from '@/components/cart/cart-list'
import Navbar from '@/components/cart/navbar'
import styles from '@/components/cart/cart.module.css'
import { useCart } from '@/hooks/use-cart'

export default function Cart() {
  const { totalItems, totalPrice } = useCart()

  return (
    <>
      <div className={styles['container']}>
        <Navbar />
        <h3>購物車</h3>
        <hr />
        <Link href="/cs-0308/checkout/product">連至 商品頁</Link>
        <div className={styles['cart']}>
          <CartList />
        </div>
        <hr />
        <div>
          {/* 也可以用reduce寫法 */}
          總數量: {totalItems} / 總金額: {totalPrice}
        </div>
      </div>
    </>
  )
}
