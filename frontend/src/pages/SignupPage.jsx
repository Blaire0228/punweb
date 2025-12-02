import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // 呼叫 Java Spring Boot Signup API
    console.log("註冊送出");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5] p-4">
      <div className="flex w-full max-w-4xl h-[500px] shadow-2xl rounded-2xl overflow-hidden bg-white">
        
        {/* 左側：註冊表單 (深色區塊) */}
        <div className="bg-[#D09E86] w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-10 relative">
           <h2 className="text-3xl font-bold text-white mb-6">歡迎</h2>
           <form className="w-full max-w-xs space-y-4" onSubmit={handleSignup}>
            <input type="text" placeholder="帳號" className="w-full p-3 rounded-md bg-white/30 placeholder-white/70 text-white focus:outline-none border border-white/40 focus:bg-white/40 transition" />
            <input type="password" placeholder="密碼" className="w-full p-3 rounded-md bg-white/30 placeholder-white/70 text-white focus:outline-none border border-white/40 focus:bg-white/40 transition" />
            <input type="password" placeholder="確認密碼" className="w-full p-3 rounded-md bg-white/30 placeholder-white/70 text-white focus:outline-none border border-white/40 focus:bg-white/40 transition" />
            
            <div className="flex justify-center mt-6">
              <button className="border-2 border-white text-white px-10 py-2 rounded-full font-bold hover:bg-white/20 transition">
                註冊
              </button>
            </div>
          </form>

          {/* 手機版顯示的登入連結 */}
          <div className="mt-6 md:hidden text-sm text-white/80">
            已經有帳號？ <button onClick={() => navigate('/login')} className="font-bold underline">去登入</button>
          </div>
        </div>

        {/* 右側：已有帳號？去登入 (淺色區塊) */}
        <div className="bg-[#FDFBF6] w-1/2 hidden md:flex flex-col justify-center items-center text-gray-700 p-10 space-y-6">
          <h2 className="text-2xl font-bold">已經有帳號了嗎？</h2>
          <button 
             onClick={() => navigate('/login')}
             className="bg-[#F58F58] text-white px-10 py-2 rounded-full font-bold shadow-md hover:opacity-90 transition"
          >
            登入
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;