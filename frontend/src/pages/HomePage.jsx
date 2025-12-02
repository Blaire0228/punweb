import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import PunCard from '../components/PunCard';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // 模擬資料 (將來這部分要改成從 Java Spring Boot API 獲取)
  const puns = [
    { id: 1, title: "世俗是甚麼？", content: "世俗是隻石獅子...", isStarred: false },
    { id: 2, title: "基數是13579", content: "偶數是24680...", isStarred: true },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // 這裡實作搜尋邏輯或跳轉
  };

  return (
    <Layout>
      {/* 搜尋欄 */}
      <form onSubmit={handleSearch} className="relative mb-10 group">
        <input 
          type="text" 
          placeholder="輸入風格或關鍵字" 
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
          {searchTerm ? "搜尋結果" : "熱門諧音梗"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {puns.map(pun => (
            <PunCard 
              key={pun.id} 
              {...pun} 
              onClick={() => navigate(`/detail/${pun.id}`)} 
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;