import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, User } from 'lucide-react';

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // 色票定義
  const colors = {
    headerGreen: 'bg-[#8AB65D]',
    bgGray: 'bg-[#F5F5F5]',
    panelBrown: 'bg-[#D09E86]',
  };

  return (
    <div className={`min-h-screen ${colors.bgGray} font-sans text-gray-800 pb-10`}>
      {/* 導航列 */}
      <header className={`${colors.headerGreen} p-4 flex justify-between items-center text-white shadow-md sticky top-0 z-50`}>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-wide select-none hover:opacity-90 transition">
          <span className="text-2xl">🐿️</span>
          要台灣人放棄諧音梗已經 taiwan 啦！
        </Link>
        
        <div className="flex gap-3 relative">
          <button className="p-1 hover:bg-white/20 rounded-full transition">
            <Plus size={24} />
          </button>
          
          <button 
            className="p-1 hover:bg-white/20 rounded-full transition"
            onClick={() => setShowMenu(!showMenu)}
          >
            <User size={24} />
          </button>

          {/* 右側下拉選單 */}
          {showMenu && (
            <div className={`absolute top-12 right-0 ${colors.panelBrown} p-3 rounded-lg shadow-xl flex flex-col gap-2 z-50 w-32 border-2 border-white/20`}>
              <MenuButton text="收藏清單" onClick={() => navigate('/favorites')} />
              <MenuButton text="重設密碼" onClick={() => navigate('/reset-password')} />
              <MenuButton text="登出" onClick={() => navigate('/login')} />
            </div>
          )}
        </div>
      </header>

      {/* 主要內容區塊 */}
      <main className="max-w-5xl mx-auto mt-8 p-4">
        {children}
      </main>
    </div>
  );
};

// 內部小元件：選單按鈕
const MenuButton = ({ text, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-[#EAD0C2] text-sm font-bold py-2 px-3 rounded shadow hover:bg-[#ebd5c9] transition text-center text-gray-800"
  >
    {text}
  </button>
);

export default Layout;