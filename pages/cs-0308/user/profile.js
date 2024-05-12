import { useAuth } from '@/hooks/use-auth'
// 用於取代a元件的特別元件，可以在不同頁面保持住狀態
import Link from 'next/link'

export default function Profile() {
  const { auth } = useAuth()

  return (
    <>
      <h1>會員個人資料頁</h1>
      <hr />
      <p>id: {auth.userData.id}</p>
      <p>username: {auth.userData.username}</p>
      <hr />
      <Link href="/cs-0308/user/login">會員登入頁</Link>
    </>
  )
}