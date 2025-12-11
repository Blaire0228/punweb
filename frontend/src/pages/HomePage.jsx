import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react'; // 假設你有 Filter icon
import Layout from '../components/Layout';
import PunCard from '../components/PunCard';

const HomePage = () => {
  const navigate = useNavigate();

  // 狀態管理
  const [puns, setPuns] = useState([]);
  const [allTags, setAllTags] = useState([]); // 儲存後端回傳的所有標籤選項
  const [selectedTagIds, setSelectedTagIds] = useState([]); // 使用者勾選的標籤 ID
  const [showTagFilter, setShowTagFilter] = useState(false); // 控制標籤選單是否顯示

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. 初始載入：抓笑話 + 抓標籤清單
  useEffect(() => {
    fetchPuns();      // 預設抓全部
    fetchTags();      // 抓標籤選項
  }, []);

  const fetchTags = () => {
    fetch('http://localhost:8080/tags')
      .then(res => res.json())
      .then(data => setAllTags(data))
      .catch(err => console.error("無法取得標籤:", err));
  };

  // 2. 核心搜尋功能 (呼叫後端 API)
  const fetchPuns = (keyword = "", tagIds = []) => {
    setLoading(true);

    // 建構 Query String
    // 例如: http://localhost:8080/puns/search?keyword=哈哈&tags=1,2
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);

    // 如果有勾選標籤，加到參數中
    if (tagIds.length > 0) {
      params.append("tags", tagIds.join(","));
    }

    // 決定要打哪個 API：如果完全沒參數就打 getAll，有參數就打 search
    const url = (keyword === "" && tagIds.length === 0)
      ? 'http://localhost:8080/puns'
      : `http://localhost:8080/puns/search?${params.toString()}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPuns(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("無法取得資料:", error);
        setLoading(false);
      });
  };

  // 3. 處理搜尋表單送出
  const handleSearch = (e) => {
    e.preventDefault();
    // 這裡同時把「目前的搜尋字」和「目前勾選的標籤」送給後端
    fetchPuns(searchTerm, selectedTagIds);
  };

  // 4. 處理標籤勾選
  const handleTagChange = (tagId) => {
    setSelectedTagIds(prev => {
      const newTags = prev.includes(tagId)
        ? prev.filter(id => id !== tagId) // 取消勾選
        : [...prev, tagId];               // 新增勾選
      return newTags;
    });
  };

  return (
    <Layout>
      {/* 搜尋區塊 */}
      <div className="mb-10">
        <form onSubmit={handleSearch} className="relative group flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="輸入關鍵字搜尋..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-6 rounded-full border-2 border-gray-300 focus:border-[#8AB65D] focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[#8AB65D] w-12 rounded-full text-white flex items-center justify-center hover:opacity-90"
            >
              <Search size={20} />
            </button>
          </div>

          {/* 篩選按鈕 */}
          <button
            type="button"
            onClick={() => setShowTagFilter(!showTagFilter)}
            className={`p-4 rounded-full border-2 ${showTagFilter ? 'bg-gray-100 border-[#8AB65D]' : 'border-gray-300'} hover:bg-gray-50`}
          >
            <Filter size={20} className={selectedTagIds.length > 0 ? "text-[#8AB65D]" : "text-gray-500"} />
          </button>
        </form>

        {/* 標籤勾選介面 (點擊漏斗後顯示) */}
        {showTagFilter && (
          <div className="mt-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 mb-2">篩選標籤:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <label
                  key={tag.id}
                  className={`cursor-pointer px-3 py-1 rounded-full border text-sm transition select-none
                    ${selectedTagIds.includes(tag.id)
                      ? 'bg-[#8AB65D] text-white border-[#8AB65D]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[#8AB65D]'}`}
                >
                  <input
                    type="checkbox"
                    className="hidden" // 隱藏原生 checkbox，用樣式做按鈕感
                    checked={selectedTagIds.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
            {/* 這裡可以加一個立即套用按鈕，或者讓使用者回去按搜尋 */}
            <div className="mt-2 text-right">
                <button
                    onClick={handleSearch} // 點擊直接觸發搜尋
                    className="text-xs text-[#8AB65D] font-bold hover:underline"
                >
                    套用篩選
                </button>
            </div>
          </div>
        )}
      </div>

      {/* 列表顯示 */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          搜尋結果
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">載入中...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {puns.length > 0 ? (
              puns.map(pun => (
                <PunCard
                  key={pun.id}
                  id={pun.id}
                  title={pun.content}
                  tags={pun.tags} // 現在後端會正確回傳 List<Tag>
                  onClick={() => navigate(`/detail/${pun.id}`)}
                />
              ))
            ) : (
              <p className="text-gray-500">找不到符合條件的笑話。</p>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;