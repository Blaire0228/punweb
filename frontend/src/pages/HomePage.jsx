import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import PunCard from '../components/PunCard';

const HomePage = () => {
  const navigate = useNavigate();

  // 1. 定義狀態：puns (資料), loading (載入中), searchTerm (搜尋關鍵字)
  const [puns, setPuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 使用 useEffect 去後端抓資料
  useEffect(() => {
    fetch('http://localhost:8080/puns')
      .then(response => {
        if (!response.ok) {
          throw new Error('網路回應不正常');
        }
        return response.json();
      })
      .then(data => {
        console.log("從後端獲取的資料:", data);
        setPuns(data); // 更新資料狀態
        setLoading(false); // 關閉載入中狀態
      })
      .catch(error => {
        console.error("無法取得資料:", error);
        setLoading(false); // 發生錯誤也要關閉 loading，不然會一直轉圈圈
      });
  }, []); // 空陣列代表只在第一次載入時執行

  // 3. 處理搜尋 (這裡先做簡單的「前端篩選」)
  // 如果有輸入關鍵字，就過濾 puns；如果沒有，就顯示全部
  const displayedPuns = puns.filter(pun =>
    pun.content.toLowerCase().includes(searchTerm.toLowerCase())
    // 注意：如果你的後端資料有 title 欄位，也可以加上 || pun.title.includes(...)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("正在搜尋:", searchTerm);
    // 因為上面已經用了 displayedPuns 即時過濾，這裡其實不需要額外邏輯
    // 但如果要改接「後端搜尋 API」，就會寫在這裡
  };

  return (
    <Layout>
      {/* 搜尋欄 */}
      <form onSubmit={handleSearch} className="relative mb-10 group">
        <input
          type="text"
          placeholder="輸入關鍵字搜尋笑話..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-6 rounded-full border-2 border-gray-300 shadow-sm text-lg focus:outline-none focus:border-[#8AB65D] focus:ring-1 focus:ring-[#8AB65D] transition"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 bg-[#8AB65D] w-16 rounded-full flex items-center justify-center text-white hover:opacity-90 transition"
        >
          <Search />
        </button>
      </form>

      {/* 列表區域 */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          {searchTerm ? `搜尋結果 (${displayedPuns.length} 筆)` : "熱門諧音梗"}
        </h2>

        {/* 4. 根據 Loading 狀態顯示不同內容 */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">資料載入中...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedPuns.length > 0 ? (
              displayedPuns.map(pun => (
                <PunCard
                  key={pun.id}
                  id={pun.id}
                  title={pun.title || `${pun.content}`} // 如果後端沒回傳 title，暫時顯示 ID
                  tags={pun.tags}
                  isStarred={pun.isStarred || false} // 預設給 false
                  onClick={() => navigate(`/detail/${pun.id}`)}
                />
              ))
            ) : (
              <p className="text-gray-500">找不到相關的笑話。</p>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;