import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

import cardStyles from '@/styles/product/card.module.css'
import ContentStyles from '@/styles/product/content.module.css'
import { API_SERVER, PRODUCT_NOP } from '@/configs'

import LikeIcon from '@/components/product/product-like-icon'

const cardBackgroundClass = `${cardStyles['A-card__background']} ${cardStyles['card-img']}`
const cardContentContainerClass = `${cardStyles['A-card__content--container']} ${cardStyles['flow']}`
const cardContentClass = `${cardStyles['A-card__content']} ${cardStyles['flow']}`
const cardTitleClass = `${cardStyles['A-card__title']} ${cardStyles['H2']}`
const cardDescriptionClass = `${cardStyles['A-card__description']} ${cardStyles['card-P']}`

export default function AdoptionCardNop() {
  const [nopdata, setnopData] = useState({
    success: false,
    page: 0,

    rows: [], //列表資料
  })
  const router = useRouter()

  useEffect(() => {
    fetch(`${PRODUCT_NOP}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setnopData(dataObj)
        console.log(nopdata.rows) //[]
      })
  }, [router.query]) //[]:依賴 router.query更新之後,會觸發資料更新
  console.log(router.query) //{}
  // 取得 query string 的資料
  const qs = { ...router.query }
  console.log(qs) //page: '6'
  console.log(nopdata)

  if (!nopdata || !nopdata.rows || nopdata.rows.length === 0) {
    return <div>No data available</div>
  }
  console.log(nopdata)

  return (
    <>
      <div className={ContentStyles['mysimilarpet']}>
        <div className={ContentStyles['similar-container']}>
          {nopdata.rows.map((v) => (
            <div
              className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}
              key={v.products_id}
              style={{ margin: '10px 10px' }}
            >
              <img
                className={cardBackgroundClass}
                src={`img/poducts/${v.product_picture.split(',')[0]}`}
                alt=""
              />
              <div className={cardContentClass}>
                <div className={cardContentContainerClass}>
                  <h2 className={cardTitleClass}>{v.product_name}</h2>
                  <p className={cardDescriptionClass}>
                    {v.product_simple_desc}
                  </p>
                </div>
                <div className={cardStyles['buttonteam']}>
                  <Link href={`/Pet-poduct/${v.products_id}`}>
                    <button className={cardStyles['A-card-button']}>
                      NT {v.product_price}
                    </button>
                  </Link>
                  <LikeIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
