import React from 'react'
import products from '@/data/Product.json'
import styles from '@/components/cart/cart.module.css'
import { useCart } from '@/hooks/use-cart'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function ProductList() {
  // 20240309 得到目前的路由器
  const router = useRouter()

  const { addItem } = useCart()

  const notify = (productName) => {
    const msgBox = (
      <div>
        <p>{productName + '已成功加入購物車!'}</p>
        {/* <button>連至 購物車</button> */}
        <button
          onClick={() => {
            // 另一種導向另外頁面路由的方式
            router.push('/cs-0308/checkout/cart')
          }}
        >
          連至 購物車
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  return (
    <>
      <ul className={styles['list']}>
        {products.map((v, i) => {
          return (
            <li key={v.id} className={styles['item']}>
              <div className={styles['w-400']}>{v.name}</div>
              <div>{v.price}</div>
              <div>
                <button
                  onClick={() => {
                    addItem(v)
                    // 吐司訊息: 出現提示訊息
                    // toast.success(v.name + '已成功加入購物車')
                    // toast.success('1 樣商品,已成功加入購物車!')
                    // 吐司訊息2:客製化內容
                    notify(v.name)
                  }}
                >
                  加入購物車
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      {/* 擺放吐司訊息的 DOM 元件 (其實一開始就存在頁面上, 只是等待有動作才出現) */}
      <Toaster />
    </>
  )
}
