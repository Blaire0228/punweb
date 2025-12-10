import React, { useContext } from 'react'; // 1. 引入 useContext
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; // 2. 引入 AuthContext

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 3. 獲取 login 函式

  const handleLogin = async (e) => {
    e.preventDefault();
    // 呼叫 Java Spring Boot Login API
    console.log("登入送出");
    
    // [新增] 模擬登入成功，設定使用者 ID 為 1
    login(1); 
    
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5] p-4">
      <div className="flex w-full max-w-4xl h-[500px] shadow-2xl rounded-2xl overflow-hidden bg-white">
        
        {/* 左側：還沒帳號？去註冊 (深色區塊) */}
        <div className="bg-[#D09E86] w-1/2 hidden md:flex flex-col justify-center items-center text-white p-10 space-y-6">
          <h2 className="text-3xl font-bold">還沒有帳號嗎？</h2>
          <button 
            onClick={() => navigate('/signup')}
            className="border-2 border-white px-8 py-2 rounded-full hover:bg-white/20 transition font-bold"
          >
            註冊
          </button>
        </div>
        
        {/* 右側：登入表單 (淺色區塊) */}
        <div className="bg-[#FDFBF6] w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-700">歡迎</h2>
          <form className="w-full max-w-xs space-y-4" onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="帳號" 
              className="w-full p-3 rounded-md bg-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#F58F58]" 
            />
            <input 
              type="password" 
              placeholder="密碼" 
              className="w-full p-3 rounded-md bg-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#F58F58]" 
            />
            
            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
              <button type="button" className="hover:underline">忘記密碼？</button>
              <button 
                type="submit" 
                className="bg-[#F58F58] text-white px-8 py-2 rounded-full font-bold shadow-md hover:opacity-90 transition"
              >
                登入
              </button>
            </div>
          </form>

          {/* 手機版顯示的註冊連結 */}
          <div className="mt-8 md:hidden text-sm text-gray-500">
            還沒有帳號？ <button onClick={() => navigate('/signup')} className="text-[#F58F58] font-bold">去註冊</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;