import React from 'react'
import { useRouter } from 'next/router'
import BannerStyles from '@/styles/adoption/info-adoption/banner.module.css'

export default function InfoAdoptionBanner({ data }) {
  const router = useRouter()

  return (
    <>
      {data && data.pet_name && (
        <>
          <div className={BannerStyles['A-banner-frame']}>
            <div className={BannerStyles['A-banner']}>
              <div>
                <p
                  className={BannerStyles['A-banner-text']}
                  style={{ cursor: 'default' }}
                >
                  {`帶${data.pet_name}回家`}
                </p>
                <p className={BannerStyles['A-banner-p']}>
                  {data.pet_age}歲 • {data.pet_type} • {data.pet_color}色
                </p>
              </div>
              <div className={BannerStyles['process-b']}>
                <button
                  href="/pet-info"
                  className={BannerStyles['process-button']}
                >
                  領養流程
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
