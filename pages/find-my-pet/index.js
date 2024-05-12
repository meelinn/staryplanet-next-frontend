import React from 'react'
//layout
import FindMyPetLayout from '@/components/layout/find-my-pet-layout'
//styles
import FindMyPetStyles from '@/components/find-my-pet/css/find-my-pet.module.css'
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'
//motion
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FindMyPetIndex() {
  return (
    <>
      {/* Intro */}
      <div className={`container ${FindMyPetStyles['mt120']} bg-primary`}>
        <div className="row">
          <div className="col-md-6">
            {/* <img src="/pet_image.jpg" alt="Pet Image" className="img-fluid" /> */}
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h2 className="my-5">寵物適配測驗</h2>
              <p>
                你是否曾經想過，如果你是一隻動物，你會是哪種動物呢？是一隻忠誠的狗狗，還是一隻獨立的貓咪？
                寵物不僅僅是家中的一員，更是陪伴我們度過生活的好朋友。每個人對於喜歡的寵物類型可能都有不同的偏好，這是由於我們的性格、生活方式和需求各不相同。
                透過這個寵物配對測驗，你將有機會探索自己對於不同寵物類型的喜好，以及了解不同寵物的毛色、個性等特徵。讓我們一起開始這個有趣的冒險，發現哪種寵物最適合與你成為摯友！
              </p>
              {/* <Link href={`/find-my-pet/question${question_id}`}>
                <button className={ContentStyles['process-button']}>
                  開始測驗
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

FindMyPetIndex.getLayout = function (page) {
  return <FindMyPetLayout>{page}</FindMyPetLayout>
}
