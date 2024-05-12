import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import styles from '../../styles/order-delivery.module.css'
import axios from 'axios'
import { useTotal } from '@/context/TotalContext'
export default function Del_table() {
  const { setTotal } = useTotal()
  // 用 useContext 來訪問 TotalContext
  // ... 略去其他 state 定義
  const [data, setData] = useState({
    success: false, // 表示 API 请求是否成功
    page: 0, // 当前的页码
    totalPages: 0, // 总页数
    rows: [], // 存储订单数据的数组
  })

  const updateTotalPrice = useCallback(() => {
    const newTotal = data.rows.reduce((sum, product) => {
      return sum + Number(product.total_price) * Number(product.order_quantity)
    }, 0)

    setTotal(newTotal) // 使用 context 的 setTotal 更新总金额
  }, [data.rows, setTotal])
  /*這段代碼中的 useEffect 函數用來處理 React 組件的副作用，具體的副作用包括：
1.	資料獲取：透過 axios.get 向 http://localhost:3001/orders/api 發送異步網絡請求，從伺服器獲取訂單資料。這個網路請求是副作用的一部分，因為它影響了元件外部的系統（即伺服器）。
2.	狀態更新：當網路請求成功時，用從伺服器接收到的資料更新元件的狀態。這個狀態更新儘管是元件內部的，但因為它是由非同步作業觸發的，所以它是副作用的結果。
3.	錯誤處理：如果網路請求失敗，副作用會捕獲錯誤，並更新元件的狀態，防止整個元件因為錯誤的資料而出現問題。*/
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // 使用 axios 發送 GET 請求到指定的 API 端點
        const response = await axios.get('http://localhost:3005/orders/api')
        const processedData = response.data.rows.map((product) => ({
          ...product,
          order_quantity: Number(product.order_quantity) || 1, // 初始化每个产品的订单数量为1
          total_price: Number(product.total_price) || 0, // 初始总价等于产品价格
        }))

        // 如果請求成功，使用回應資料更新元件的狀態
        setData({ ...response.data, rows: processedData, success: true }) // 假設後端返回的資料結構與data狀態匹配
      } catch (error) {
        // 如果請求過程中發生錯誤，列印錯誤資訊到控制台
        console.error('Error fetching order details:', error)
        // 並設置 data 狀態的 rows 為一個空陣列，保證元件不會因錯誤資料而崩潰
        setData({ success: false, rows: [] })
      }
    }
    fetchOrderDetails()
  }, []) // 依赖数组为空，只在组件挂载时执行一次
  // 首次加载组件时，获取订单数据
  // 調用 fetchOrderDetails 函數，開始資料獲取過程
  // 使用 useEffect 钩子来处理组件加载后的副作用
  useEffect(() => {
    updateTotalPrice() // 當 data.rows 更新時重新計算總金額
  }, [data.rows, updateTotalPrice])
  // 定義一個非同步函數 fetchOrderDetails，用於從後端API獲取訂單資料

  return (
    <>
      <tbody>
        {/* 商品項目 1 */}
        {data.rows && data.rows.length > 0 ? (
          // 如果条件为真，则执行后面的代码
          data.rows.map((v) => (
            // 首先檢查 data.rows 是否存在
            // 這是為了防止在 data 還沒有被正確設置（例如初始狀態或資料還未從API載入完畢）時訪問不存在的屬性而導致錯誤
            // 如果 data.rows 存在，再檢查 data.rows 是否有元素（即長度大於0）
            // 這是為了確保陣列不是空的，空陣列表示沒有資料需要渲染
            // 如果 data.rows 存在且其長度大於0，說明有資料需要被渲染
            // 接下來的代碼塊將用於渲染資料
            // 如果 data.rows 不存在，或者 data.rows 存在但長度為0，說明沒有資料需要被渲染
            // 這時可以渲染一些提示資訊，比如“No data available”

            <tr key={v.orders_id}>
              <td className="align-middle">
                <div className="d-flex justify-content-center">
                  <Image
                    src="/img/1.png" // 確保路徑正確
                    className={styles.img_fluid}
                    alt="商品1"
                    width={150} // 指定寬度
                    height={150} // 指定高度
                  />
                </div>
              </td>
              <td className="align-middle text-center"> {v.member_id}</td>
              <td className="align-middle text-center"> {v.total_price}</td>
              <td className="align-middle text-center"> {v.orders_id}</td>
              <td className="align-middle text-center">{v.member_id}</td>
            </tr>
          ))
        ) : (
          // 如果条件为假，则执行这部分代码
          <tr>
            <td colSpan="5">沒有數據可以使用</td>
          </tr>
        )}
      </tbody>
    </>
  )
}
