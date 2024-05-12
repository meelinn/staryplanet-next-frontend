import React, { useEffect, useState, useCallback, useContext } from 'react'
import styles from '../../styles/order-form.module.css'
import { API_SERVER } from '@/configs'
import { useCart } from '../../context/CartContext'
import { useOrder } from '../../context/OrderContext'
import { useAuth } from '@/contexts/auth-context'
import Swal from 'sweetalert2'
export default function Fortable({ check, handleCheck }) {
  const { cartItem, deleteItem, updateItem } = useCart()
  const { auth } = useAuth()
  const { order, setOrder } = useOrder()
  const [subtotal, setSubTotal] = useState(0)

  // 這裡計算已選擇的商品的加總
  useEffect(() => {
    const subtotal = reducePrice()
    const newitem = cartItem.filter((item) => check.includes(item.cart_item_id))
    setOrder((prevOrder) => ({
      ...prevOrder,
      item: newitem,
      subtotal: subtotal,
      total: subtotal + 45,
    }))
  }, [cartItem, check])
  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      total: subtotal + 45 - order.coupondiscount,
    }))
  }, [order?.coupondiscount])
  // 計算加總
  const reducePrice = () => {
    const tot = cartItem.reduce((acc, item) => {
      if (check.includes(item.cart_item_id)) {
        return acc + item.product_price * item.cart_item_quantity
      }
      return acc
    }, 0)
    setSubTotal(tot)
    return tot
  }

  return (
    <>
      <tbody>
        {cartItem && cartItem.length > 0 ? (
          cartItem.map((v) => (
            <tr key={v.cart_item_id}>
              <td className="align-middle" style={{ width: '10%' }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={check.includes(v.cart_item_id)}
                  value={v.cart_item_id}
                  onChange={(e) => {
                    handleCheck(e)
                  }}
                />
              </td>
              <td className="align-middle">
                <div className="d-flex justify-content-center">
                  <img
                    src={`${API_SERVER}/img/poducts/${v.product_img}`}
                    className={styles.img_fluid}
                    alt="商品1"
                    width={150} // 指定寬度
                    height={150} // 指定高度
                  />
                </div>
              </td>

              <td className="align-middle text-center">{v.product_name}</td>
              <td className="align-middle text-center">{v.product_price}</td>
              <td className="align-middle text-center">
                <div
                  className={`input-group align-middle input-group-sm text-center ${styles.input_group}`}
                >
                  <button
                    className={`btn ${styles.btn} ${styles.btn_outline2_primary}`}
                    type="button"
                    onClick={() => {
                      updateItem({
                        id: v.cart_item_id,
                        count: 'sub',
                        userid: auth.id,
                      })
                    }}
                    disabled={v.cart_item_quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className={`text-center ${styles.form_control2}`}
                    value={v.cart_item_quantity}
                    readOnly
                  />
                  <button
                    className={`btn ${styles.btn} ${styles.btn_outline2_primary}`}
                    type="button"
                    onClick={() => {
                      updateItem({
                        id: v.cart_item_id,
                        count: 'add',
                        userid: auth.id,
                      })
                    }}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="align-middle text-center">
                <span className="total-price">
                  小計：${v.product_price * v.cart_item_quantity}
                </span>
              </td>
              <td className="align-middle text-center">
                <button
                  type="button"
                  className={`btn btn-sm btn-danger ${styles.btn}`}
                  onClick={() => {
                    Swal.fire({
                      title: '你確定要刪除嗎?',
                      showCancelButton: true,
                      cancelButtonText: '取消',
                      confirmButtonText: '確定',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteItem(v.cart_item_id, auth.id)
                      }
                    })
                  }}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">您還未新增商品唷~請點選毛毛商城進行購買↗↗↗↗↗</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="7" className="text-end">
            總額：${subtotal}
          </td>
        </tr>
      </tfoot>
    </>
  )
}
