import React, { useState, useContext } from 'react'; // 1. 引入 useContext
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import squirrelLogo from '../assets/squirrelLogo.png';
import userLogo from '../assets/userLogo.png';
import { AuthContext } from '../App'; // 2. 引入 AuthContext

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext); // 3. 獲取狀態和函式

  // 色票定義
  const colors = {
    headerGreen: 'bg-[#8AB65D]',
    bgGray: 'bg-[#F5F5F5]',
    panelBrown: 'bg-[#D09E86]',
  };
  
  // [新增] 處理導航到需要登入的頁面 (例如 /mypun 或 /favorites)
  const handleAuthNavigation = (path) => {
    setShowMenu(false); // 關閉選單
    if (isLoggedIn) {
      navigate(path);
    } else {
      // 未登入則導向登入頁
      navigate('/login'); 
    }
  };

  // [新增] 處理登出
  const handleLogout = () => {
    setShowMenu(false);
    logout(); // 清除登入狀態
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${colors.bgGray} font-sans text-gray-800 pb-10`}>
      {/* 導航列 */}
      <header className={`${colors.headerGreen} p-4 flex justify-between items-center text-white shadow-md sticky top-0 z-50`}>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-wide select-none hover:opacity-90 transition">

          <img
            src={squirrelLogo}
            alt="Logo"
            className="w-12 h-12 object-contain"
            />
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
            <img
                        src={userLogo}
                        alt="user Logo"
                        className="w-12 h-12 object-contain"
                        />
          </button>

          {/* 右側下拉選單 */}
          {showMenu && (
            <div className={`absolute top-12 right-0 ${colors.panelBrown} p-3 rounded-lg shadow-xl flex flex-col gap-2 z-50 w-32 border-2 border-white/20`}>
              {/* 修改收藏清單的 onClick */}
              <MenuButton text="收藏清單" onClick={() => handleAuthNavigation('/favorites')} />
              
              {/* [新增] 我的諧音梗 按鈕 */}
              <MenuButton text="我的諧音梗" onClick={() => handleAuthNavigation('/mypun')} /> 
              
              <MenuButton text="重設密碼" onClick={() => navigate('/reset-password')} />
              {/* 修改登出按鈕的 onClick */}
              <MenuButton text="登出" onClick={handleLogout} />
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