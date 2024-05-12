import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/auth-context'
import cardStyles from '@/styles/adoption/card.module.css'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast'
//
import AdoptionLikeIcon from './adoption-like-icon'
//使用喜愛路由
import { JWT_PET_LIKE } from '@/configs'

export default function AdoptionCard({ data, setData }) {
  const [likePets, setLikePets] = useState([])
  const { auth, getAuthHeader } = useAuth(0)

  const handleToggleLike = async (pet_id, pet_name) => {
    try {
      const r = await fetch(`${JWT_PET_LIKE}/${pet_id}`, {
        headers: { ...getAuthHeader() },
      })
      const result = await r.json()

      if (result.success) {
        // 更新 likePets 狀態
        setLikePets((prevLikePets) => {
          if (result.action === 'add') {
            // 新增喜歡的寵物
            toast.success(`已將 ${pet_name} 成功加入我的最愛`)
            return [...prevLikePets, pet_id]
          } else {
            // 移除喜歡的寵物
            toast.error(`已將 ${pet_name} 移除我的最愛`)
            return prevLikePets.filter((id) => id !== pet_id)
          }
        })

        // 更新 AdoptionCard 的 data
        setData((old) => {
          const newRows = old.rows.map((v) => {
            if (v.pet_id === pet_id) {
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
      fetch(`${JWT_PET_LIKE}?member_id=${auth.id}`)
        .then((r) => r.json())
        .then((dataObj) => {
          if (dataObj.success === false) return
          const likedPetIds = dataObj.data.map((v) => v.pet_id)
          console.log(dataObj.data)
          setLikePets(likedPetIds)
          console.log(likedPetIds)
        })
    } else {
      console.log('沒有會員資料')
    }
  }, [auth]) // 當 auth 狀態改變時重新執行

  return (
    <>
      {data.rows.map((v, i) => (
        <div
          className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}
          key={v.pet_id}
        >
          {v.pet_photo && v.pet_photo.split(',')[0] && (
            <img
              className={`${cardStyles['A-card__background']} ${cardStyles['card-img']}`}
              src={`img/pet_photo/${v.pet_photo.split(',')[0]}`}
              alt=""
            />
          )}
          <div
            className={`${cardStyles['A-card__content']} ${cardStyles['flow']}`}
          >
            <div
              className={`${cardStyles['A-card__content--container']} ${cardStyles['flow']}`}
            >
              <h2
                className={`${cardStyles['A-card__title']} ${cardStyles['H2']}`}
              >
                {v.pet_name}
              </h2>
              <p
                className={`${cardStyles['A-card__description']} ${cardStyles['card-P']}`}
              >
                {v.pet_age}歲 • {v.pet_type} • {v.pet_color}色
              </p>
            </div>
            <div className={cardStyles['buttonteam']}>
              <button
                className={cardStyles['A-card-button']}
                onClick={function () {
                  window.location.href = `Adoption/${v.pet_id}`
                }}
              >
                了解更多
              </button>

              <AdoptionLikeIcon
                pet_id={v.pet_id}
                like={likePets.includes(v.pet_id)}
                handleToggleLike={() => handleToggleLike(v.pet_id, v.pet_name)}
              />
            </div>
          </div>
        </div>
      ))}
      {/* 吐司訊息 */}
      <Toaster />
    </>
  )
}
