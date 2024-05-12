import React, { useState, useEffect } from 'react'

//css+icon
import styles from '@/components/common/forUserPage/Favorite.module.css'
import LikeStyles from '@/styles/product/like.module.css'
import paginationStyles from '@/styles/product/pagination.module.css'
import { PiPawPrint } from 'react-icons/pi'

const cardBackgroundClass = `${LikeStyles['A-card__background']} ${LikeStyles['card-img']}`
const cardContentContainerClass = `${LikeStyles['A-card__content--container']} ${LikeStyles['flow']}`
const cardContentClass = `${LikeStyles['A-card__content']} ${LikeStyles['flow']}`
const cardTitleClass = `${LikeStyles['A-card__title']} ${LikeStyles['H2']}`
const cardDescriptionClass = `${LikeStyles['A-card__description']} ${LikeStyles['card-P']}`
const paginationClass = `${paginationStyles['pagination']} ${paginationStyles['p1']}`

export default function Frontcard() {
  return (
    <>
      <div className={`col-6 col-md-3 p-0 ${LikeStyles['A-card']}`}>
        <img className={cardBackgroundClass} src="img/041.png" alt="" />
        <div className={cardContentClass}>
          <div className={cardContentContainerClass}>
            <h2 className={cardTitleClass}>優肉</h2>
            <p className={cardDescriptionClass}>妹妹 • 5歲 • 虎斑 • 5.1kg</p>
          </div>
          <div className={LikeStyles['buttonteam']}>
            <button className={LikeStyles['A-card-button']}>Read more</button>
            <div className={LikeStyles['pawicon']}>
              <PiPawPrint />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
