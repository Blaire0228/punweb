import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 1. 引入 useParams
import { ArrowLeft, Star } from 'lucide-react';
import Layout from '../components/Layout';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 2. 從網址抓取 id (例如 /detail/5，id 就是 5)

  // 3. 定義狀態：存資料、載入中、錯誤訊息
  const [pun, setPun] = useState(null);
  const [loading, setLoading] = useState(true);

  // 4. 頁面載入時，去跟後端要這筆資料
  useEffect(() => {
    // 記得確認你的後端 Port 是 8080
    fetch(`http://localhost:8080/puns/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('找不到這則笑話或是網路錯誤');
        }
        return response.json();
      })
      .then(data => {
        console.log("拿到單筆資料:", data);
        setPun(data); // 把後端傳回來的 {id: 1, title: "...", content: "..."} 存起來
        setLoading(false);
      })
      .catch(error => {
        console.error("發生錯誤:", error);
        setLoading(false);
      });
  }, [id]); // 當 id 改變時重新抓取

  // 5. 處理載入中或找不到資料的狀況
  if (loading) return <Layout><div className="p-10 text-center">載入中...</div></Layout>;
  if (!pun) return <Layout><div className="p-10 text-center">找不到這則笑話</div></Layout>;

  return (
    <Layout>
      <div className="relative pt-6 px-2 md:px-0">

        {/* 返回按鈕 */}
        <button
          onClick={() => navigate(-1)}
          className="absolute -top-1 -left-2 md:-left-4 bg-[#D09E86] p-2 rounded-lg border-2 border-black/20 shadow-md hover:brightness-110 active:scale-95 transition z-10"
        >
          <ArrowLeft className="text-gray-900 w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* 內容卡片 */}
        <div className="bg-[#FDFBF6] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-12 min-h-[400px] flex flex-col md:flex-row gap-8 relative border border-gray-100/50">

          {/* 收藏星星 (根據後端 isStarred 顯示顏色) */}
          <button className="absolute top-6 right-6 transition">
             <Star
               className={`w-8 h-8 ${pun.isStarred ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-300"}`}
             />
          </button>

          {/* 左側：文字區 */}
          <div className="flex-1 flex flex-col gap-6">
            {/* 標題 (如果後端沒標題，就用 ID 代替) */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
              {pun.title || `${pun.content}`}
            </h1>

            {/* 標籤區：因為後端還沒有 Tags 欄位，我們先顯示假的或隱藏 */}
            <div className="flex flex-wrap gap-3">
                {/* 這裡先寫死，等你後端加了 tags 欄位後，改成 pun.tags?.map(...) */}
                <span className="bg-white px-4 py-1.5 rounded-md shadow-sm text-gray-500 text-sm font-medium border border-gray-100">
                  {pun.title || `${pun.tags}`}
                </span>
            </div>

            {/* 內文 */}
            <div className="pt-4 md:pt-8">
               <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
                 {pun.description}
               </p>
               <p className="mt-4 text-sm text-gray-400">
                 作者: {pun.createdBy || "匿名"}
               </p>
            </div>
          </div>

          {/* 右側：圖片區 (後端目前沒圖片，先維持預設框) */}
          <div className="w-full md:w-1/3 aspect-square md:aspect-auto md:h-auto bg-gray-300/50 rounded-lg flex items-center justify-center overflow-hidden relative group">
             <div className="text-gray-500 font-bold text-lg flex flex-col items-center">
                 <span>暫無圖片</span>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;