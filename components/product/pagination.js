import React, { useState, useEffect } from 'react'
import paginationStyles from '@/styles/product/pagination.module.css'
import Link from 'next/link'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

export default function AdoptionPagination({ data, qs }) {
  const [allPage, setAllPage] = useState(data.page)
  function getCurrentPageNumber() {
    const currentPage = parseInt(qs.page) || 1 // 默认为第一页
    return currentPage
  }
  const currentPage = getCurrentPageNumber()

  return (
    <>
      <div
        className={`${paginationStyles['pagination']} ${paginationStyles['p1']}`}
      >
        <ul className="justify-content-center">
          <li>
            <Link href={`?page=${Math.max(currentPage - 1, 1)}`}>
              <IoIosArrowBack />
            </Link>
          </li>

          {Array(data.totalPages)
            .fill(1)
            .map((v, i) => {
              const p = allPage + i + 1
              if (p < 1 || p > data.totalPages) return null
              const activeClass =
                p === data.page ? paginationStyles['pagination-is-active'] : ''
              const usp = new URLSearchParams({ ...qs, page: p })
              return (
                <li className={`${activeClass}`} key={p}>
                  <Link className="page-link" href={`?${usp}`}>
                    {p}
                  </Link>
                </li>
              )
            })}

          {/*頁數結束 */}
          <li>
            <Link href={`?page=${Math.min(currentPage + 1, data.totalPages)}`}>
              <IoIosArrowForward />
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
