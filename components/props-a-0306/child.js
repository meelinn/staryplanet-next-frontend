import React from 'react'

// 子女元件可以從函式的傳入參數中接收從父母元件傳遞來的值，props值必定是一個物件值
// 傳入參數, 解構賦值語法(直接在傳入時, 提取所有屬性值個別使用)
export default function Child({
  title = '我會了',
  price = 0,
  hasStock = false,
  sum = () => {},
}) {
  // console.log(props)
  return (
    <>
      <h3>Child(子女元件)</h3>
      <p>title: {title}</p>
      <p>price: {price}</p>
      {/* 布林值在 JSX 語法不會出現 */}
      <p>hasStock: {hasStock ? 'true' : 'false'}</p>
      <p>sum(1,2): {sum(1, 2)}</p>
    </>
  )
}
