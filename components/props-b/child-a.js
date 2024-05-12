import React from 'react'

export default function ChildA({ dataFromChild = '' }) {
  return (
    <>
      <h2>Child A</h2>
      <p>來自子女B的資料: {dataFromChild}</p>
    </>
  )
}