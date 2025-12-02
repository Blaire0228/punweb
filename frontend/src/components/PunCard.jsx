import React from 'react';
import { Star } from 'lucide-react';

const PunCard = ({ title, content, isStarred, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-[#FDFBF6] p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition relative border border-gray-100 group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {/* 防止星星點擊時觸發卡片跳轉，加上 e.stopPropagation() */}
        <button onClick={(e) => { e.stopPropagation(); /* 這裡呼叫收藏API */ }}>
          <Star 
            size={20} 
            className={isStarred ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-300"} 
          />
        </button>
      </div>
      <p className="text-gray-600 line-clamp-2 min-h-[3rem]">{content}</p>
    </div>
  );
};

export default PunCard;