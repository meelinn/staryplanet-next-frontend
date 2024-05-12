import React from 'react'
import { useRouter } from 'next/router'
//style
import BannerStyles from '@/styles/product/banner.module.css'

export default function banner({ data }) {
  return (
    <>
      {data && data.product_name && (
        <>
          <div className={BannerStyles['A-banner-frame']}>
            <div className={BannerStyles['A-banner']}>
              <div>
                <p
                  className={BannerStyles['A-banner-text']}
                  style={{ cursor: 'default' }}
                >
                  {`${data.product_name}`}
                </p>
                <p className={BannerStyles['A-banner-p']}>
                  {data.product_simple_desc}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
