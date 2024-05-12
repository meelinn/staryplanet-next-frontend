import React from 'react'
import cardStyles from '@/styles/adoption/card.module.css'
export default function card({ v }) {
  return (
    <>
      <div
        className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}
        key={v.pet_id}
      >
        <img
          className={`${cardStyles['A-card__background']} ${cardStyles['card-img']}`}
          src={`img/pet_photo/${v.pet_photo}`}
          alt=""
        />
        <div
          className={`${cardStyles['A-card__content']} ${cardStyles['flow']}`}
        >
          <div
            className={`${cardStyles['A-card__content--container']} ${cardStyles['flow']}`}
          >
            <h2
              className={`${cardStyles['A-card__title']} ${cardStyles['H2']}`}
            >
              {v.pet_name}
            </h2>
            <p
              className={`${cardStyles['A-card__description']} ${cardStyles['card-P']}`}
            >
              {v.pet_age}歲 • {v.pet_type} • {v.pet_color}色
            </p>
          </div>
          <div className={cardStyles['buttonteam']}>
            <button className={cardStyles['A-card-button']}>
              <Link href={`/Adoption/${v.pet_id}`} className="text">
                Read more
              </Link>
            </button>

            <AdoptionLikeIcon
              pet_id={v.pet_id}
              like={likePets.includes(v.pet_id)}
              handleToggleLike={handleToggleLike}
            />
          </div>
        </div>
      </div>
    </>
  )
}
