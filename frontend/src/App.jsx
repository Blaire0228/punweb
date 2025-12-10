import React, { useState, createContext, useMemo } from 'react'; // 1. 引入 createContext 和 useMemo
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DetailPage from './pages/DetailPage';
import MyPunPage from './pages/MyPunPage'; // 2. 引入 MyPunPage

// 3. 創建 AuthContext
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

function App() {
  // 4. 建立狀態來模擬登入狀態和使用者 ID
  // 初始值從 localStorage 讀取，以保持頁面刷新後的狀態
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [userId, setUserId] = useState(() => parseInt(localStorage.getItem('userId')) || null);

  // 5. 實作登入/登出函式
  const authContextValue = useMemo(() => ({
    isLoggedIn,
    userId,
    // 模擬登入：將 ID 設為 1 (Admin) 並儲存
    login: (id = 1) => {
      setIsLoggedIn(true);
      setUserId(id);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', id.toString());
    },
    logout: () => {
      setIsLoggedIn(false);
      setUserId(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
    },
  }), [isLoggedIn, userId]);

  return (
    <AuthContext.Provider value={authContextValue}> {/* 6. 包裹 Context */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/mypun" element={<MyPunPage />} /> {/* 7. 新增 MyPunPage 路由 */}
          {/* 處理未知路徑，導回首頁或登入頁 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;