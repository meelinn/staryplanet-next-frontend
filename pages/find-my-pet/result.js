import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/auth-context'
//layout
import FindMyPetLayout from '@/components/layout/find-my-pet-layout'
//styles
import FindMyPetStyles from '@/components/find-my-pet/css/find-my-pet.module.css'
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'
//motion
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FindMyPetIndex() {
  const { auth, getAuthHeader } = useAuth(0)

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
              <h2 className="my-5">結果</h2>
              <p>123123</p>
              <Link href="/Adoption">
                <button className={ContentStyles['process-button']}>
                  帶我回家
                </button>
              </Link>
              <Link href={auth.id ? '/UserPage?coupons' : '/loginPage'}>
                <button className={ContentStyles['process-button']}>
                  領取優惠券
                </button>
              </Link>
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
