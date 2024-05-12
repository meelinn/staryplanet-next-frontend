import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PRODUCT_SMILER, FRONT_END } from '@/configs'
import Link from 'next/link'

//css+icon
import ContentStyles from '@/styles/product/content.module.css'
import cardStyles from '@/styles/product/card.module.css'
import LikeIcon from '@/components/product/product-like-icon'
//css群組
const cardBackgroundClass = `${cardStyles['A-card__background']} ${cardStyles['card-img']}`
const cardContentContainerClass = `${cardStyles['A-card__content--container']} ${cardStyles['flow']}`
const cardContentClass = `${cardStyles['A-card__content']} ${cardStyles['flow']}`
const cardTitleClass = `${cardStyles['A-card__title']} ${cardStyles['H2']}`
const cardDescriptionClass = `${cardStyles['A-card__description']} ${cardStyles['card-P']}`

export default function ProductSimilar({
  products_id,
  product_type,
  product_class,
}) {
  console.log(products_id, product_type, product_class)
  const router = useRouter()

  const [similarproduct, setSimilarproduct] = useState([
    {
      products_id: 0,
      product_name: '',
      product_type: '',
      product_class: '',
      product_picture: '',
    },
  ])

  useEffect(() => {
    if (!products_id || !product_type || !product_class)
      //的作用是當 pet_id、pet_color 和 pet_type 三者之中任何一個為空時，不執行後續的副作用操作。 return
      fetch(
        `${PRODUCT_SMILER}?product_type=${product_type}&product_class=${product_class}`
      )
        //ch 函式被 return 關鍵字包裹，因此 fetch 函式的結果將成為 useEffect 鉤子的返回值。
        .then((response) => response.json())
        //這是將請求的回應解析為 JSON 格式，該 Promise 在成功解析 JSON 後將解析後的結果傳遞給下一個 .then() 方法。
        .then((result) => {
          if (result.success) {
            //檢查了回應中的 success 屬性。如果 result.success 為真，表示請求成功
            setSimilarproduct(result.data)
            console.log(result.data)
            //並在控制台中打印數據使用 console.log(result.data)
          } else {
            console.error('Failed to fetch similar product:', result.message)
          }
        })
        .catch((error) => {
          console.error('Error fetching similar pets:', error)
        })
  }, [products_id, product_type, product_class])
  console.log(similarproduct)
  console.log({ products_id, product_type, product_class })
  return (
    <>
      {similarproduct && (
        //如果 similarproduct 存在且為真，那麼括號中的表達式（通常是 JSX 元素）就會被渲染出來。
        <>
          <div className={ContentStyles['similarH2-container']}>
            <h1 className={ContentStyles['similarH2']}>您可能會感興趣的商品</h1>
          </div>
          <div className={ContentStyles['mysimilarpet']}>
            <div className={ContentStyles['similar-container']}>
              {similarproduct
                .filter((product) => product.products_id !== products_id)
                // :使用 filter 方法過濾 similarproduct 陣列中的元素，排除那些 products_id 不等於指定 products_id 的元素。
                .sort(() => 0.5 - Math.random())
                // :使用 sort 方法對陣列進行排序。這裡使用了一個隨機排序的技巧，通過比較 0.5 減去一個介於 0 和 1 之間的隨機數，實現了陣列的隨機排序。
                .slice(0, 5)
                //使用 slice 方法從排序後的陣列中取出前 4 個元素，這樣做是為了只顯示前 4 個相似產品。
                .map((v, i) => (
                  <div
                    className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}
                    key={v.products_id}
                  >
                    <img
                      className={cardBackgroundClass}
                      src={`${FRONT_END}/img/poducts/${
                        v.product_picture.split(',')[0]
                      }`}
                      alt=""
                    />
                    <div className={cardContentClass}>
                      <div className={cardContentContainerClass}>
                        <h2 className={cardTitleClass}>{v.product_name}</h2>
                        <p className={cardDescriptionClass}>
                          {v.product_simple_desc}
                        </p>
                      </div>
                      <div className={cardStyles['buttonteam']}>
                        <Link href={`/Pet-poduct/${v.products_id}`}>
                          <button className={cardStyles['A-card-button']}>
                            NT
                            {v.product_price}
                          </button>
                        </Link>
                        <LikeIcon />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
