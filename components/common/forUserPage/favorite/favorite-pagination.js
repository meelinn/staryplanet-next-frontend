import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import paginationStyles from '@/styles/adoption/pagination.module.css'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

export default function FavoritePagination({ data, qs }) {
  const [allPage, setAllPage] = useState(data.page)

  function getCurrentPageNumber() {
    const currentPage = parseInt(qs.page) || 1 // 默认为第 1 页
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
            <Link
              href={`?favorite=${qs.favorite}&page=${Math.max(
                currentPage - 1,
                1
              )}`}
            >
              <IoIosArrowBack />
            </Link>
          </li>

          <li
            className={
              currentPage === 1 ? paginationStyles['pagination-is-active'] : ''
            }
          >
            <Link
              className="page-link"
              href={`?favorite=${qs.favorite}&page=1`}
            >
              1
            </Link>
          </li>
          {data.totalPages > 1 &&
            Array(data.totalPages - 1)
              .fill(1)
              .map((_, index) => {
                const pageNumber = index + 2
                const usp = new URLSearchParams({ ...qs, page: pageNumber })
                const activeClass =
                  pageNumber === currentPage
                    ? paginationStyles['pagination-is-active']
                    : ''
                return (
                  <li key={pageNumber} className={activeClass}>
                    <Link className="page-link" href={`?${usp}`}>
                      {pageNumber}
                    </Link>
                  </li>
                )
              })}

          {/* 结束 */}
          <li>
            <Link
              href={`?favorite=${qs.favorite}&page=${Math.min(
                currentPage + 1,
                data.totalPages
              )}`}
            >
              <IoIosArrowForward />
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
