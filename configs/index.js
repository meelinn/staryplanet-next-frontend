export const PORT = 3005
export const DEV = true

export const FRONT_END = 'http://localhost:3000'

export const API_SERVER = 'http://localhost:3005'

export const LOGIN_POST = `${API_SERVER}/login` // POST

//PET_INFO
export const PET_LIST = `${API_SERVER}/pet-info/api`
// PET_LIST = http://localhost:3001/pet-info/api
//搜尋: ?keyword=狗
//篩選: ?pet_type=狗&pet_color=黑

//pet-info/smiler?pet_color=灰&pet_type=貓
export const PET_SMILER = `${API_SERVER}/pet-info/smiler`

//http://localhost:3005/pet-info/jwt-pet-like/1
export const JWT_PET_LIKE = `${API_SERVER}/pet-info/jwt-pet-like` // GET

//我的最愛
export const FAVORITE_PET = `${API_SERVER}/favorite/pet` // GET
export const FAVORITE_PRODUCT = `${API_SERVER}/favorite/product` // GET
//優惠券
export const COUPON = `${API_SERVER}/coupon/api`
export const COUPON_ADD = `${API_SERVER}/coupon/add`

//aki
export const apiBaseUrl = 'http://localhost:3005/api'
export const avatarBaseUrl = 'http://localhost:3005/avatar'

export const IMG_PATH = '/img/products'

export const PRODUCT_LIST = `${API_SERVER}/product/api`

export const PRODUCT_NOP = `${API_SERVER}/product-nop/api`

export const PRODUCT_SMILER = `${API_SERVER}/product/smiler`

export const PRODUCT_ASC = `${API_SERVER}/product/orderbyASC?orderBy=priceLow`

export const PRODUCT_DESC = `${API_SERVER}/product/orderbyDESC?orderBy=priceHigh`

//http://localhost:3005/products/jwt-product-like/1
export const JWT_PRODUCT_LIKE = `${API_SERVER}/product/jwt-product-like` // GET

//會員
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt` // 登入, POST

export const FORGOT_PASSWORD = `${API_SERVER}/address-book/forgot-password`

export const RESET_PASSWORD = `${API_SERVER}/address-book/reset-password`

export const AB_LIST = `${API_SERVER}/address-book/api`
export const AB_ADD_POST = `${API_SERVER}/address-book/add` // POST

// 取得通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM}/${sid}`
export const AB_ITEM = `${API_SERVER}/address-book` // GET

// 修改通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM_UPDATE_PUT}/${sid}`
export const AB_ITEM_UPDATE_PUT = `${API_SERVER}/address-book/edit` // PUT

// 加入或移除 喜愛清單 "/like-toggle-jwt/:pid"
export const JWT_TOGGLE_LIKE = `${API_SERVER}/like-toggle-jwt` // GET

//JEFF

export const ORDER_LIST = `${API_SERVER}/orders/api`
export const ORDER_DETAIL = `${API_SERVER}/orders_detail/api`
export const ORDER_DETAIL_ADD = `${API_SERVER}/orders_detail/add`
export const ORDER_DETAIL_RECORD = `${API_SERVER}/orders_detail/record`
export const ORDER_ADD = `${API_SERVER}/orders/add`

export const ORDER_PRODUCT = `${API_SERVER}/product/api`
export const ORDER_SHOPPING_CART = `${API_SERVER}/shopping_cart/api`

export const ORDER_SHOPPING_CART2 = `${API_SERVER}/shopping_cart2/api`
export const SHOPPING_CART_ADD = `${API_SERVER}/shopping_cart/add`
export const ORDER_HOSPITAL = `${API_SERVER}/hospital/api`
export const ORDER_INSURANCE = `${API_SERVER}/insurance/api`

// AB_ITEM_DELETE: `${AB_ITEM_DELETE}/17`
export const AB_ITEM_DELETE = `${API_SERVER}/address-book` // DELETE
