import React from 'react'
import Child from './child'

export default function Parent() {
  // 解構賦值 + 其餘運算子說明
  const oa = { x: 1, y: 2, z: 3 }
  const { x: a, ...ob } = oa
  // ob 會得到剩下的屬性值 (類似拆解出子元件)
  console.log(a, ob)

  return (
    <>
      <h3>Parent(父母元件)</h3>
      {/* 父母元件可以用類似HTML屬性給定值的語法，傳遞任何類型資料給子女元件 */}

      <Child
        title="學 React"
        price={99}
        hasStock={false}
        sum={(x, y) => x + y}
        aa={[1, 2, 3]}
        obj={{ a: 1, b: 2 }}
        a={7}
        b={8}
        c={9}
      />
      <hr />
      {/* 只會依序檢查，只會回應檢查到的第一個問題而已，後面就不檢查了 */}
      <Child title={123} price={false} hasStock={[1, 2, 3]} />
    </>
  )
}
