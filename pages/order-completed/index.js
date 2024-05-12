import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
import styles from '../../styles/order-completed.module.css'
// import './order-completed.module.css'
import Com_table from '@/components/order-completed/com_table'
import { router } from 'next/router'
import { useOrder } from '@/context/OrderContext'
import axios from 'axios'
import { API_SERVER } from '@/configs'
import { useAuth } from '@/contexts/auth-context'
export default function OrderCompleted() {
  // const authname = 'team3-auth'

  const handleCheckoutShop = () => {
    router.push('/Pet-poduct')
  }
  const { rOrder, readOrder, setUserid } = useOrder()
  const { auth } = useAuth()
  useEffect(() => {
    readOrder(auth.id)
    setUserid(auth.id)
  }, [auth.id > 0])

  const [itemdata, setItemData] = useState()

  const handleDetail = (e) => {
    const orderid = e.target.value
    detaildata(orderid)
  }
  const detaildata = async (orderid) => {
    try {
      const { data } = await axios.post(
        `${API_SERVER}/order/detail/${auth.id}`,
        { orderid }
      )
      setItemData(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <div className={`container ${styles.progress_container}`}>
        <div className="row">
          <div className="medium-centered">
            <div className={styles.timeline}>
              <div className={styles.active} style={{ width: '0%' }}>
                <div className={styles.start}>
                  <span>訂單成立</span>
                </div>
              </div>
              <div className={styles.active} style={{ width: '20%' }}>
                <div className={styles.start}>
                  <span>確認訂單</span>
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
      <div className="container my-4">
        <div className="accordion" id="orderAccordion">
          {/* 手風琴項目 */}
          {rOrder?.map((item) => (
            <div key={item.orders_id} className="accordion-item btn-primary">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.orders_id}`}
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  value={item.orders_id}
                  onClick={handleDetail}
                >
                  訂單編號：{item.orders_id}
                </button>
              </h2>
              <div
                id={`collapse${item.orders_id}`}
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#orderAccordion"
              >
                <Com_table itemdata={itemdata} />
              </div>
            </div>
          ))}

          {/* 其他訂單項目可以繼續加入 */}
        </div>
      </div>
      {/* 費用明細 */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-9">
            <section>
              <div class="container my-4">
                <div className={styles.card}>
                  <button
                    className={`btn ${styles.btn_outline_primary} w-100`}
                    onClick={handleCheckoutShop}
                  >
                    繼續購物
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
