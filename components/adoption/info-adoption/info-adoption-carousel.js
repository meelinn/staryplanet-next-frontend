import React from 'react'
import { useRouter } from 'next/router'
import CarouselStyles from '@/styles/adoption/info-adoption/carousel.module.css'
import { FRONT_END } from '@/configs'

export default function InfoAdoptionCarousel({ data }) {
  const router = useRouter()
  return (
    <>
      {data && data.pet_photo && (
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
                    src={`/img/pet_photo/${data.pet_photo.split(',')[0]}`} //照片只能用絕對路徑顯示
                    alt={data.pet_name}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    src={`/img/pet_photo/${data.pet_photo.split(',')[1]}`}
                    alt={data.pet_name}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    src={`/img/pet_photo/${data.pet_photo.split(',')[2]}`}
                    alt={data.pet_name}
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
                  className="carousel-control-prev-icon"
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
                  className="carousel-control-next-icon"
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
