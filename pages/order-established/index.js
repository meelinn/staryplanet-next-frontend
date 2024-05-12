import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
// import Image from 'next/image'
import styles from '../../styles/order-established.module.css'
// import './order-established.module.css'
import Esta_table from '../../components/order-established/esta_table'
import Item_table from '../../components/order-established/item_table'
import { useOrder } from '../../context/OrderContext'
import { useAuth } from '@/contexts/auth-context'
export default function OrderEstablished() {
  const { readNewOrder } = useOrder()
  const { auth } = useAuth()
  const router = useRouter()
  const handleCheckout = () => {
    router.push('/order-completed')
  }
  const handleCheckoutShop = () => {
    router.push('/Pet-poduct')
  }
  useEffect(() => {
    readNewOrder(auth.id)
  }, [auth.id > 0])

  return (
    <>
      <div className={`container ${styles.progress_container}`}>
        <div className="row">
          <div className="medium-centered">
            <div className={styles.timeline}>
              <div className={styles.active} style={{ width: '0%' }}>
                <div className={styles.start}>
                  <span>確認訂單</span>
                </div>
              </div>
              <div className={styles.active} style={{ width: '20%' }}>
                <div className={styles.start}>
                  <span>訂單成立</span>
                </div>
              </div>

              <div className={styles.inactive} style={{ width: '20%' }}>
                <div className={styles.inactive_start}>
                  <span>已完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="container my-4">
          <div>
            <Item_table />
          </div>
          <div className={styles.card}>
            <div className={styles.card_body}>
              <h3 className="text-center">購買成功</h3>
              <div
                className={`${styles.mou_word} row g-0 align-items-center justify-content-center`}
              >
                <Esta_table />
              </div>

              {/* 物流編號和複製按鈕 */}
              <div className="row">
                <div className="col-12 text-center">
                  {/* <div
                    className={`${styles.mou_color1} d-flex justify-content-center align-items-center p-3 my-3 `}
                  >
                    您的物流編號：<span id="logistics_number">Q7236442</span>
                    <button
                      className={`btn ${styles.btn_outline_primary} ${styles.btn_circle}`}
                      onclick="copyToClipboard('logistics_number')"
                    >
                      點我複製
                    </button>
                  </div> */}
                </div>
              </div>
              {/* 物流追蹤查詢連結 */}
              {/* <div className="row">
                <div className="col-12 text-center">
                  <a href="tracking-link" className="btn btn_link">
                    物流貨物追蹤查詢
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <main>
        <div className="container my-4">
          <div className="">
            <button
              className={`btn ${styles.btn_outline_primary} w-100 mb-2`}
              onClick={handleCheckout}
            >
              我的訂單紀錄
            </button>
            <button
              className={`btn ${styles.btn_outline_primary} w-100`}
              onClick={handleCheckoutShop}
            >
              繼續購物
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
