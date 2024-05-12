import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// router
import { useRouter } from 'next/router'
import {
  JWT_PET_LIKE,
  FAVORITE_PET,
  PET_LIST,
  FAVORITE_PRODUCT,
} from '@/configs'
import { useAuth } from '@/contexts/auth-context'
//css+icon
import styles from '@/components/common/forUserPage/Favorite.module.css'
import adoptionStyles from '@/styles/adoption/Adoption.module.css'
import contentStyles from '@/styles/adoption/content.module.css'
// components
import LikeStyles from '@/styles/product/like.module.css'
import AdoptionCard from '@/components/adoption/adoption-card'
import AdoptionPagination from '@/components/adoption/adoption-pagination'
import ProductCard from '@/components/product/product-card'
import FavoritePagination from './favorite/favorite-pagination'

export default function Favorite({ open, onClose }) {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()
  const [showProducts, setShowProducts] = useState(true)
  const qs = { ...router.query }

  // 卡片data
  const [data, setData] = useState({
    //只要此狀態改變,以下子元件(Layout1.Head)都會全部re-render
    success: false,
    page: 0,
    totalPages: 0,
    rows: [], //列表資料
  })

  useEffect(() => {
    fetch(
      `${showProducts ? FAVORITE_PRODUCT : FAVORITE_PET}?member_id=${auth.id}`
    )
      // ?member_id=${auth.id}
      // 傳送member_id到後端，得到id資料後進行sql查詢
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
        console.log(FAVORITE_PRODUCT)
      })
  }, [router.query, auth, showProducts, qs.page]) //[]:依賴 router.query更新之後,會觸發資料更新

  // console.log(data)
  // console.log(Array.isArray(data.rows))\
  console.log(router.query)

  const handleToggleProducts = () => {
    const { page } = router.query
    router.push({
      pathname: '/UserPage',
      query: { ...qs, page: page || 1 }, // 保持現有查詢參數不變，只修改 page
    })
    setShowProducts(true)
  }

  const handleTogglePets = () => {
    const { page } = router.query
    router.push({
      pathname: '/UserPage',
      query: { ...qs, page: page || 1 }, // 保持現有查詢參數不變，只修改 page
    })
    setShowProducts(false)
  }

  const productCard = () => {
    if (showProducts) {
      if (!Array.isArray(data.rows) || data.rows.length === 0) {
        return (
          <div className="text-center">
            <img src="/img/cat.png" className="mt-5" />
            <h5
              className="container text-center fw-bold mt-5"
              style={{ color: '#65463E' }}
            >
              還沒有收藏過喔！
            </h5>
          </div>
        )
      } else {
        return (
          <>
            <ProductCard data={data} setData={setData} />
            <FavoritePagination data={data} qs={qs} />
          </>
        )
      }
    }
    return null
  }

  const petCard = () => {
    if (!showProducts) {
      if (!Array.isArray(data.rows) || data.rows.length === 0) {
        return (
          <div className="text-center">
            <img src="/img/cat.png" className="mt-5" />
            <h5
              className="container text-center fw-bold mt-5"
              style={{ color: '#65463E' }}
            >
              還沒有收藏過喔！
            </h5>
          </div>
        )
      } else {
        return (
          <>
            <AdoptionCard data={data} setData={setData} />
            <FavoritePagination data={data} qs={qs} />
          </>
        )
      }
    }
    return null
  }

  if (!open) return null

  return (
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={LikeStyles['like']}>
          <div className={LikeStyles['likefont']}>
            <h2 className={LikeStyles['mylikeh2']}>我的最愛</h2>
          </div>
          <div className={LikeStyles['linkContainer']}>
            <button className="btn" onClick={handleToggleProducts}>
              喜愛的商品
            </button>
            <button className="btn" onClick={handleTogglePets}>
              喜愛的浪浪
            </button>
          </div>
        </div>
        <div className="row ">
          {/* 卡片 */}
          {showProducts ? productCard() : petCard()}
        </div>
      </div>
    </div>
  )
}
