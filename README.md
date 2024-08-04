This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 毛毛星球-專案介紹

毛毛星球整合認養媒合和商城資源，為愛貓愛狗人士提供一個全方位的服務平台，從而促進流浪貓狗認養媒合配對、鼓勵認養並提供更優惠的毛孩商品給大眾。

1. **提升認知**：透過靜態的寵物領養資訊頁面，我們致力於增進公眾對於貓狗福利與保險重要性的認知，並推廣正確的寵物照護訊息。

2. **提供資源**：我們整合了毛孩所需的物質資源，通過搜尋篩選、熱銷排行、以及推薦相似產品，讓用戶可以快速找到適合自己毛孩的商品。

3. **提高機會**：我們與收容所合作，建立了一個媒合平台，透過使用篩選、推薦相似、以及我的最愛功能，增加了浪浪領養的機會，讓浪浪們能夠找到一個溫暖的家。

4. **整合服務**：我們將以上三方功能整合，建立了一系列的網站，提供資源、觀念和領養平台。

## 使用技術

- **前端技術**：
  - [Next.js](https://nextjs.org/)
  - [Bootstrap](https://getbootstrap.com/) 
  - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/)
  - [SCSS](https://sass-lang.com/)
  - [CSS Modules](https://github.com/css-modules/css-modules)

- **後端框架**：
  - [Express.js](https://expressjs.com/) 
  
- **資料庫**：
  - [MySQL](https://www.mongodb.com/)

- **UI/UX庫**： 
  - [Font Awesome](https://fontawesome.com/)
  - [react-icons](https://github.com/react-icons/react-icons)

## Demo

### 帶我回家 -  API得到資料、query篩選
![帶我回家 - API得到資料、query篩選](https://i.ibb.co/5cMwYh0/screencapture-localhost-3000-Adoption-2024-05-10-15-05-11.png)

### 我的最愛 - API得到資料、新增、刪除資料
![我的最愛 - API得到資料/新增/刪除資料](https://i.ibb.co/1LL1DBd/screencapture-localhost-3000-User-Page-2024-05-12-13-28-11.png)

### 優惠券 - API得到、新增資料
![優惠券- API得到、新增資料](https://i.ibb.co/2WwJWTN/screencapture-localhost-3000-User-Page-2024-05-10-15-03-41.png)

### 認養概念 - 靜態頁面
![認養概念 - 靜態頁面](https://i.ibb.co/DfHCyCN/screencapture-localhost-3000-concept-2024-05-10-14-58-58.png)

### 飼養知識 - 靜態頁面
![飼養知識 - 靜態頁面](https://i.ibb.co/7WswThh/screencapture-localhost-3000-concept-care-info-2024-05-10-14-59-50.png)

### DEMO展示影片 (請點擊圖片連結)
[![毛毛星球 - 個人功能DEMO展示](https://i.ibb.co/44mCF4f/demo.png)](https://www.youtube.com/watch?v=kjKh8RePQZk)


## 安裝指南

請確保搭配後端專案一起使用：[https://github.com/meelinn/staryplanet-express-backend](https://github.com/meelinn/staryplanet-express-backend)

MySQL資料庫：[https://drive.google.com/file/d/1FyDScZLCWKNXS0Lh77kQSP_kaS7YMAXK/view?usp=drive_link](https://drive.google.com/file/d/1FyDScZLCWKNXS0Lh77kQSP_kaS7YMAXK/view?usp=drive_link)

網站圖片資源： [https://drive.google.com/drive/folders/1Iiv_2shRV0lsXpR8wGTyWkOdz5i85d5q](https://drive.google.com/drive/folders/1Iiv_2shRV0lsXpR8wGTyWkOdz5i85d5q)

1. clone the project:
```bash
git clone https://github.com/meelinn/staryplanet-next-frontend
```

2. Navigate to the project directory:
```bash
cd staryplanet-next-frontend
```

3. Install the required dependencies:
```bash
npm install
```

4. Set up the database:
4.1 Create the database:
```sql
CREATE DATABASE team3;
``` 
4.2 Import the SQL file:
```bash
mysql -u username -p team3 < team3.sql
```

5. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) Please refer to the [API document](https://github.com/meelinn/staryplanet-express-backend/tree/main?tab=readme-ov-file#api-%E8%B7%AF%E7%94%B1) to obtain relevant information about API routes.
