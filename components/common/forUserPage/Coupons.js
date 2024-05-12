import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { COUPON } from '@/configs'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'
//css+icon
import styles from '@/components/common/forUserPage/Coupons.module.css'
import LikeStyles from '@/styles/product/like.module.css'
import CouponsCard from './coupons/coupons-card'
import AdoptionPagination from '@/components/adoption/adoption-pagination'
import CouponsAddForm from './coupons/coupons-add-form'

export default function Coupons({ open, onClose }) {
  const router = useRouter()
  const [data, setData] = useState({
    //只要此狀態改變,以下子元件(Layout1.Head)都會全部re-render
    success: false,
    page: 0,
    totalPages: 0,
    rows: [], //列表資料
  })
  const { auth, getAuthHeader } = useAuth()

  useEffect(() => {
    if (open) {
      try {
        console.log(location.search) //原生JS:location.href ; location.search 會出現參數
        fetch(`${COUPON}?member_id=${auth.id}}`)
          // /api${location.search}
          .then((r) => r.json())
          .then((dataObj) => {
            setData(dataObj)
            console.log(data.rows)
          }) //[]
      } catch (error) {
        console.log(error)
      }
    }
  }, [router.query, auth]) //[]:依賴 router.query更新之後,會觸發資料更新
  console.log(router.query) //{}
  // 取得 query string 的資料
  const qs = { ...router.query }
  console.log(qs) //page: '6'

  const handleCouponAdded = () => {
    // 在新增優惠券成功後手動觸發一次資料更新
    fetch(`${COUPON}?member_id=${auth.id}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (!open) return null

  return (
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={`${LikeStyles['like']} me-0`}>
          <div className={LikeStyles['likefont']}>
            <h2 className={LikeStyles['mylikeh2']}>超優惠券</h2>
            {/* add-form */}
            <CouponsAddForm onCouponAdded={handleCouponAdded} />
          </div>
        </div>

   
          {!Array.isArray(data.rows) || data.rows.length === 0 ? (
            <div className="container">
              <div className="text-center">
                <img src="/img/cat.png" className="mt-5" />
                <h5
                  className="container text-center fw-bold mt-5"
                  style={{ color: '#65463E' }}
                >
                  還沒有優惠券喔！
                </h5>
                
              </div>
            </div>
          ) : (
            <>
                {/* card */}
            
           <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-5">
                <CouponsCard data={data} />
                </div>
                <AdoptionPagination data={data} qs={qs} />
         
        
            </>
          )}
        </div>
      </div>
   
  )
}
