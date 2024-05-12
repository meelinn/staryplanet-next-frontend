import { FaShoppingCart } from 'react-icons/fa'
import styles from '@/components/cart/cart.module.css'
import { useCart } from '@/hooks/use-cart'

import Link from 'next/link'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <>
      <div className={styles['navbar']}>
        <div className={styles['logo']}>網站Logo</div>
        <div className={styles['header']}>
          <h2>購物車範例</h2>
        </div>
        <div className={styles['badge']}>
          <Link href="/cs-0308/checkout/cart" className={styles['button']}>
            <FaShoppingCart />
            <span className={styles['button__badge']}>{totalItems}</span>
          </Link>
        </div>
      </div>
    </>
  )
}
