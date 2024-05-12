import React from 'react'
// 需要額外安裝prop-types套件(以前在react v15中為內建)
import PropTypes from 'prop-types'

// 子女元件可以從函式的傳入參數中接收從父母元件傳遞來的值，props值必定是一個物件值
// 傳入參數, 解構賦值語法(直接在傳入時, 提取所有屬性值個別使用)
// 以下是混合了"解構賦值 + 其實運算子 + 函式傳入預設值" x 3 種新的 ES6 特性
export default function Child({
  title = '我會了', // 這裡可以使用預設值的語法, 作為預設屬性之用
  price = 0,
  hasStock = false,
  sum = () => {},
  aa = [],
  obj = {},
  ...restProps
}) {
  // console.log(props)
  // 得到其他的(沒解構的)屬性值的物件
  console.log(restProps)
  return (
    <>
      <h3>Child(子女元件)</h3>
      <p>title: {title}</p>
      <p>price: {price}</p>
      {/* 布林值在 JSX 語法不會出現 */}
      <p>hasStock: {hasStock ? 'true' : 'false'}</p>
      <p>sum(1,2): {sum(1, 2)}</p>
      <p>aa: {JSON.stringify(aa)}</p>
      <p>obj: {JSON.stringify(obj)}</p>
    </>
  )
}

// 傳入的屬性值類型檢查，參考檢查項目如下
// https://zh-hans.legacy.reactjs.org/docs/typechecking-with-proptypes.html#proptypes
// 注意名稱有開頭大寫和小寫
Child.propTypes = {
  title: PropTypes.string.isRequired, // isRequired 必填;如果有預設值,實際必要檢查會無效
  price: PropTypes.number,
  hasStock: PropTypes.bool,
}
