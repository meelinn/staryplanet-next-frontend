import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import styles from '../../styles/order-form.module.css'
import Fortable from '../../components/order-form/for_table'
import Amo_table from '@/components/order-delivery/amo_table'
import { useCart } from '../../context/CartContext'
import { useOrder } from '../../context/OrderContext'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import Link from 'next/link'
import axios from 'axios'
import { API_SERVER } from '@/configs'
import { useAuth } from '@/contexts/auth-context'
export default function OrderForm() {
  const router = useRouter()
  const { cartItem, setCartItem, readItem } = useCart() // 取用cart這個hook
  const { auth } = useAuth()
  const { order, setOrder, receiveCoupon, readCoupon, addOrder } = useOrder() // 取用cart這個hook
  // 每次進入購物車時讀取資訊
  useEffect(() => {
    if (auth.id == 0) {
      setCartItem([]) // 登出後清除
    } else {
      readItem(auth.id)
      setOrder((prevOrder) => ({
        ...prevOrder,
        user: auth.id,
      }))
      readCoupon(auth.id)
    }
  }, [auth.id > 0])

  // 收件者名稱+寫進訂單資訊
  const nameRef = useRef()
  const [name, setName] = useState()
  const handleName = (e) => {
    const name = e.target.value
    setName(name)
    setOrder((prevOrder) => ({ ...prevOrder, recipient_name: name }))
  }
  // 收件者電話+寫進訂單資訊
  const phoneRef = useRef()
  const [phone, setPhone] = useState()
  const handlePhone = (e) => {
    const phone = e.target.value
    setPhone(phone)
    setOrder((prevOrder) => ({ ...prevOrder, recipient_phone: phone }))
  }
  // 收件者地址+寫進訂單資訊
  const addressRef = useRef()
  const [address, setAddress] = useState()
  const handleAddress = (e) => {
    const address = e.target.value
    setAddress(address)
    setOrder((prevOrder) => ({ ...prevOrder, recipient_address: address }))
  }
  // 付款方式+寫進訂單資訊
  const [payment, setPayment] = useState()
  const handlePayment = (e) => {
    const payment = e.target.id
    if (payment == 'creditCard') {
      setPayment(payment)
      setOrder((prevOrder) => ({ ...prevOrder, payment_method: '信用卡' }))
    } else if (payment == 'cashOnDelivery') {
      setPayment(payment)
      setOrder((prevOrder) => ({ ...prevOrder, payment_method: '貨到付款' }))
    } else {
      setPayment(payment)
      setOrder((prevOrder) => ({ ...prevOrder, payment_method: payment }))
    }
  }
  // 使用者輸入優惠卷狀態
  const [coupon, setCoupon] = useState(null)
  const handleCoupon = (e) => {
    const couponcode = e.target.value.toUpperCase()
    setCoupon(couponcode)
    setOrder((prevOrder) => ({ ...prevOrder, couponcode: couponcode }))
  }

  // 按下確認去比對和資料表coupon是否有這個優惠卷
  // 並且忽略英文大小寫去比對
  const handleUseCoupon = () => {
    // 要有輸入值
    if (coupon !== '' && coupon !== null) {
      // 輸入的 在資料表中有找到相符的
      const matchedCoupon = receiveCoupon.find(
        (item) => item.coupon_code.toUpperCase() == coupon.toUpperCase()
      )
      if (matchedCoupon) {
        const [
          { coupon_discount, coupon_code, coupon_status, coupon_end_date, get },
        ] = receiveCoupon.filter((item) => item.coupon_code === coupon)
        if (get) {
          //檢查是否開放
          if (coupon_status == '1') {
            //檢查是否過期
            const currentDate = new Date()
            const couponEndDate = new Date(coupon_end_date)
            if (currentDate < couponEndDate) {
              if (coupon_code === 'QSGTN07623' && order.subtotal < 500) {
                toast.error('消費金額未達500無法使用')
              } else if (
                coupon_code === 'WELCOME520' &&
                order.subtotal < 1000
              ) {
                toast.error('消費金額未達1000無法使用')
              } else {
                setOrder((prevOrder) => ({
                  ...prevOrder,
                  coupondiscount: coupon_discount,
                }))
              }
            } else {
              toast.error('此張優惠卷無法使用!')
            }
          } else {
            toast.error('此張優惠卷不是開放狀態!')
          }
        } else {
          toast.error('你還未領取此張優惠卷!')
        }
      } else {
        toast.error('沒有此張優惠卷!')
      }
    } else {
      toast.error('你沒有輸入優惠卷!')
    }
  }

  // 發票方式
  const [invoice, setInvoice] = useState(null) //是否有填入載具
  const [vechSelected, setVechSelected] = useState('') //選擇的是電子還是載具
  const handleInvoice = (e) => {
    // 不管大小寫都轉換成大寫
    const text = e.target.value.toUpperCase()
    setInvoice(text)
    setOrder((prevOrder) => ({ ...prevOrder, invoice: text }))
  }

  const [check, setCheck] = useState([]) // 紀錄有選擇的購物車商品編號

  // 這是單選的寫法
  const handleCheck = (e) => {
    const value = e.target.value
    const isChecked = e.target.checked

    if (isChecked) {
      const numbers = value.split(',').map(Number)
      const newArray = [...check, ...numbers]
      setCheck(newArray)
    } else {
      const numbers = value.split(',').map(Number)
      const newArray = check.filter((item) => !numbers.includes(item))
      setCheck(newArray)
    }
  }
  // 這裡是全選的寫法
  const handleCheckAll = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      const allCartIds = cartItem.map((item) => item.cart_item_id)
      setCheck(allCartIds)
    } else {
      setCheck([])
    }
  }
  // 把有選擇到的商品加入到訂單資訊裡面
  useEffect(() => {
    setOrder((prevOrder) => ({ ...prevOrder, check: check }))
  }, [check])

  // linepay
  const linepay = async (cartItem) => {
    try {
      await axios
        .post(
          `${API_SERVER}/linepay`,
          { order: order, cartItem: cartItem },
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        .then((res) => {
          window.location.href = res.data
        })
        .catch((error) => {
          console.log('123123', error)
        })
    } catch (error) {
      console.log('456456', error)
    }
  }

  // 跳轉至完成畫面
  const handleCheckoutShop = (e) => {
    e.preventDefault()
    const hasError = errorMessage()
    if (!hasError) {
      setOrder((prevOrder) => ({ ...prevOrder, go: true }))

      Swal.fire({
        title: '確定要前往結帳嗎?',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定',
      }).then((result) => {
        if (result.isConfirmed) {
          if (payment === 'linePay') {
            linepay(cartItem)
          } else if (payment === 'creditCard') {
            toast.error('目前銀行正在維修中')
          } else if (payment === 'cashOnDelivery') {
            if (result.isConfirmed) {
              addOrder(cartItem)
              router.push('/order-established')
            }
          } else {
            toast.error('您未選擇付款方式')
          }
        }
      })
    }
  }

  // 幫忙跳錯誤訊息的東西
  const [errName, setErrName] = useState(false)
  const [errPH, setErrPH] = useState(false)
  const [errAD, setAD] = useState(false)

  const errorMessage = () => {
    // 假設沒有錯誤的資訊
    let hasError = false
    setErrName(false)
    setErrPH(false)
    setAD(false)
    // 先做資料驗證
    if (check.length === 0) {
      toast.error('您沒有選擇商品喔!!')
      hasError = true
    }
    if (cartItem.length === 0) {
      toast.error('購物車是空的喔!!')
      hasError = true
    }
    if (order.recipient_name == '') {
      setErrName(true)
      hasError = true
    }
    if (order.recipient_phone == '') {
      setErrPH(true)
      hasError = true
    }
    if (order.recipient_address == '') {
      setAD(true)
      hasError = true
    }
    if (vechSelected == '') {
      toast.error('請選擇發票方式!!')
      hasError = true
    }
    if ((invoice === '' || invoice === null) && vechSelected == 2) {
      hasError = true
      toast.error('請輸入載具號碼!!')
    }
    if (invoice) {
      const regex = /^\/[A-Z0-9]{7}$/
      if (!regex.test(invoice)) {
        hasError = true
        toast.error("載具輸入格式錯誤！應該為'/'後面為七碼英文與數字")
      }
    }

    return hasError
  }
  return (
    <>
      <div className={`container ${styles.progress_container}`}>
        <div className="row">
          <div className="medium-centered">
            <div className={styles.timeline}>
              <div className={styles.active} style={{ width: '0%' }}>
                <div className={styles.start}>
                  <span>確認訂單</span>
                </div>
              </div>
              <div className={styles.active} style={{ width: '20%' }}>
                <div className={styles.start}>
                  <span>訂單成立</span>
                </div>
              </div>
              <div className={styles.inactive} style={{ width: '20%' }}>
                <div className={styles.inactive_start}>
                  <span>訂單狀態</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="container mt-4">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      value={''}
                      id="checkAll"
                      className="form-check-input"
                      checked={check.length === cartItem.length ? true : false}
                      onChange={handleCheckAll}
                    />
                    全選
                  </th>
                  <th scope="col" className="text-center">
                    商品圖
                  </th>
                  <th scope="col" className="text-center">
                    商品名
                  </th>
                  <th scope="col" className="text-center">
                    單價
                  </th>
                  <th scope="col" className="text-center">
                    數量
                  </th>
                  <th scope="col" className="text-center">
                    小計
                  </th>
                  <th scope="col" className="text-center">
                    移除
                  </th>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </thead>

              {/* 商品項目 1 */}
              <Fortable check={check} handleCheck={handleCheck} />

              {/* 繼續其他商品項目... */}
            </table>
          </div>
        </div>
        <div className="container my-4">
          {/* 付款方式選擇區 */}
          <div className={`row mb-3 ${styles.custom_center}`}>
            <div className="col-md-3 d-flex flex-column align-items-center">
              <label
                className={`form-label text-center ${styles.padding_right} `}
                htmlFor="name"
              >
                <strong>付款方式</strong>
              </label>
              <div className={`form-check  ${styles.from_check}`}>
                <input
                  className={`form-check-input ${styles.form_check_input}`}
                  value={''}
                  type="radio"
                  name="paymentMethod"
                  id="linePay"
                  onChange={(e) => {
                    handlePayment(e)
                  }}
                />
                <label className="form-check-label " htmlFor="linePay">
                  LINE PAY
                </label>
              </div>
              <div className={`form-check ${styles.from_check}`}>
                <input
                  className={`form-check-input ${styles.form_check_input}`}
                  value={''}
                  type="radio"
                  name="paymentMethod"
                  id="creditCard"
                  onChange={(e) => {
                    handlePayment(e)
                  }}
                />
                <label className="form-check-label" htmlFor="creditCard">
                  信用卡
                </label>
              </div>
              <div className={`form-check ${styles.from_check}`}>
                <input
                  className={`form-check-input ${styles.form_check_input}`}
                  value={''}
                  type="radio"
                  name="paymentMethod"
                  id="cashOnDelivery"
                  onChange={(e) => {
                    handlePayment(e)
                  }}
                />
                <label className="form-check-label " htmlFor="cashOnDelivery">
                  貨到付款
                </label>
              </div>
            </div>
            <br />
            {/* 客戶資訊輸入區 */}

            <div className="col-md-3">
              <label className="form-label" htmlFor="recipient_name">
                收件人姓名:
                <input
                  ref={nameRef}
                  type="text"
                  className={`form-control  ${styles.form_control} `}
                  id="recipient_name"
                  name="recipient_name"
                  placeholder="請輸入姓名"
                  value={name}
                  onChange={(e) => {
                    handleName(e)
                  }}
                />
                <span>{errName ? '收件人姓名為必填' : ''}</span>
              </label>
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="recipient_phone">
                手機號碼/連絡電話:
                <input
                  ref={phoneRef}
                  type="text"
                  className={`form-control  ${styles.form_control}`}
                  id="recipient_phone"
                  name="recipient_phone"
                  placeholder="請輸入手機號碼或連絡電話"
                  value={phone}
                  onChange={(e) => {
                    handlePhone(e)
                  }}
                />
                <span>{errPH ? '手機號碼為必填' : ''}</span>
              </label>
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="recipient_address">
                收件人地址:
                <input
                  ref={addressRef}
                  type="text"
                  className={`form-control  ${styles.form_control}  `}
                  id="recipient_address"
                  name="recipient_address"
                  placeholder="請輸入地址"
                  value={address}
                  onChange={(e) => {
                    handleAddress(e)
                  }}
                />
                <span>{errAD ? '收件人地址為必填' : ''}</span>
              </label>
            </div>
          </div>

          {/* 發票選擇區 */}
          <div className="row mt-3">
            <div className="col-12">
              <label className="form-label" htmlFor="name">
                <strong>發票:</strong>
              </label>
              <div className="btn-group" role="group">
                <input
                  type="button"
                  className={`${styles.btn_outline_primary} btn ${
                    vechSelected == 1 ? styles.btn_focus : styles.btn_default
                  }`}
                  defaultValue="電子發票"
                  data-value={'1'}
                  onClick={(e) => {
                    setVechSelected(e.target.dataset.value)
                    setInvoice('')
                  }}
                />{' '}
              </div>

              <input
                type="button"
                className={`${styles.btn_outline_primary} btn ${
                  vechSelected == 2 ? styles.btn_focus : styles.btn_default
                }`}
                defaultValue="載具"
                data-value={'2'}
                onClick={(e) => {
                  setVechSelected(e.target.dataset.value)
                }}
              />
              {/* <input
                    type="button"
                    className={`${styles.btn_outline_primary} btn`}
                    defaultValue="LINE PAY"
                  /> */}
              <input
                type="text"
                className={`form-control ${styles.form_control}`}
                placeholder={vechSelected == '2' ? '請輸入載具號碼' : ''}
                onChange={(e) => {
                  handleInvoice(e)
                }}
                value={invoice}
                maxLength={8}
                disabled={vechSelected !== '2'}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* 購物車列表等內容 ... */}
            <div className="col-lg-12 order-lg-1 mt-2 mt-lg-0">
              {/* 優惠券輸入區 */}
              <Link
                href="/UserPage?coupons"
                className="mb-3 small text-primary"
              >
                是否前往領取...?
              </Link>
              <div className={`input-group mb-3 ${styles.input_group}`}>
                <input
                  type="text"
                  className={`form-control ${styles.form_control}`}
                  placeholder="優惠券代碼"
                  value={coupon}
                  onChange={(e) => {
                    handleCoupon(e)
                  }}
                />
                <button
                  className={`btn ${styles.btn} ${styles.btn_outline_primary}`}
                  type="button"
                  onClick={handleUseCoupon}
                >
                  使用
                </button>
              </div>
              {/* 費用明細 */}
              <Amo_table check={check} />
              {/* <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <span>123</span>
                  <strong>$1000</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <span>優惠折扣</span>
                  <strong>-$100</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <span>運費</span>
                  <strong>$50</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <span>付費總款</span>
                  <strong>$950</strong>
                </li>
              </ul> */}
              {/* 結帳繼續購物按鈕 */}
              <button
                className={`btn ${styles.btn_outline_primary} w-100 mb-2`}
                onClick={(e) => {
                  // router.push('/order-established')
                  handleCheckoutShop(e)
                }}
              >
                結帳
              </button>

              <button
                className={`btn ${styles.btn_outline_primary} w-100`}
                onClick={() => {
                  router.push('/Pet-poduct')
                }}
              >
                繼續購物
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* 吐司訊息 */}
      <Toaster />
      <section className="checkout_section"></section>
    </>
  )
}
