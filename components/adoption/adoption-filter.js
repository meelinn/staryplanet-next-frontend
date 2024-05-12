import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// css+icon
import accordionStyles from '@/styles/adoption/accordion.module.css'
import adoptionStyles from '@/styles/adoption/Adoption.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import accordion2Styles from '@/styles/adoption/accordion2.module.scss'
//components
import AdoptionFilterCheckboxOption from './adoption-filter-checkbox-option'
import AdoptionFilterAccordion from './adoption-filter-accordion'
import AdoptionSlider from './adoption-slider'
import { includes } from 'lodash'

import { API_SERVER, PET_LIST } from '@/configs'

export default function AdoptionFilter() {
  const router = useRouter()

  // const [data, setData] = useState([])
  // const [isChecked, setIsChecked] = useState(false)
  const [petGender, setPetGender] = useState([])
  const [petType, setPetType] = useState([])
  const [petColor, setPetColor] = useState([])
  const [shelterAddress, setShelterAddress] = useState([])
  const [petAge, setPetAge] = useState({ min: 1, max: 15 })

  //篩選 //http://localhost:3000/adoption?pet_gender=公&pet_color=黑
  const handleCheckboxChange = (e) => {
    // if (!e || !e.target) {
    //   return // 如果事件对象或目标不存在，提前返回避免错误
    // }
    // if (e.target.name === 'pet_gender') {
    //   if (petGender.includes(e.target.value)) {
    //     setPetGender(
    //       petGender.filter((v) => {
    //         return v !== e.target.value
    //       })
    //     )
    //     console.log(e.target.value)
    //   } else {
    //     console.log('string', e.target.value)
    //     setPetGender([...petGender, e.target.value])
    //     console.log(petGender)
    //   }
    // } else if (e.target.name === 'pet_type') {
    //   if (petType.includes(e.target.value)) {
    //     setPetType(
    //       petType.filter((v) => {
    //         return v !== e.target.value
    //       })
    //     )
    //     console.log(e.target.value)
    //   } else {
    //     console.log('string', e.target.value)
    //     setPetType([...petType, e.target.value])
    //   }
    // } else if (e.target.name === 'pet_color') {
    //   if (petColor.includes(e.target.value)) {
    //     setPetColor(
    //       petColor.filter((v) => {
    //         return v !== e.target.value
    //       })
    //     )
    //     console.log(e.target.value)
    //   } else {
    //     console.log('string', e.target.value)
    //     setPetColor([...petColor, e.target.value])
    //   }
    // } else if (e.target.name === 'shelter_address') {
    //   if (shelterAddress.includes(e.target.value)) {
    //     setShelterAddress(
    //       shelterAddress.filter((v) => {
    //         return v !== e.target.value
    //       })
    //     )
    //   } else {
    //     console.log('string', e.target.value)
    //     setShelterAddress([...shelterAddress, e.target.value])
    //   }
    // } else if (e.target.name === 'pet_age_min') {
    //   if (petAge.min.includes(e.target.value)) {
    //     setPetAge({ ...petAge, min: parseInt(e.target.value) })
    //   }
    // } else if (e.target.name === 'pet_age_max') {
    //   if (petAge.max.includes(e.target.value)) {
    //     setPetAge({ ...petAge, max: parseInt(e.target.value) })
    //   }
    // }

    switch (e.target.name) {
      case 'pet_gender':
        if (petGender.includes(e.target.value)) {
          setPetGender(petGender.filter((v) => v !== e.target.value))
          console.log(e.target.value)
        } else {
          console.log('string', e.target.value)
          setPetGender([...petGender, e.target.value])
          console.log(petGender)
        }
        break

      case 'pet_type':
        if (petType.includes(e.target.value)) {
          setPetType(petType.filter((v) => v !== e.target.value))
          console.log(e.target.value)
        } else {
          console.log('string', e.target.value)
          setPetType([...petType, e.target.value])
        }
        break

      case 'pet_color':
        if (petColor.includes(e.target.value)) {
          setPetColor(petColor.filter((v) => v !== e.target.value))
          console.log(e.target.value)
        } else {
          console.log('string', e.target.value)
          setPetColor([...petColor, e.target.value])
        }
        break

      case 'shelter_address':
        if (shelterAddress.includes(e.target.value)) {
          setShelterAddress(shelterAddress.filter((v) => v !== e.target.value))
        } else {
          console.log('string', e.target.value)
          setShelterAddress([...shelterAddress, e.target.value])
        }
        break

      // case 'pet_age_min':
      //   if (petAge.min.includes(e.target.value)) {
      //     setPetAge({ ...petAge, min: parseInt(e.target.value) })
      //   }
      //   break

      // case 'pet_age_max':
      //   if (petAge.max.includes(e.target.value)) {
      //     setPetAge({ ...petAge, max: parseInt(e.target.value) })
      //   }
      //   break

      default:
        break
    }
  }

  //解法:改成switch case
  //pet_age另外寫
  //使用https://www.npmjs.com/package/multi-range-slider-react

  // SELECT * FROM pet_info WHERE pet_age >= 12;

  useEffect(() => {
    console.log(location.search)
    let resultQuery = ''
    let resultQueryMark = '?'

    if (petGender.length > 0) {
      petGender.map((v) => (resultQuery += `pet_gender=${v}&`))
    }
    if (petType.length > 0) {
      petType.map((v) => (resultQuery += `pet_type=${v}&`))
    }
    if (petColor.length > 0) {
      petColor.map((v) => (resultQuery += `pet_color=${v}&`))
      console.log(resultQuery)
    }
    if (shelterAddress.length > 0) {
      shelterAddress.map((v) => (resultQuery += `shelter_address=${v}&`))
      console.log(resultQuery)
    }
    //  if (petAge.min !== 1 || petAge.max !== 15) {
    //     resultQuery += `pet_age_min=${petAge.min}&pet_age_max=${petAge.max}&`;
    //   }
    console.log(petAge.min, petAge.max)
    console.log(resultQuery)

    if (resultQuery) {
      router.push((resultQueryMark += resultQuery))
    } else {
      router.push(` `)
    }
  }, [petGender, petType, petColor, shelterAddress, petAge.min, petAge.max])

  //搜尋
  const SearchIcon = () => <FontAwesomeIcon icon={faSearch} />

  const onSearch = (e) => {
    e.preventDefault()
    let keyword = e.currentTarget.keyword?.value
    keyword = keyword.trim() // 去掉頭尾空白
    if (keyword) {
      router.push(`?keyword=${keyword}`)
    } else {
      router.push(`?`)
    }
  }

  return (
    <>
      <div className={`container ${adoptionStyles['no-padding-left']}`}>
        <div className="mt-2 row">
          <div className="input-group">
            <form className="d-flex" role="search" onSubmit={onSearch}>
              <input
                className={`form-control ${adoptionStyles['form-control']}`}
                type="search"
                placeholder="請輸入關鍵字..."
                aria-label="Search"
                name="keyword"
                defaultValue={router.query.keyword}
              />
              <button
                className={`btn ${adoptionStyles['btn-primary']}`}
                type="submit"
              >
                <SearchIcon />
              </button>
            </form>
            {/* <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className={`col-sm-12 ${adoptionStyles['no-padding-left']}`}>
            {/* 左側 accordion 開始 */}
            <div
              className={`accordion shadow ${accordion2Styles.accordion} mt-5`}
              id="accordionPanelsStayOpenExample"
            >
              {/* 性別 */}
              <AdoptionFilterAccordion title="性別" number={1}>
                <AdoptionFilterCheckboxOption
                  label="公"
                  value="公"
                  name="pet_gender"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="母"
                  value="母"
                  name="pet_gender"
                  onChange={handleCheckboxChange}
                />
              </AdoptionFilterAccordion>
              {/* 類別 */}
              <AdoptionFilterAccordion title="類別" number={2}>
                <AdoptionFilterCheckboxOption
                  label="狗"
                  value="狗"
                  name="pet_type"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="貓"
                  value="貓"
                  name="pet_type"
                  onChange={handleCheckboxChange}
                />
              </AdoptionFilterAccordion>
              {/* 年齡 */}
              {/* <AdoptionFilterAccordion title="年齡" number={3}>
                <AdoptionSlider
                  minAge={petAge.min}
                  maxAge={petAge.max}
                  minName="pet_age_min"
                  maxName="pet_age_max"
                  onChange={handleCheckboxChange}
                />
                {/* <AdoptionSlider
                  minAge={petAge.min}
                  maxAge={petAge.max}
                  minName="pet_age_min"
                  maxName="pet_age_max"
                  onChange={handleSliderChange}
                /> 
              </AdoptionFilterAccordion> */}
              {/* 地區 */}
              <AdoptionFilterAccordion title="地區" number={4}>
                <AdoptionFilterCheckboxOption
                  label="基隆市"
                  value="基隆市"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="宜蘭縣"
                  value="宜蘭縣"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="新北市"
                  value="新北市"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="桃園市"
                  value="桃園市"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="新竹縣"
                  value="新竹縣"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="雲林縣"
                  value="雲林縣"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="高雄市"
                  value="高雄市"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="臺東縣"
                  value="臺東縣"
                  name="shelter_address"
                  onChange={handleCheckboxChange}
                />
              </AdoptionFilterAccordion>
              {/* 毛色 */}
              <AdoptionFilterAccordion title="毛色" number={5}>
                <AdoptionFilterCheckboxOption
                  label="橘"
                  value="橘"
                  name="pet_color"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="棕"
                  value="棕"
                  name="pet_color"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="灰"
                  value="灰"
                  name="pet_color"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="黑"
                  value="黑"
                  name="pet_color"
                  onChange={handleCheckboxChange}
                />
                <AdoptionFilterCheckboxOption
                  label="白"
                  value="白"
                  name="pet_color"
                  onChange={handleCheckboxChange}
                />
              </AdoptionFilterAccordion>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
