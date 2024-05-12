import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_SERVER, PRODUCT_LIST } from '@/configs'
import { PRODUCT_ASC, PRODUCT_DESC } from '@/configs'
import Link from 'next/link'
//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { MdClose } from 'react-icons/md'
import { FaDumbbell } from 'react-icons/fa6'
import { TbZoomMoney, TbShirtSport, TbCup, TbShoppingBag } from 'react-icons/tb'
//style
import paginationStyles from '@/styles/product/pagination.module.css'
import contentStyles from '@/styles/product/Adoption-content.module.css'
import cardStyles from '@/styles/product/card.module.css'
import accordionStyles from '@/styles/product/accordion.module.css'
import SellerStyles from '@/styles/product/best-seller.module.css'
import adoptionStyles from '@/styles/product/Adoption.module.css'
//component
import Pagination from '@/components/product/pagination'
import ProductCard from '@/components/product/product-card'
import ProductCardnop from '@/components/product/product-card-nop'
import Dropdown from '@/components/product/product-info/dropdown'

//style群組
const SearchIcon = () => <FontAwesomeIcon icon={faSearch} />

const Product = () => {
  //這邊不要刪，手風琴
  const [activeTabs, setActiveTabs] = useState({})

  const toggleTab = (tabId) => {
    setActiveTabs((prevActiveTabs) => ({
      ...prevActiveTabs,
      [tabId]: !prevActiveTabs[tabId],
    }))
  }
  const router = useRouter()

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [], //列表資料
  })

  //搜尋
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
  useEffect(() => {
    if (router.isReady && !router.query.sort) {
      console.log(location.search) //原生JS:location.href ; location.search 會出現參數
      fetch(`${PRODUCT_LIST}${location.search}`)
        // /api${location.search}
        .then((r) => r.json())
        .then((dataObj) => {
          setData(dataObj)
          console.log(data.rows) //[]
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [router.query, router.isReady])
  console.log(router.query) //{}
  // 取得 query string 的資料
  const qs = { ...router.query }
  console.log(qs) //page: '6'
  console.log(data)

  const fetchData = async () => {
    const { sort, page = 1 } = router.query
    const apiUrl = sort === 'asc' ? PRODUCT_ASC : PRODUCT_DESC // 根據排序方式選擇相應的 API URL
    try {
      const response = await fetch(apiUrl + '&page=' + page)
      const responseData = await response.json()
      setData(responseData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSortChange = async (sortOrder) => {
    await router.push({
      pathname: router.pathname,
      query: { sort: sortOrder },
    })
    //fetchData() // 更新排序後重新載入數據
  }

  // 排序改變時的處理函數
  useEffect(() => {
    if (router.isReady && router.query.sort) {
      fetchData() // 初始化載入數據
    }
  }, [router.query, router.isReady])

  //
  fetch('/api')
    .then((response) => response.json())
    .then((data) => {
      // 处理从后端返回的数据
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
  return (
    <div>
      {/* banner開始 */}
      <div className={adoptionStyles['A-banner-frame']}>
        <div className={adoptionStyles['A-banner']}>
          <div>
            <p
              className={adoptionStyles['A-banner-text']}
              style={{ cursor: 'default' }}
            >
              毛毛商城
            </p>
          </div>
        </div>
      </div>
      {/* banner結束 */}

      {/* 認養頁面開始 */}
      <div className="container">
        <div className="row ">
          {/* 左側欄開始 */}

          <div className="col-12 col-md-3 mr-md-4">
            <nav
              className={`mt-5 ${contentStyles['A-breadcrumb']}`}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a className={contentStyles['A-breadcrumb-li']} href="/">
                    Home
                  </a>
                </li>
                <li
                  className={`${contentStyles['A-breadcrumb-li2']} active breadcrumb-item `}
                  aria-current="page"
                >
                  毛毛商城
                </li>
              </ol>
            </nav>

            <div className={`container ${adoptionStyles['no-padding-left']}`}>
              <div className="mt-2 row">
                <div className="input-group col-sm-12">
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
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div
                  className={`col-sm-12 ${adoptionStyles['no-padding-left']}`}
                >
                  {/* 左側 accordion 開始 */}
                  <section className={accordionStyles['A-accordion']}>
                    <div className={accordionStyles['tab']}>
                      <input
                        type="checkbox"
                        id="rd1"
                        checked={activeTabs['rd1']}
                        onChange={() => toggleTab('rd1')}
                      />
                      <label
                        htmlFor="rd1"
                        className={accordionStyles['tab__label']}
                      >
                        商品分類
                      </label>
                      <div
                        className={`${accordionStyles['tab__content']} ${
                          activeTabs['rd1'] ? 'active' : ''
                        }`}
                      >
                        <Link
                          href={``}
                          className={SellerStyles['all-product-link']}
                        >
                          全部商品{' '}
                          <span className={SellerStyles['all-product-span']}>
                            (51)
                          </span>
                        </Link>

                        <Link
                          href={`/Pet-poduct/?category=cat`}
                          style={{ textDecoration: 'none' }}
                        >
                          <li className={SellerStyles['cate-name']}>
                            貓咪商品
                            <span>(32)</span>
                          </li>
                        </Link>
                        <Link
                          href={`/Pet-poduct/?category=dog`}
                          style={{ textDecoration: 'none' }}
                        >
                          <li className={SellerStyles['cate-name']}>
                            狗狗商品
                            <span>(19)</span>
                          </li>
                        </Link>
                        <Link
                          href={`/Pet-poduct/?category=daily necessities`}
                          style={{ textDecoration: 'none' }}
                        >
                          <li className={SellerStyles['cate-name']}>
                            生活用品
                            <span>(20)</span>
                          </li>
                        </Link>
                        <Link
                          href={`/Pet-poduct/?category=Toy`}
                          style={{ textDecoration: 'none' }}
                        >
                          <li className={SellerStyles['cate-name']}>
                            抓板玩具
                            <span>(7)</span>
                          </li>
                        </Link>
                        <Link
                          href={`/Pet-poduct/?category=Healthy Food`}
                          style={{ textDecoration: 'none' }}
                        >
                          <li className={SellerStyles['cate-name']}>
                            營養保健
                            <span>(4)</span>
                          </li>
                        </Link>
                        <Link
                          href={`/Pet-poduct/?category=Staple food`}
                          style={{ textDecoration: 'none' }}
                        >
                          <li className={SellerStyles['cate-name']}>
                            寵物主食
                            <span>(9)</span>
                          </li>
                        </Link>
                        <Link
                          href={`/Pet-poduct/?category=Non food`}
                          style={{ textDecoration: 'none' }}
                        >
                          <li className={SellerStyles['cate-name']}>
                            零食點心
                            <span>(11)</span>
                          </li>
                        </Link>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          {/* 卡片開始 */}
          <div className={`col-12 col-md-9 ${cardStyles['A-right']}`}>
            <div className="row  justify-content-content">
              <Dropdown onSortChange={handleSortChange} />
              <ProductCard data={data} />
            </div>
          </div>
        </div>
        {/* 卡片結束 */}
      </div>
      {/* 認養頁面結束 */}

      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-3 mr-md-4">
            <div className={paginationStyles['Pagination-c']}>
              {!data || !Array.isArray(data.rows) ? (
                <div>loading...</div>
              ) : (
                <Pagination data={data} qs={qs} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className={`row align-items-center justify-content-content ${SellerStyles['sellercontainer']}`}
        >
          <div className={`text-center ${SellerStyles['sellerH2']}`}>
            <h2>熱銷排行榜</h2>
          </div>
          <div className="row  justify-content-content">
            <div className="col">
              <div
                style={{
                  display: 'flex',
                  margin: '5px',
                }}
              >
                {!data || !Array.isArray(data.rows) ? (
                  <div>loading...</div>
                ) : (
                  <ProductCardnop data={data} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
