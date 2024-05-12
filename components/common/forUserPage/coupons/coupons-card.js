import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
//css+icon
import styles from '@/components/common/forUserPage/Coupons.module.css'
import { IoIosArrowForward } from 'react-icons/io'
import { LuTicket, LuCopy } from 'react-icons/lu'
export default function CouponsCard({ data }) {
  const copyCoupon = (couponCode) => {
    navigator.clipboard.writeText(couponCode)
    toast.success(`已成功複製優惠碼`)
  }

  // 過濾優惠券資料
  const filteredCoupons = data.rows.filter(
    (coupon) => coupon.coupon_status === 1 && coupon.use_state === 1
  )

  //// 如果沒有資料，顯示訊息 //改到父元件
  // if (!filteredCoupons) {
  //   return (
  //     <div className="container text-center fw-bold mt-5">還沒有優惠券喔！</div>
  //   )
  // }

  return (
    <>
      {/* filteredCoupons */}
      {filteredCoupons.map((v, i) => (
        <div className="col" key={v.have_coupon_id}>
          <div className="card rounded-3">
            <div className={`${styles['card-line']}`}>
              <div className={`${styles['card-body']}`}>
                <div className={styles.datas}>
                  <a className={styles.link}>
                    <div className={styles.ribbon}>
                      <div className={styles.label}>優 惠 券</div>
                    </div>
                  </a>
                </div>
                <div className="card-body">
                  <h5
                    className="card-title fw-bold mb-0"
                    style={{ color: 'rgba(220, 186, 169, 1)' }}
                  >
                    <span className="fs-3">
                      <LuTicket />
                    </span>
                    {v.coupon_name}
                  </h5>
                  <h2 className="card-title fw-bold text-secondary mb-0 ">
                    NT$ {v.coupon_discount}
                  </h2>
                  {/* <p style={{ color: 'rgba(220, 186, 169, 1)' }}>
                    {v.coupon_code}
                  </p> */}
                  <p className={`${styles['card-text']}`}>
                    使用期限 {v.coupon_end_date}
                  </p>
                  <p>
                    <span
                      className={`text-secondary fw-bold ${styles['code-line']}`}
                    >
                      {v.coupon_code}
                    </span>
                    <button
                      className="btn btn-link text-primary"
                      onClick={() => copyCoupon(v.coupon_code)}
                    >
                      <LuCopy />
                    </button>
                  </p>
                  <p className="card-text">{v.coupon_desc}</p>
                </div>
              </div>
            </div>
            <Link
              href="/Pet-poduct"
              className="btn btn-primary bg-primary card-footer text-center text-white"
            >
              立即前往購物 <IoIosArrowForward />
            </Link>
          </div>
          {/* 吐司訊息 */}
          <Toaster />
        </div>
      ))}
    </>
  )
}
