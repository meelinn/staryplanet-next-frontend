import React, { useState, useEffect } from 'react'
import infoContentStyles from '@/pages/poduct-info/css/content.module.css'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '@/contexts/auth-context'
export default function Number() {
  const router = useRouter()
  const { addCart, setUser } = useCart()
  const { auth } = useAuth()
  // 定義並初始化數字狀態
  const [number, setNumber] = useState(1)

  const decreaseNumber = () => {
    if (number > 1) {
      setNumber(number - 1)
    }
  }
  const increaseNumber = () => {
    setNumber(number + 1)
  }
  // 可以用輸入的方式填入
  const numberChange = (e) => {
    const value = e.target.value
    if (value < 1 || value == '') {
      setNumber(1)
    } else {
      setNumber(e.target.value)
    }
  }

  return (
    <>
      <div className={infoContentStyles['numbercart']}>
        <div className={infoContentStyles['numberController']}>
          <button
            className={infoContentStyles['inputNumber-del']}
            onClick={decreaseNumber}
          >
            -
          </button>

          <input
            className={infoContentStyles['inputNumber']}
            value={number}
            onChange={(e) => {
              numberChange(e)
            }}
            min="1"
          />

          <button
            className={infoContentStyles['inputNumber-add']}
            onClick={increaseNumber}
          >
            +
          </button>
        </div>

        <div className={infoContentStyles['process-b']}>
          <button
            onClick={() => {
              addCart(router.query.product_id, number, auth.id)
            }}
            className={infoContentStyles['process-button']}
          >
            加入購物車
          </button>
        </div>
      </div>
      <Toaster />
    </>
  )
}
