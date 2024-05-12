import React, { useEffect, useState } from 'react'
import styles from '@/styles/order-completed.module.css'

import style from './Order.module.css'
import Com_table from '@/components/order-completed/com_table'
import { router } from 'next/router'
import { useOrder } from '@/context/OrderContext'
import axios from 'axios'
import { API_SERVER } from '@/configs'
import { useAuth } from '@/contexts/auth-context'
export default function Order({ open, onClose }) {
  const { rOrder, readOrder } = useOrder()
  const { auth } = useAuth()
  useEffect(() => {
    readOrder(auth.id)
  }, [auth.id > 0])

  const [itemdata, setItemData] = useState()
  const handleDetail = (e) => {
    const orderid = e.target.value
    const detaildata = async () => {
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
    detaildata()
  }

  if (!open) return null

  return (
    <div className={style.main}>
      <div className={style.contentContainer}>
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
      </div>
    </div>
  )
}
