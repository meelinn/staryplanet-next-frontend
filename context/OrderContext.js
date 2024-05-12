import axios from 'axios'
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from 'react'
import { API_SERVER } from '@/configs'
import toast from 'react-hot-toast'
const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const authname = 'team3-auth'
  const [userid, setUserid] = useState()
  const [order, setOrder] = useState({
    user: null,
    payment_method: '',
    couponcode: null,
    coupondiscount: 0,
    recipient_name: '',
    recipient_phone: '',
    recipient_address: '',
    fee: 45,
    invoice: null,
    subtotal: 0,
    total: 0,
    check: [],
    go: false,
  })

  // 使用者有領取的優惠卷
  const [receiveCoupon, setReceiveCoupon] = useState()

  const readCoupon = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${API_SERVER}/coupon/${id}`)
      setReceiveCoupon(data)
    } catch {
      console.log('error')
    }
  }, [])

  // 完成填寫後->新增訂單
  const addOrder = async (cartItem) => {
    try {
      await axios.post(`${API_SERVER}/order`, { order, cartItem })
    } catch {
      console.log('error')
    }
  }

  // 讀取此會員的所有訂單
  const [rOrder, setROrder] = useState()
  const readOrder = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${API_SERVER}/order/all/${id}`)
      setROrder(data)
    } catch {
      console.log('error')
    }
  }, [])

  // 只讀最新一筆
  const [orderdata, setOrderData] = useState()

  // 完成的訂單的資料
  const [rItem, setRItem] = useState()

  const readNewOrder = useCallback(async (id) => {
    const { data } = await axios.get(`${API_SERVER}/order/detail/${id}`)
    setRItem(data)
    let [newdata] = data
    setOrderData(newdata)
  }, [])

  return (
    <OrderContext.Provider
      value={{
        order,
        addOrder,
        setOrder,

        receiveCoupon,
        readCoupon,

        rOrder,
        readOrder,

        orderdata,
        rItem,
        readNewOrder,

        userid,
        setUserid,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
export const useOrder = () => useContext(OrderContext)
