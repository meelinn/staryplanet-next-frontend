import React, { useEffect, useState } from 'react'
import styles from '../../styles/order-established.module.css'
import { useOrder } from '../../context/OrderContext'

export default function Esta_table() {
  const { orderdata } = useOrder()

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 mb-md-0 d-flex align-items-stretch">
          <div className={`p-3 ${styles.rounded} text-center w-100`}>
            <h5>訂單資訊</h5>
            <p>訂單日期：{orderdata?.created_at}</p>
            <p>訂單編號：{orderdata?.orders_id}</p>
            <p>物流編號：Q7236442</p>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex align-items-stretch">
          <div className={`p-3 ${styles.rounded} text-center w-100`}>
            <h5>付款資訊</h5>
            <p>付款方式：{orderdata?.payment_method}</p>
            <p>
              付款狀態：
              {orderdata?.orders_state}
            </p>

            <p>總金額：{orderdata?.final_total}</p>
          </div>
        </div>
      </div>
    </>
  )
}
