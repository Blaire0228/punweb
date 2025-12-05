import React, { useState } from 'react';
import { Star } from 'lucide-react';

const PunCard = ({ title, tags, isStarred, onClick }) => {
    const [liked, setLiked] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="bg-[#FDFBF6] p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition relative border border-gray-100 group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{title || "無標題笑話"}</h3>
       {/* 純前端互動按鈕 */}
               <button
                 onClick={(e) => {
                   e.stopPropagation(); // 防止點擊按鈕時跳轉頁面
                   setLiked(!liked);    // 切換變色狀態
                   console.log("按鈕被點擊了，目前狀態:", !liked);
                 }}
                 className={`p-2 rounded-full transition flex items-center gap-1 ${
                   liked ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                 }`}
               >
                 {/* 圖示 */}
                 <Star size={18} className={liked ? "fill-current" : ""} />
                 {/* 文字 (可選) */}
                 <span className="text-sm font-medium">Like</span>
               </button>
      </div>
      <p className="text-gray-600 line-clamp-2 min-h-[3rem]">{tags}</p>
    </div>
  );
};

export default PunCard;