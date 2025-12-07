import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown  } from 'lucide-react';
import Layout from '../components/Layout';
import PunCard from '../components/PunCard';

const HomePage = () => {
  const navigate = useNavigate();

  // 1. 定義狀態：puns (資料), loading (載入中), searchTerm (搜尋關鍵字)
  const [puns, setPuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
// 標籤相關
    // 儲存後端資料中可用的標籤列表
    const [availableTags, setAvailableTags] = useState([]);
    // 儲存使用者當前選擇的標籤，初始值為空字串
    const [selectedTag, setSelectedTag] = useState("");

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

        // 從所有 Pun 資料中收集並去重標籤
        const allTags = data.flatMap(pun => pun.tags || []);
        // 使用 Set 來去重，並轉回 Array
        const uniqueTags = Array.from(new Set(allTags));
        setAvailableTags(uniqueTags);

      })
      .catch(error => {
        console.error("無法取得資料:", error);
        setLoading(false); // 發生錯誤也要關閉 loading，不然會一直轉圈圈
      });
  }, []); // 空陣列代表只在第一次載入時執行

  // 3. 處理搜尋 (這裡先做簡單的「前端篩選」)
  // 如果有輸入關鍵字，就過濾 puns；如果沒有，就顯示全部
    const displayedPuns = puns.filter(pun =>{
        // 步驟 A: 檢查文字搜尋條件 (如果 searchTerm 有值，則必須符合)
        const textMatches = searchTerm === "" ||
            pun.content.toLowerCase().includes(searchTerm.toLowerCase());

        // 步驟 B: 檢查標籤篩選條件 (如果 selectedTag 有值，則必須符合)
        const tagMatches = selectedTag === "" ||
            (pun.tags && pun.tags.includes(selectedTag));

        // 步驟 C: 組合條件 -> 必須同時符合文字和標籤 (AND 邏輯)
        return textMatches && tagMatches;
    });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("正在搜尋:", searchTerm);
    // 因為上面已經用了 displayedPuns 即時過濾，這裡其實不需要額外邏輯
    // 但如果要改接「後端搜尋 API」，就會寫在這裡
  };

    const handleTagChange = (e) => { setSelectedTag(e.target.value); };

    // *** 根據選中的標籤顯示對應的灰色文字 ***
    const tagDisplay = selectedTag || "選擇標籤";


  return (
    <Layout>
        {/* 搜尋欄 - 保持相對定位容器 */}
        <form onSubmit={handleSearch} className="relative mb-10 group">

            <input
                type="text"
                placeholder="輸入關鍵字搜尋笑話..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // 保持 pr-40
                className="w-full p-4 pl-6 rounded-full border-2 border-gray-300 shadow-sm text-lg focus:outline-none focus:border-[#8AB65D] focus:ring-1 focus:ring-[#8AB65D] transition pr-40"
            />

            {/* *** 篩選標籤顯示/點擊區域 (right-14 緊貼按鈕) *** */}
            <div
                // 定位不變：right-14
                // 關鍵修正：pr-2 來增加右邊內邊距，讓分隔線和按鈕之間有間隔
                className="absolute right-14 top-1 bottom-1 flex items-center pl-4 pr-2 cursor-pointer"
                style={{ minWidth: '8rem' }} /* 縮小最小寬度 */
            >

                {/* 文字顯示區域：選擇的標籤文字，灰色 */}
                <span className={`text-sm font-medium mr-2 whitespace-nowrap overflow-hidden text-ellipsis ${selectedTag ? 'text-gray-500' : 'text-gray-500'}`}
                      style={{ textAlign: 'right',minWidth: '80px' }}
                >
                    {tagDisplay}
                </span>

                {/* 圖標顯示區域：向下箭頭 */}
                <span className="flex items-center text-gray-500 mr-2">
                    <ChevronDown size={20} />
                </span>

                <div className="h-6 border-r border-gray-300 ml-1 mr-1"></div>

                {/* 隱藏的 <select> 元素：絕對定位，覆蓋在文字和圖標上，捕獲點擊 */}
                <select
                    id="tag-select"
                    value={selectedTag}
                    onChange={handleTagChange}
                    // 保持透明覆蓋
                    className="absolute inset-0 w-full h-full p-0 bg-transparent border-none text-transparent opacity-0 cursor-pointer focus:outline-none"
                >
                    <option value="" className="text-gray-500">選擇標籤</option>
                    {availableTags.map(tag => (
                        <option key={tag} value={tag} className="text-gray-500">{tag}</option>
                    ))}
                </select>
            </div>

            {/* 搜尋按鈕 - 絕對定位在最右側 */}
            <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[#8AB65D] w-14 rounded-full flex items-center justify-center text-white hover:opacity-90 transition"
            >
                <Search size={20} />
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