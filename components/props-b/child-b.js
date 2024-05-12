import { useState, useEffect } from 'react'

// 從屬性得到一個可以設定資料給父母元件的函式(某個狀態的設定函式)
export default function ChildB({ setDataFromChild = () => {} }) {
  const [cData, setCData] = useState('子女B元件內部資料')

  // 選擇2: 元件一開始呈現渲染後執行
  useEffect(() => {
    // 如果要一呈現渲染(render)時就送資料回父母元件，要寫在useEffect裡才行
    // 因為設定狀態的函式本身有副作用，元件的函式是純函式，不能直接執行
    setDataFromChild(cData)
  }, [])

  return (
    <>
      <h2>Child B</h2>
      {/* 選擇1: 觸發事件後在事件處理函式中執行 */}
      {/* <button
        onClick={() => {
          // 利用這個從父母來的設定狀態函式，送資料給父母元件
          setDataFromChild(cData)
        }}
      >
        送資料給父母
      </button> */}
    </>
  )
}
