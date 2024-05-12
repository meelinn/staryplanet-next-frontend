import { useEffect } from 'react'

// 父母元件 ===> 子女元件 決定是否要render是用淺比較(shallow compare)
// 屬性本身是個物件，所以會比較到第一層用參照(引用)相等性原則
export default function Child({ name, count }) {
  console.log('child render')

  // didMount+didUpdate
  // useEffect(() => {
  //   console.log('name改變了', name)
  // }, [name])

  useEffect(() => {
    console.log('count改變了', count)
  }, [count])

  // 只監聽一部份的props.count的變化
  useEffect(() => {
    console.log('count.total改變了', count.total)
  }, [count.total])
  // ^^^^^^^^^^^^^ 這裡的比較也是使用Object.is(或===)的參照(引用)相等性原則

  return (
    <>
      <h2>Child(子女)元件</h2>
      <p>total={count.total}</p>
      <p>name={name}</p>
    </>
  )
}