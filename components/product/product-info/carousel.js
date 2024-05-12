import React from 'react'
import { useRouter } from 'next/router'
import { FRONT_END } from '@/configs'

//css
import CarouselStyles from '@/styles/product/carousel.module.css'
import SellerStyles from '@/styles/product/best-seller.module.css'

export default function Carousel({ data }) {
  const router = useRouter()
  return (
    <>
      {data && data.product_picture && (
        <>
          <div className="col-12 col-md-6 mr-md-4">
            <div
              id="carouselExampleFade"
              className={`carousel slide carousel-fade ${CarouselStyles['mycarousel']}`}
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    src={`${FRONT_END}/img/poducts/${
                      data.product_picture.split(',')[0]
                    }`} //照片只能用絕對路徑顯示
                    alt={data.product_name}
                  />
                </div>
                <div className="carousel-item active">
                  <img
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    src={`${FRONT_END}/img/poducts/${
                      data.product_picture.split(',')[0]
                    }`} //照片只能用絕對路徑顯示
                    alt={data.product_name}
                  />
                </div>
                <div className="carousel-item active">
                  <img
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    src={`${FRONT_END}/img/poducts/${
                      data.product_picture.split(',')[0]
                    }`} //照片只能用絕對路徑顯示
                    alt={data.product_name}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className={`carousel-control-prev-icon ${SellerStyles.carouselControlPrevIcon}`}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className={`carousel-control-next-icon ${SellerStyles.carouselControlNextIcon}`}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
