import React, { useState, useEffect } from 'react'
import infoContentStyles from '@/pages/poduct-info/css/content.module.css'

export default function Number() {
  const [number, setNumber] = useState(1) // 定義並初始化數字狀態

  const decreaseNumber = () => {
    if (number > 1) {
      setNumber(number - 1) // 更新數字狀態
      updateMessage()
    }
  }

  const increaseNumber = () => {
    setNumber(number + 1) // 更新數字狀態
    updateMessage()
  }

  const numberChange = (e) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      setNumber(value) // 更新數字狀態
      updateMessage()
    }
  }

  const updateMessage = () => {
    // 更新訊息的邏輯
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
            onChange={numberChange}
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
            href="/pet-info"
            onClick={updateMessage}
            className={infoContentStyles['process-button']}
          >
            加入購物車
          </button>
        </div>
      </div>
    </>
  )
}
