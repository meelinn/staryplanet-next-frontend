import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/auth-context'
import cardStyles from '@/styles/adoption/card.module.css'

import Swal from 'sweetalert2'
import AdoptionLikeIcon from '../adoption-like-icon'
// router
import { PET_SMILER, FRONT_END } from '@/configs'
import Link from 'next/link'
import { JWT_PET_LIKE } from '@/configs'
export default function InfoAdoptionSimilarCard({
  pet_id,
  pet_color,
  pet_type,
  setData,
}) {
  console.log(pet_id, pet_color, pet_type)
  // console.log(data)

  const [similarPets, setSimilarPets] = useState([
    {
      pet_id: 0,
      pet_name: '',
      pet_type: '',
      pet_age: 0,
      pet_color: '',
      pet_number: '',
      pet_gender: '',
      pet_photo: '',
    },
  ])
  const [likePets, setLikePets] = useState([])
  const { auth, getAuthHeader } = useAuth(0)
  const [randomPets, setRandomPets] = useState([]) //把這次的random結果存起來

  const handleToggleLike = async (pet_id) => {
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
            return [...prevLikePets, pet_id]
          } else {
            // 移除喜歡的寵物
            return prevLikePets.filter((id) => id !== pet_id)
          }
        })

        // 更新 AdoptionCard 的 data
        setData((old) => {
          console.log(old)
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
  useEffect(() => {
    if (!pet_id || !pet_color || !pet_type) return

    fetch(`${PET_SMILER}?pet_color=${pet_color}&pet_type=${pet_type}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setSimilarPets(result.data)
          console.log(result.data)
        } else {
          console.error('Failed to fetch similar pets:', result.message)
        }
      })
      .catch((error) => {
        console.error('Error fetching similar pets:', error)
      })
  }, [pet_id, pet_color, pet_type])
  console.log(similarPets)

  useEffect(() => {
    if (similarPets.length > 0) {
      const shuffledPets = similarPets.sort(() => Math.random() - 0.5)
      setRandomPets(shuffledPets)
    }
  }, [similarPets])

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
      {similarPets && (
        <>
          {/* && similarPets.pet_id */}

          {similarPets
            .filter((pet) => pet.pet_id !== pet_id)
            .slice(0, 4)
            .map((v, i) => (
              <div
                className={`col-6 col-md-6 col-lg-3 p-0 ${cardStyles['A-card']}`}
                key={v.pet_id}
              >
                <img
                  className={`${cardStyles['A-card__background']} ${cardStyles['card-img']}`}
                  src={`${FRONT_END}/img/pet_photo/${
                    v.pet_photo.split(',')[0]
                  }`}
                  alt={v.pet_name}
                />
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
                        window.location.href = `${v.pet_id}`
                      }}
                    >
                      了解更多
                    </button>

                    <AdoptionLikeIcon
                      pet_id={v.pet_id}
                      like={likePets.includes(v.pet_id)}
                      handleToggleLike={handleToggleLike}
                    />
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  )
}
