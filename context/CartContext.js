import axios from 'axios'
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { API_SERVER } from '@/configs'
// 創建一個 React Context，這是用於在組件之間共享資料的方法。
const CartContext = createContext()

// 定義一個 CartProvider 組件，這個組件使用 useReducer 來管理購物車狀態並提供給其子組件。
export const CartProvider = ({ children }) => {
  const authname = 'team3-auth'
  // 儲存這個會員的購物車資訊
  const [cartItem, setCartItem] = useState([])
  // 商品總和的總價
  const [total, setTotal] = useState()

  // 進入後端向資料庫取出此會員的購物車資訊
  const readItem = async (id) => {
    console.log()
    try {
      const { data } = await axios.get(`${API_SERVER}/cart/${id}`)
      setCartItem(data)
    } catch {
      console.log('error')
    }
  }
  // 進入後端向資料庫刪除所點擊到的商品編號
  const deleteItem = async (id, userid) => {
    try {
      await axios.delete(`${API_SERVER}/cart/${id}`)
      toast.success('已刪除！')
      readItem(userid)
    } catch {
      console.log('error')
    }
  }
  // 進入後端向資料庫更新所點擊到的商品數量
  const updateItem = async (data) => {
    try {
      await axios.patch(`${API_SERVER}/cart/${data.userid}`, { data })
      readItem(data.userid)
    } catch {
      console.log('error')
    }
  }
  // 進入後端把所選的商品加入購物車資料表
  const addCart = async (id, count, userid) => {
    // itemid是從component/product-info/number那邊的addCart(router.query.product_id,number)帶入的
    // count同上
    if (userid) {
      // if (user) {
      //把取到的資料變成自己定義的物件格式data ↓
      const data = {
        itemalldata: cartItem,
        userid: userid,
        itemid: id,
        count: count,
      }
      try {
        await axios.post(`${API_SERVER}/cart`, { data })
        toast.success('加入購物車成功！')
        readItem()
      } catch {
        console.log('error')
      }
    } else {
      toast.error('尚未登入')
    }
  }

  return (
    <CartContext.Provider
      value={{
        total,
        cartItem,
        setCartItem,
        updateItem,
        deleteItem,
        addCart,
        readItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 定義一個自定義 Hook `useCart`，這個 Hook 使組件可以訪問 CartContext 的值。
export const useCart = () => useContext(CartContext)
