import React, { useState, useEffect } from 'react'

// router
import { useRouter } from 'next/router'
import { API_SERVER, PET_LIST, JWT_PET_LIKE } from '@/configs'
import { useAuth } from '@/contexts/auth-context'
// css+icon
import adoptionStyles from '@/styles/adoption/Adoption.module.css'
import contentStyles from '@/styles/adoption/content.module.css'

// components
import AdoptionCard from '@/components/adoption/adoption-card'
import AdoptionPagination from '@/components/adoption/adoption-pagination'
import AdoptionFilter from '@/components/adoption/adoption-filter'
import AdoptionOrderButton from '@/components/adoption/adoption-order-button'
import Ad from '@/components/adoption/ad'

const Adoption = () => {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()

  // 卡片data
  const [data, setData] = useState({
    //只要此狀態改變,以下子元件(Layout1.Head)都會全部re-render
    success: false,
    page: 0,
    totalPages: 0,
    rows: [], //列表資料
  })

  useEffect(() => {
    console.log(location.search) //原生JS:location.href ; location.search 會出現參數
    fetch(`${PET_LIST}${location.search}`)
      // /api${location.search}
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
        console.log(data.rows) //[]
      })
  }, [router.query, auth]) //[]:依賴 router.query更新之後,會觸發資料更新
  console.log(router.query) //{}
  // 取得 query string 的資料
  const qs = { ...router.query }
  console.log(qs) //page: '6'

  return (
    <>
      <div>
        {/* banner開始 */}
        <div className={adoptionStyles['A-banner-frame']}>
          <div className={adoptionStyles['A-banner']}>
            <div>
              <p
                className={adoptionStyles['A-banner-text']}
                style={{ cursor: 'default' }}
              >
                帶我回家
              </p>
            </div>
            <div className={adoptionStyles['process-b']}>
              <button
                href="/pet-info"
                className={adoptionStyles['process-button']}
              >
                領養流程
              </button>
            </div>
          </div>
        </div>
        {/* banner結束 */}

        {/* 認養頁面開始 */}
        <div className="container">
          <div className="row align-items-start">
            {/* 左側欄開始 */}
            <div className="col-12 col-md-3 mr-md-4">
              <nav
                className={` ${contentStyles['A-breadcrumb']}`}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a className={contentStyles['A-breadcrumb-li']} href="#">
                      Home
                    </a>
                  </li>
                  <li
                    className={`${contentStyles['A-breadcrumb-li2']} active breadcrumb-item `}
                    aria-current="page"
                  >
                    帶我回家
                  </li>
                </ol>
              </nav>
              <AdoptionFilter data={data} />
            </div>
            {/* 卡片開始 */}
            <div className={`col-12 col-md-9 `}>
              <Ad />
              {/* <AdoptionOrderButton /> */}
              {/* ${cardStyles['A-right']} */}
              <div className="row  justify-content-md-start justify-content-sm-between">
                {/* 卡片元件 */}
                {!data.rows ? (
                  <div>loading...</div>
                ) : (
                  <AdoptionCard data={data} setData={setData} />
                )}

                {/* 分頁 */}
                <AdoptionPagination data={data} qs={qs} />
              </div>
            </div>
          </div>
          {/* 卡片結束 */}
        </div>
        {/* 認養頁面結束 */}
      </div>
    </>
  )
}

export default Adoption
