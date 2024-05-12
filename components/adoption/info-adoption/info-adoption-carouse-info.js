import React, { useState, useEffect } from 'react'
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'

import { PiPawPrintBold } from 'react-icons/pi'
import { PiPawPrintFill } from 'react-icons/pi'
import { Button } from 'react-bootstrap'
import { FaShareAlt } from 'react-icons/fa'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { useAuth } from '@/contexts/auth-context'

//like功能
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast'
import InfoAdoptionLikeIcon from './info-adoption-like-icon'
//使用喜愛路由
import { JWT_PET_LIKE } from '@/configs'

export default function InfoAdoptionCarouseInfo({ data, setData }) {
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
      {data && data.pet_story && (
        <>
          <div className={ContentStyles['storyfont']}>
            <div className={ContentStyles['storyPawteam']}>
              <InfoAdoptionLikeIcon
                size={50}
                color="rgba(193, 214, 161, 1)"
                pet_id={data.pet_id}
                like={likePets.includes(data.pet_id)}
                handleToggleLike={() =>
                  handleToggleLike(data.pet_id, data.pet_name)
                }
              />

              <h2 className={ContentStyles['storyH2']}>我的故事</h2>
            </div>

            <div className={ContentStyles['storyP']}>
              <p className="text-primary">{data.pet_simple_narrative}</p>
              <p>{data.pet_story}</p>
            </div>

            <div>
              <div className={ContentStyles['storymore']}>
                <p>
                  分享小工具:
                  <FaShareAlt
                    size={25}
                    style={{ marginLeft: '6px', marginBottom: '5px' }}
                  />
                </p>

                <div className={ContentStyles['storyshare']}>
                  <p>
                    更多我的資訊
                    <FaArrowTurnDown style={{ marginLeft: '5px' }} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* 吐司訊息 */}
      <Toaster />
    </>
  )
}
