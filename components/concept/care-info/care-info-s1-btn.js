import React from 'react'
import { GoTriangleRight } from 'react-icons/go'

export default function CareInfoS1Btn({ icon, text, onClick }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary fs-5 text-start p-4 text-secondary "
        onClick={onClick}
      >
        {/* <GoTriangleRight className="text-white  " /> */}
        <span className="mx-2"> {icon} </span>
        {text}
      </button>

      <style jsx>{`
         {
          /* .melin-s1-btn:after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 100px;
          background-color: #ffffff;
          clip-path: polygon(49% 35%, 0% 100%, 100% 100%);
        } */
        }
      `}</style>
    </>
  )
}
