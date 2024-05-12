import React from 'react'
import Image from 'next/image'

import cardStyles from '@/styles/adoption/card.module.css'
// 實心圖
import { PiPawPrintFill } from 'react-icons/pi'
// 空心圖
import { PiPawPrint } from 'react-icons/pi'

export default function AdoptionLikeIcon({
  pet_id = 0,
  like = false,
  handleToggleLike = () => {}, //給定屬性值的預設值可以讓元件執行時更穩健
  size,
  color,
}) {
  return (
    <>
      {/* 以like屬性(布林值)來決定呈現的圖示(判斷有沒有加入收藏) */}
      <div
        className={cardStyles['pawicon']}
        onClick={(event) => {
          handleToggleLike(pet_id)
          event.target.blur()
          console.log('Blur event triggered', event.target.blur)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleToggleLike(pet_id)
            event.target.blur()
          }
        }}
        role="button"
        tabIndex={0}
      >
        {like ? (
          <PiPawPrintFill size={size} color={color} />
        ) : (
          <PiPawPrint size={size} color={color} />
        )}
      </div>

      {/* <button
          //要用onClick改變布林值
          // onClick要的是函式，不是onClick= {handleToggleFav(v.isbn)}此為函式執行，會導致無窮迴圈
          onClick={() => {
            //純函式寫法，以下改為1步驟+2，步驟3再另寫
            //const nextBooks = toggleFav(books, v.isbn)
            //setBooks(nextBooks)

            //同上，改為函式組合樣式
            handleToggleLike(pet_id)
          }}
        >
          {like ? PiPawPrintFill : PiPawPrint}
        </button> */}
    </>
  )
}
