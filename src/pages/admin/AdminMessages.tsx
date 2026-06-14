import React, { useState, useEffect, useRef } from 'react';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChatMessage, ChatThread } from '../../types';
import { MessageSquare, Send, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function AdminMessages() {
  const { isAdminAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  // Load Threads, sorting generally by timestamp desc
  useEffect(() => {
    const q = query(collection(db, 'threads'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ths: ChatThread[] = [];
      snapshot.forEach(doc => {
        ths.push({ id: doc.id, ...doc.data() } as ChatThread);
      });
      setThreads(ths);
    });

    return () => unsubscribe();
  }, []);

  // Load Messages for selected thread
  useEffect(() => {
    if (!selectedThread) return;

    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach(doc => {
        const data = { id: doc.id, ...doc.data() } as ChatMessage;
        if (data.threadId === selectedThread.id) {
          msgs.push(data);
        }
      });
      setMessages(msgs);

      // Mark read
      updateDoc(doc(db, 'threads', selectedThread.id), { unreadAdmin: false }).catch(() => {});
    });

    return () => unsubscribe();
  }, [selectedThread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedThread) return;
    
    const msgId = `msg_${Math.random().toString(36).substr(2, 9)}`;
    const newMsg: ChatMessage = {
      id: msgId,
      threadId: selectedThread.id,
      senderId: 'admin',
      senderName: 'Support Team',
      text: inputText,
      timestamp: new Date().toISOString()
    };
    
    setInputText('');
    
    try {
      await setDoc(doc(db, 'messages', msgId), newMsg);
      await setDoc(doc(db, 'threads', selectedThread.id), {
        lastMessage: newMsg.text,
        timestamp: newMsg.timestamp,
        unreadAdmin: false,
        unreadCustomer: true
      }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteThread = async (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this conversation?')) return;

    try {
      if (selectedThread?.id === threadId) setSelectedThread(null);
      await deleteDoc(doc(db, 'threads', threadId));
      // Delete underlying messages (in production use a cloud function or batch)
      // For this simple version, we leave orphan messages or delete them slowly
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAdminAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white glow-text-white">Messages & Help Center</h1>
          <p className="text-slate-400 mt-2 font-mono">Communicate with your customers.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl shadow-[0_0_20px_rgba(59,130,246,0.15)] border border-blue-500/30 overflow-hidden flex h-[600px] glow-blue">
        
        {/* Threads List */}
        <div className="w-1/3 border-r border-slate-800 bg-slate-950 overflow-y-auto">
          {threads.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-700" />
              <p>No messages yet.</p>
            </div>
          ) : (
            <div>
              {threads.map(thread => (
                <div 
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`p-4 border-b border-slate-800 cursor-pointer transition-all relative group ${selectedThread?.id === thread.id ? 'bg-blue-900/40 border-l-4 border-l-blue-500' : 'hover:bg-slate-900 border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-slate-200 line-clamp-1 ${thread.unreadAdmin ? 'font-extrabold text-white text-shadow-glow' : ''}`}>
                      {thread.customerName || 'Anonymous Customer'}
                    </h3>
                    <span className="text-xs text-slate-500 shrink-0 whitespace-nowrap ml-2 font-mono">
                      {new Date(thread.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-sm text-slate-400 line-clamp-1 ${thread.unreadAdmin ? 'font-medium text-slate-300' : ''}`}>
                    {thread.lastMessage}
                  </p>
                  {thread.unreadAdmin && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                  )}
                  
                  <button 
                    onClick={(e) => deleteThread(e, thread.id)}
                    className="absolute bottom-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-slate-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent pointer-events-none"></div>
          {selectedThread ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 shadow-sm z-10 relative">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <h3 className="font-display font-bold text-lg text-white">{selectedThread.customerName || 'Anonymous Customer'}</h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900 relative z-10">
                {messages.map((msg) => {
                  const isMe = msg.senderId === 'admin';
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] font-bold text-slate-500 mb-1 mx-1 font-mono uppercase">{isMe ? 'You' : msg.senderName}</span>
                      <div className={`max-w-[70%] px-5 py-3 rounded-2xl ${isMe ? 'bg-blue-600/20 border border-blue-500/50 text-blue-100 rounded-tr-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-slate-950 border border-slate-700 text-slate-300 rounded-tl-sm shadow-sm'}`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 mx-1 font-mono">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-4 relative z-10">
                <input 
                  type="text" 
                  placeholder="Type a response..." 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all font-mono text-sm"
                />
                <button 
                  type="submit" 
                  disabled={!inputText.trim()}
                  className="p-3 bg-blue-600/20 border border-blue-500/50 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white disabled:bg-slate-900 disabled:border-slate-800 disabled:text-slate-600 transition-all shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-slate-900 relative z-10">
              <MessageSquare className="w-16 h-16 text-blue-900 mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Select a conversation</h3>
              <p className="text-slate-400">Choose a thread from the sidebar to view messages and reply to customers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
