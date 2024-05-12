import React, { useEffect, useState } from 'react'
import styles from '../../styles/order-established.module.css'
import { useOrder } from '../../context/OrderContext'
import { API_SERVER } from '@/configs'

export default function Item_table() {
  const { rItem, orderdata } = useOrder()

  return (
    <>
      <div className="row">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  商品圖
                </th>
                <th scope="col" className="text-center">
                  商品名
                </th>
                <th scope="col" className="text-center">
                  單價
                </th>
                <th scope="col" className="text-center">
                  數量
                </th>
                <th scope="col" className="text-center">
                  小計
                </th>
              </tr>
            </thead>
            <tbody>
              {rItem?.map((v) => (
                <tr key={v.orders_detail_id}>
                  {/* 'orders_detail_id' 需與數據庫中的字段名稱完全一致 */}
                  <td className="align-middle">
                    <div className="d-flex justify-content-center">
                      <img
                        src={`${API_SERVER}/img/poducts/${v.product_img}`}
                        className={styles.img_fluid}
                        alt="商品1"
                        width={150} // 指定寬度
                        height={150} // 指定高度
                      />
                    </div>
                  </td>
                  {/* member_id'需與數據庫字段名稱一致 */}
                  <td className="align-middle text-center">{v.product_name}</td>
                  <td className="align-middle text-center">
                    {v.product_price}
                  </td>
                  <td className="align-middle text-center">{v.quantity}</td>
                  <td className="align-middle text-center">
                    {v.product_price * v.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-12">
          <div className={styles.odstyle_b}>
            <div>
              <span>總計：</span>
              <span>{orderdata?.total_price}</span>
            </div>
            <div>
              <span>折扣：</span>
              <span>{orderdata ? orderdata.coupon_discount : 0}</span>
            </div>
            <div>
              <span>運費：</span>
              <span>{orderdata?.shipment_fee}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
