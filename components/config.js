export const API_SERVER = 'http://localhost:3005'

export const LOGIN_POST = `${API_SERVER}/login` // POST

export const AB_LIST = `${API_SERVER}/address-book/api`
export const AB_ADD_POST = `${API_SERVER}/address-book/add` // POST

// AB_ITEM_DELETE: `${AB_ITEM_DELETE}/17`
export const AB_ITEM_DELETE = `${API_SERVER}/address-book` // DELETE

// 取得通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM}/${sid}`
export const AB_ITEM = `${API_SERVER}/address-book` // GET

// 修改通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM_UPDATE_PUT}/${sid}`
export const AB_ITEM_UPDATE_PUT = `${API_SERVER}/address-book/edit` // PUT

// *** JWT ***
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt` // 登入, POST

export const FORGOT_PASSWORD = `${API_SERVER}/address-book/forgot-password`

export const RESET_PASSWORD = `${API_SERVER}/address-book/reset-password`
