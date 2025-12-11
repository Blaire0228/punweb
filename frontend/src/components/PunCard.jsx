import React, { useState } from 'react';
import { Star } from 'lucide-react';

const PunCard = ({ title, tags, isStarred, onClick }) => {
    // 這裡的 liked 狀態目前只存在於卡片內部 (重新整理會消失)，若要永久保存需串接後端 API
    const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-[#FDFBF6] p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition relative border border-gray-100 group"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title || "無標題笑話"}</h3>

        {/* 純前端互動按鈕 */}
        <button
            onClick={(e) => {
            e.stopPropagation(); // 防止點擊按鈕時跳轉頁面
            setLiked(!liked);    // 切換變色狀態
            }}
            className={`p-2 rounded-full transition flex items-center gap-1 ${
            liked ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
        >
            <Star size={18} className={liked ? "fill-current" : ""} />
        </button>
      </div>

      {/* --- 修改重點：解析 Tag 物件陣列 --- */}
      <div className="flex flex-wrap gap-2 min-h-[2rem]">
        {/* 1. 先判斷 tags 是否為陣列，且長度大於 0 */}
        {Array.isArray(tags) && tags.length > 0 ? (
            // 2. 遍歷陣列，顯示 tag.name
            tags.map((tag) => (
                <span
                    key={tag.id} // 使用資料庫的 id 當作 key
                    className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium rounded-full"
                >
                    #{tag.name}
                </span>
            ))
        ) : (
            // 3. 如果沒有標籤或是舊資料格式，顯示提示
            <span className="text-gray-400 text-sm">無標籤</span>
        )}
      </div>
      {/* ---------------------------------- */}

    </div>
  );
};

export default PunCard;