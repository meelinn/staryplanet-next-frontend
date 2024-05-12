import { useAuth } from '@/hooks/use-auth'
// 用於取代a元件的特別元件，可以在不同頁面保持住狀態
import Link from 'next/link'

export default function Login() {
  const { auth, login, logout } = useAuth()

  return (
    <>
      <h1>會員登入頁</h1>
      <hr />
      <p>目前登入狀態: {auth.isAuth ? '登入中' : '未登入'}</p>
      <p>
        <button
          onClick={() => {
            if (auth.isAuth) logout()
            else login()
          }}
        >
          {auth.isAuth ? '登出' : '登入'}
        </button>
      </p>
      <hr />
      <Link href="/cs-0308/user/profile">會員個人資料頁</Link>
    </>
  )
}