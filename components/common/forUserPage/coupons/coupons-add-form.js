import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
//router
import { COUPON_ADD } from '@/configs'
import { useAuth } from '@/contexts/auth-context'

export default function CouponsAddForm({ onCouponAdded }) {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()
  const [formData, setFormData] = useState({
    coupon_code: '',
  })

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 表單不要以傳統方式送出
    if (formData) {
      //console.log("表單送出");
      const r = await fetch(`${COUPON_ADD}?member_id=${auth.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await r.json()
      console.log(result)
      if (result.success) {
        toast.success(`已成功領取優惠券，趕快去購物吧！`)
        onCouponAdded()
      } else {
        if (result.info === '沒有該筆優惠券') {
          toast.error(`優惠碼錯誤`)
        } else {
          toast.error(`已經領取過優惠券了喔！`)
        }
      }
    } else {
      toast.error(`兌換失敗`)
    }
  }

  return (
    <>
      <form
        className="mx-1 my-3 py-3 ps-3 row g-3 align-items-center rounded-2 bg-secondary-light shadow-sm row justify-content-center justify-content-lg-start"
        // style={{ 'background-color': 'rgba(220, 186, 169, 1)' }}
        onSubmit={onSubmit}
      >
        <div class="col-auto mt-0 ">
          <label htmlFor="coupon" class="form-label fs-6 mb-0">
            領取優惠券
          </label>
        </div>
        <div class="col-auto mt-0">
          <input
            class="form-control form-control-sm my-2"
            type="text"
            placeholder="請輸入優惠券代碼"
            aria-label="coupon"
            name="coupon_code"
            value={formData.coupon}
            onChange={fieldChanged}
          />
        </div>
        <div class="col-auto mt-0">
          <button type="submit" class="btn btn-primary btn-sm">
            兌換
          </button>
        </div>
      </form>
      {/* 吐司訊息 */}
      <Toaster />
    </>
  )
}
