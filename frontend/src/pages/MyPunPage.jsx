import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Send, PlusCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { AuthContext } from '../App';

// 假設 API URL
const API_BASE = 'http://localhost:8080/puns';

const MyPunPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, userId } = useContext(AuthContext);

    // 狀態
    const [myPuns, setMyPuns] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    
    // 表單狀態
    const [newPun, setNewPun] = useState({
        content: '',
        tags: '',
        description: '',
        imageUrl: '',
    });

    // 檢查登入狀態，未登入則導航
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // 獲取使用者自己的 Pun 列表和所有可用標籤
    const fetchPunsAndTags = async () => {
        if (!userId) return; // 確保有使用者 ID

        setLoading(true);
        try {
            // 1. 獲取使用者 Pun 列表 (GET /puns/user/{userId})
            const punResponse = await fetch(`${API_BASE}/user/${userId}`);
            const punData = await punResponse.json();
            setMyPuns(punData);

            // 2. 獲取所有可用標籤 (GET /puns/tags)
            const tagsResponse = await fetch(`${API_BASE}/tags`);
            const tagsData = await tagsResponse.json();
            // 過濾空標籤，並設定
            setAvailableTags(tagsData.filter(tag => tag && tag.trim() !== '')); 

        } catch (error) {
            console.error("獲取資料失敗:", error);
            alert("無法載入資料，請檢查後端服務。");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPunsAndTags();
    }, [userId]);


    // 處理新增 Pun
    const handleAddPun = async (e) => {
        e.preventDefault();
        
        // [修改 1/3]: 驗證 Content 和 Tags (必選)
        if (!newPun.content) {
            alert("諧音梗主體 (Content) 是必填欄位。");
            return;
        }
        if (!newPun.tags) {
            alert("標籤 (Tags) 是必選欄位。");
            return;
        }


        setIsSubmitting(true);
        try {
            const punData = {
                ...newPun,
                createdBy: userId, // 從 Context 取得的使用者 ID (目前硬編碼為 1)
            };

            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(punData),
            });

            if (!response.ok) {
                throw new Error('新增諧音梗失敗');
            }

            // 清空表單並重新整理列表
            setNewPun({ content: '', tags: '', description: '', imageUrl: '' });
            setShowForm(false); 
            fetchPunsAndTags();
            alert("諧音梗新增成功！");

        } catch (error) {
            console.error("新增失敗:", error);
            alert("新增諧音梗時發生錯誤。");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // 處理刪除 Pun
    const handleDeletePun = async (punId) => {
        if (!window.confirm(`確定要刪除 ID: ${punId} 的諧音梗嗎？`)) {
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE}/${punId}`, {
                method: 'DELETE',
            });

            if (!response.ok && response.status !== 204) {
                 // 204 No Content 是成功刪除常見的回傳碼，不應視為錯誤
                 throw new Error('刪除諧音梗失敗');
            }

            // 刪除成功，重新整理列表
            fetchPunsAndTags();
            alert("諧音梗刪除成功！");

        } catch (error) {
            console.error("刪除失敗:", error);
            alert("刪除諧音梗時發生錯誤。");
        }
    };

    if (!isLoggedIn) return null; // 未登入，等待導航

    if (loading) return <Layout><div className="p-10 text-center text-gray-500">載入中...</div></Layout>;

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-8 text-gray-700">我的諧音梗</h1>

            {/* 新增按鈕 */}
            <button 
                onClick={() => setShowForm(!showForm)}
                className="mb-8 flex items-center gap-2 bg-[#8AB65D] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#729c4f] transition font-medium"
            >
                <PlusCircle size={20} />
                {showForm ? '隱藏表單' : '新增諧音梗'}
            </button>

            {/* 新增表單 */}
            {showForm && (
                <div className="bg-[#FDFBF6] p-6 md:p-8 rounded-xl shadow-lg mb-10 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">新增諧音梗</h2>
                    <form onSubmit={handleAddPun} className="space-y-4">
                        <input
                            type="text"
                            placeholder="諧音梗主體 (Content, 必填)"
                            value={newPun.content}
                            onChange={(e) => setNewPun({ ...newPun, content: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8AB65D]"
                            required
                        />
                        <select
                            value={newPun.tags}
                            onChange={(e) => setNewPun({ ...newPun, tags: e.target.value })} 
                            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8AB65D]"
                            required // [修改 2/3]: 設為必選
                        >
                            <option value="" disabled>請選擇標籤 (必選)</option> {/* [修改 3/3]: 預設選項變為 disabled 佔位符 */}
                            {availableTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                        <textarea
                            placeholder="解釋/備註 (Description, 選填)"
                            value={newPun.description}
                            onChange={(e) => setNewPun({ ...newPun, description: e.target.value })}
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8AB65D]"
                        />
                         <input
                            type="text"
                            placeholder="圖片網址 (ImageUrl, 選填)"
                            value={newPun.imageUrl}
                            onChange={(e) => setNewPun({ ...newPun, imageUrl: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8AB65D]"
                        />
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-bold text-white transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F58F58] hover:bg-[#e47d48]'}`}
                        >
                            <Send size={20} />
                            {isSubmitting ? '正在提交...' : '提交新諧音梗'}
                        </button>
                    </form>
                </div>
            )}


            {/* 諧音梗列表 */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">已發布的諧音梗 ({myPuns.length} 筆)</h2>
            
            {myPuns.length > 0 ? (
                <div className="space-y-4">
                    {myPuns.map((pun) => (
                        <div 
                            key={pun.id} 
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
                        >
                            <div className="flex-1 min-w-0 pr-4">
                                <h3 className="text-lg font-medium text-gray-800 truncate" title={pun.content}>{pun.content}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    標籤: {pun.tags || '無標籤'}
                                    <span className="ml-3 text-xs text-gray-400">ID: {pun.id}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => handleDeletePun(pun.id)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition flex-shrink-0"
                                title="刪除"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">您尚未發布任何諧音梗。</p>
            )}
        </Layout>
    );
};

export default MyPunPage;