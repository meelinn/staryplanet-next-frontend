import React from 'react'
import styles from '@/components/concept/care-info/care-info-s3-card.module.css'

export default function CareInfoS3Card() {
  const s3CardsData = [
    {
      src: '/img/care-info/food.png',

      alt: '飼料',
      text: '飼料',
    },
    {
      src: '/img/care-info/litter-box.png',
      alt: '便盆',
      text: '便盆',
    },
    {
      src: '/img/care-info/bowl.png',
      alt: '食碗',
      text: '食碗',
    },
    {
      src: '/img/care-info/toy.png',
      alt: '玩具',
      text: '玩具',
    },
    {
      src: '/img/care-info/bed.png',
      alt: '睡床',
      text: '睡床',
    },
    {
      src: '/img/care-info/leash.png',
      alt: '外出用品',
      text: '外出用品',
    },
    {
      src: '/img/care-info/shampoo.png',
      alt: '清潔用品',
      text: '清潔用品',
    },
  ]
  return (
    <>
      <div className="row justify-content-end align-items-center mb-5">
        {/* 顯示三張卡片 */}
        {s3CardsData.slice(0, 3).map((v, i) => (
          <div className="mb-3 col-sm-4 col-md-3 " key={i}>
            <div className={`card rounded-4  ${styles['care-info-s3-card']} `}>
              <img
                src={v.src}
                className={`card-img p-5 pb-4 ${styles['care-info-s3-img']}`}
                alt={v.alt}
              />

              <p className="text-center ">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {/* 顯示四張卡片 */}
        {s3CardsData.slice(3, 7).map((v, i) => (
          <div className="mb-3 col-sm-4 col-md-3 " key={i}>
            <div className={`card rounded-4  ${styles['care-info-s3-card']}`}>
              <img
                src={v.src}
                className={`card-img p-5 pb-4 ${styles['care-info-s3-img']}`}
                alt={v.alt}
              />
              <div className="card-body p-0">
                <p className="text-center ">{v.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
