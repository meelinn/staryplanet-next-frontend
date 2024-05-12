import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// css+icon
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'

//components
import InfoAdoptionBanner from '@/components/adoption/info-adoption/info-adoption-banner'
import InfoAdoptionCarousel from '@/components/adoption/info-adoption/info-adoption-carousel'
import InfoAdoptionCarouseInfo from '@/components/adoption/info-adoption/info-adoption-carouse-info'
import InfoAdoptionContent from '@/components/adoption/info-adoption/info-adoption-content'
import InfoAdoptionModal from '@/components/adoption/info-adoption/info-adoption-modal'
import InfoAdoptionSimilarCard from '@/components/adoption/info-adoption/info-adoption-similar-card'

// router
import { PET_LIST } from '@/configs'
import { useAuth } from '@/contexts/auth-context'

export default function InfoAdoption() {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()
  const { pet_id } = router.query

  console.log('Received pet_id:', pet_id)
  const [data, setData] = useState({
    rows: [
      {
        pet_id: 0, // 資料的 primary key
        pet_name: '',
        pet_type: '',
        pet_age: 0,
        pet_color: '',
        pet_number: '',
        pet_gender: '',
        pet_photo: '',
        pet_story: '',
        pet_qualities: '',
        pet_simple_narrative: '',
        pet_health: '',
        pet_medical_record: '',
        pet_character: 0,
        pet_locomotion: 0,
        pet_adaptability: 0,
        pet_extroversion: 0,
        pet_bark: 0,
        pet_anxiety: 0,
        pet_aggression: 0,
        pet_guarding: 0,
        fk_shelter_id: 0,
        shelter_name: '',
        shelter_address: '',
        shelter_link: '',
        shelter_number: '',
        shelter_contact_person: '',
        shelter_phone: '',
        map_iframe: '',
      },
    ],
  })

  useEffect(() => {
    if (!pet_id) return // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${PET_LIST}/${pet_id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          setData({ ...result.data })
        } else {
          router.push('/adoption')
        }
      })
  }, [pet_id, router, auth])

  console.log(data)
  // console.log(`${PET_LIST}/${pet_id}`)
  return (
    <div>
      {/* banner */}
      <InfoAdoptionBanner data={data} />
      <div className="container info">
        <div className="row carousel">
          {/* 輪播圖 */}
          <InfoAdoptionCarousel data={data} />
          {/* 毛孩資訊 */}
          <div className="col-12 col-md-6 mr-md-4 info">
            <InfoAdoptionCarouseInfo data={data} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <InfoAdoptionContent data={data} />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {/* Modal彈窗 */}
          <div
            className="modal fade"
            id="myModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <InfoAdoptionModal data={data} />
          </div>
        </div>
      </div>
      <div className={`container ${ContentStyles['mb-120px']} `}>
        <div className={ContentStyles['similarH2-container']}>
          <h1 className={`${ContentStyles['similarH2']} `}>其他相似的毛孩</h1>
        </div>
        {/* <div className={ContentStyles['mysimilarpet']}>
          <div className={ContentStyles['similar-container']}> */}
        <div className="row justify-content-center align-items-center ">
          {/* card */}
          {!data ? (
            <div>loading...</div>
          ) : (
            <InfoAdoptionSimilarCard
              pet_id={data.pet_id}
              pet_color={data.pet_color}
              pet_type={data.pet_type}
            />
          )}
        </div>
        {/* </div> */}

        <button
          className={` ${ContentStyles['process-button']} ${ContentStyles['my-50']} mx-auto`}
          variant="primary"
          onClick={() => {
            window.location.href = '/Adoption'
          }}
        >
          回到列表
        </button>

        {/* </div> */}
      </div>
    </div>
  )
}
