import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
//css+icon

import SellerStyles from '@/styles/product/best-seller.module.css'
//components

import Banner from '@/components/product/product-info/banner'
import Carousel from '@/components/product/product-info/carousel'
import Productinfo from '@/components/product/product-info/product-info'
import Productsimilar from '@/components/product/product-info/product-similar'

// router
import { API_SERVER, PRODUCT_LIST } from '@/configs'
//style群組

const Information = () => {
  const router = useRouter()
  const { product_id } = router.query

  console.log('Received product_id:', product_id)
  const [data, setData] = useState({
    product_id: 0,
    product_name: '',
    product_type: '',
    product_class: '',
    product_picture: '',
    product_price: '',
    product_simple_desc: '',
    product_stock: '',
    product_desc: '',
    product_nop: 0,
  })
  console.log(data)

  useEffect(() => {
    if (!product_id) return // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${PRODUCT_LIST}/${product_id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          setData({ ...result.data })
        } else {
          router.push('/Pet-poduct')
        }
      })
  }, [product_id, router])

  console.log(data)
  console.log(router.query)

  return (
    <div>
      {/* banner */}
      <Banner data={data} />

      <div className="container">
        <div className="row ">
          <nav
            className={`mt-5 ${SellerStyles['A-breadcrumb']}`}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href={`/`} className={SellerStyles['A-breadcrumb-li']}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  href={`/Pet-poduct`}
                  className={SellerStyles['A-breadcrumb-li']}
                >
                  毛毛商城
                </Link>
              </li>
              <li
                className={`${SellerStyles['A-breadcrumb-li2']} active breadcrumb-item `}
                aria-current="page"
              >
                詳細內容
              </li>
            </ol>
          </nav>
          {/* 輪播圖 */}
          <Carousel data={data} />
          {/* 毛孩資訊 */}
          <div className="col-12 col-md-6 mr-md-4">
            <Productinfo data={data} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <Productsimilar
            products_id={data.product_id}
            product_type={data.product_type}
            product_class={data.product_class}
          />
        </div>
      </div>
    </div>
  )
}
export default Information
