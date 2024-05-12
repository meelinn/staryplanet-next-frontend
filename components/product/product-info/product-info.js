import React from 'react'
//css
import infoContentStyles from '@/styles/product/content.module.css'
import ContentStyles from '@/styles/product/content.module.css'
//icon
import { FaShareAlt } from 'react-icons/fa'
import { PiPawPrintBold } from 'react-icons/pi'
import { PiPawPrintFill } from 'react-icons/pi'
import { PiPawPrint } from 'react-icons/pi'
//components
import Number from '@/components/product/product-info/number'

export default function Productinfo({ data }) {
  return (
    <>
      {data && data.product_name && (
        <>
          <div className={ContentStyles['storyfont']}>
            <div className={ContentStyles['storyPawteam']}>
              <PiPawPrintBold size={50} color="rgba(193, 214, 161, 1)" />

              <h2 className={ContentStyles['storyH2']}>{data.product_name}</h2>
            </div>
            <div className={ContentStyles['storyP']}>
              <p>
                商品特色:
                <br />
                {data.product_simple_desc}
              </p>
              <br />
              商品規格:
              <br />
              {data.product_desc}
            </div>

            <Number />

            <div>
              <div className={infoContentStyles['storymore']}>
                <p>
                  分享小工具:
                  <FaShareAlt
                    size={25}
                    style={{ marginLeft: '6px', marginBottom: '5px' }}
                  />
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
