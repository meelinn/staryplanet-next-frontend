import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//css
import SellerStyles from '@/styles/product/best-seller.module.css'

export default function Dropdown({ onSortChange }) {
  const handleSort = (sortType) => {
    onSortChange(sortType)
  }

  return (
    <>
      <div className="dropdown">
        <button
          className={`btn dropdown-toggle ${SellerStyles['btnboder']}`}
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          排序
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <span className="dropdown-item" onClick={() => handleSort('desc')}>
              價格由高至低
            </span>
          </li>
          <li>
            <span className="dropdown-item" onClick={() => handleSort('asc')}>
              價格由低至高
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}
