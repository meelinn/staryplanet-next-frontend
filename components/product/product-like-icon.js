import React from 'react'
import Image from 'next/image'
import cardStyles from '@/styles/product/card.module.css'
// 實心圖
import { PiPawPrintFill } from 'react-icons/pi'
// 空心圖
import { PiPawPrint } from 'react-icons/pi'

export default function productLikeIcon({
  products_id = 0,
  like = false,
  handleToggleLike = () => {}, //給定屬性值的預設值可以讓元件執行時更穩健
}) {
  return (
    <>
      {/* 以like屬性(布林值)來決定呈現的圖示(判斷有沒有加入收藏) */}
      <div
        className={cardStyles['pawicon']}
        onClick={() => handleToggleLike(products_id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleToggleLike(products_id)
          }
        }}
        role="button"
        tabIndex={0}
      >
        {like ? <PiPawPrintFill /> : <PiPawPrint />}
      </div>
    </>
  )
}
