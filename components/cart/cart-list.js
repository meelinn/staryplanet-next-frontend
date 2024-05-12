import React from 'react'
import styles from '@/components/cart/cart.module.css'

import { useCart } from '@/hooks/use-cart'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function CartList() {
  const { items, incrementItemById, decrementItemById, removeItemById } =
    useCart()

  // notifyAndRemove 定義此函數名稱為跳出訊息並執行刪除
  const notifyAndRemove = (productName, id) => {
    MySwal.fire({
      title: '你確定嗎?',
      text: '此動作將無法復原!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '是的，請刪除。',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + '已從購物車中移除',
          icon: 'success',
        })
        // 這裡做刪除的動作
        removeItemById(id)
      }
    })
  }

  return (
    <>
      <ul className={styles['list']}>
        {items.map((v, i) => {
          return (
            <li key={v.id} className={styles['item']}>
              <div className={styles['w-400']}>{v.name}</div>
              <div>{v.price}</div>
              <div>
                <button
                  onClick={() => {
                    incrementItemById(v.id)
                  }}
                >
                  +
                </button>
                <span>{v.qty}</span>
                <button
                  onClick={() => {
                    // 如果使用者按下-按鈕，預先計算商品的數量會變多少
                    const nextQty = v.qty - 1
                    // 下一個(即將改變)的商品數量會變為0的話，移除此商品
                    if (nextQty === 0) {
                      // removeItemById(v.id)
                      // 改為以下對話盒，使用者確定後才會執行刪除
                      notifyAndRemove(v.name, v.id)
                    } else {
                      decrementItemById(v.id)
                    }
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    // removeItemById(v.id)
                    // +
                    // notifySA(v.name)
                    // 改為以下對話盒，使用者確定後才會執行刪除
                    notifyAndRemove(v.name, v.id)
                  }}
                >
                  移除
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
