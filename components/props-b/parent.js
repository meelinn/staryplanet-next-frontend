import { useState } from 'react'
import ChildA from './child-a'
import ChildB from './child-b'

export default function Parent() {
  //const [pData, setPData] = useState('父母元件內部資料')

  // 準備一組狀態，讓子女B能回傳資料到父母來
  const [dataFromChild, setDataFromChild] = useState('')

  return (
    <>
      <h1>Parent</h1>
      {/* 子女A得到父母從子女B傳回父母的資料 */}
      <ChildA dataFromChild={dataFromChild} />
      {/* 傳送設定狀態用的函式給子女B */}
      <ChildB setDataFromChild={setDataFromChild} />
    </>
  )
}