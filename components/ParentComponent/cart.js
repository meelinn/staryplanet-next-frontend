import React, { useState } from 'react'
import OrderForm from '../../pages/order-form/index'
import ForTable from '../order-form/for_table'

function ParentComponent() {
  const [cartItems, setCartItems] = useState([])

  return (
    <>
      <ForTable setCartItems={setCartItems} />
      <OrderForm cartItems={cartItems} />
    </>
  )
}
