import React from 'react'

export default function AdoptionOrderButton() {
  return (
    <>
      <div className="dropdown d-flex ">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          排序
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              時間由新到舊
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              時間由舊到新
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              年紀由大到小
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              年紀由小到大
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
