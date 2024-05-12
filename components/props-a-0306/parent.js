import React from 'react'
import Child from './child'

export default function Parent() {
  return (
    <>
      <h3>Parent(父母元件)</h3>
      {/* 父母元件可以用類似HTML屬性給定值的語法，傳遞任何類型資料給子女元件 */}

      <Child
        title="學 React"
        price={99}
        hasStock={false}
        sum={(x, y) => x + y}
      />
      <hr />
      <Child />
    </>
  )
}