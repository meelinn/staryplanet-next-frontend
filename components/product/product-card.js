import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast'

//CSS+ICON
import cardStyles from '@/styles/product/card.module.css'
import { PiPawPrint } from 'react-icons/pi'

import LikeIcon from '@/components/product/product-like-icon'
//使用喜愛路由
import { JWT_PRODUCT_LIKE } from '@/configs'

const cardBackgroundClass = `${cardStyles['A-card__background']} ${cardStyles['card-img']}`
const cardContentContainerClass = `${cardStyles['A-card__content--container']} ${cardStyles['flow']}`
const cardContentClass = `${cardStyles['A-card__content']} ${cardStyles['flow']}`
const cardTitleClass = `${cardStyles['A-card__title']} ${cardStyles['H2']}`
const cardDescriptionClass = `${cardStyles['A-card__description']} ${cardStyles['card-P']}`

export default function ProductCard({ data, setData }) {
  const [likeProduct, setLikeProduct] = useState([])
  const { auth, getAuthHeader } = useAuth(0)

  const handleToggleLike = async (products_id, product_name) => {
    try {
      const r = await fetch(`${JWT_PRODUCT_LIKE}/${products_id}`, {
        headers: { ...getAuthHeader() },
      })
      const result = await r.json()

      if (result.success) {
        // 更新 likePets 狀態
        setLikeProduct((prevLikeProduct) => {
          if (result.action === 'add') {
            // 新增喜歡的寵物
            toast.success(`已將 ${product_name} 成功加入我的最愛`)
            return [...prevLikeProduct, products_id]
          } else {
            // 移除喜歡的寵物
            toast.error(`已將 ${product_name} 移除我的最愛`)
            return prevLikeProduct.filter((id) => id !== products_id)
          }
        })

        // 更新 AdoptionCard 的 data
        setData((old) => {
          const newRows = old.rows.map((v) => {
            if (v.products_id === products_id) {
              const pet_like_id = result.action === 'add' ? 1 : null
              return { ...v, pet_like_id }
            } else {
              return { ...v }
            }
          })
          return { ...old, rows: newRows }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '新增我的最愛失敗',
          text: '請先登入會員',
        })
        console.error('沒有登入')
      }
    } catch (error) {
      console.error('處理 API 請求時出錯', error)
    }
  }
  //抓會員按喜歡資料
  useEffect(() => {
    if (auth.id) {
      fetch(`${JWT_PRODUCT_LIKE}?member_id=${auth.id}`)
        .then((r) => r.json())
        .then((dataObj) => {
          if (dataObj.success === false) return
          const likedPetIds = dataObj.data.map((v) => v.products_id)
          console.log(dataObj.data)
          setLikeProduct(likedPetIds)
          console.log(likedPetIds)
        })
    } else {
      console.log('沒有會員資料')
    }
  }, [auth]) // 當 auth 狀態改變時重新執行

  return (
    <>
      {data &&
        Array.isArray(data.rows) &&
        data?.rows.map((v) => (
          <div
            className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}
            key={v.products_id}
          >
            <img
              className={cardBackgroundClass}
              src={`img/poducts/${v.product_picture.split(',')[0]}`}
              alt=""
            />
            <div className={cardContentClass}>
              <div className={cardContentContainerClass}>
                <h2 className={cardTitleClass}>{v.product_name}</h2>
                <p className={cardDescriptionClass}>{v.product_simple_desc}</p>
              </div>
              <div className={cardStyles['buttonteam']}>
                <button className={cardStyles['A-card-button']}>
                  <Link href={`/Pet-poduct/${v.products_id}`}>
                    NT
                    {v.product_price}
                  </Link>
                </button>

                <LikeIcon
                  products_id={v.products_id}
                  like={likeProduct.includes(v.products_id)}
                  handleToggleLike={() =>
                    handleToggleLike(v.products_id, v.product_name)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      <Toaster />
    </>
  )
}
