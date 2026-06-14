import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatMessage, ChatThread } from '../types';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [unreadMsgCount, setUnreadMsgCount] = useState(0);

  useEffect(() => {
    let sid = localStorage.getItem('chatSessionId');
    let sname = localStorage.getItem('chatCustomerName');
    
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatSessionId', sid);
    }
    setSessionId(sid);

    if (sname) {
      setCustomerName(sname);
      setNameEntered(true);
    }
  }, []);

  useEffect(() => {
    if (!sessionId || !nameEntered) return;

    const q = query(
      collection(db, 'messages'),
      where('threadId', '==', sessionId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach(doc => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setMessages(msgs);
      
      // If the chat is open, mark thread generic unreadCustomer as false
      if (isOpen) {
        updateDoc(doc(db, 'threads', sessionId), { unreadCustomer: false }).catch(() => {});
      }
    });

    const threadUnsub = onSnapshot(doc(db, 'threads', sessionId), (docSnap) => {
      if (docSnap.exists() && docSnap.data().unreadCustomer && !isOpen) {
        setUnreadMsgCount(1);
      } else {
        setUnreadMsgCount(0);
      }
    });

    return () => {
      unsubscribe();
      threadUnsub();
    };
  }, [sessionId, nameEntered, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;
    localStorage.setItem('chatCustomerName', customerName);
    setNameEntered(true);

    // Ensure thread exists
    const threadData: ChatThread = {
      id: sessionId,
      customerName: customerName,
      lastMessage: 'Started chat',
      timestamp: new Date().toISOString(),
      unreadAdmin: true,
      unreadCustomer: false
    };
    try {
      await setDoc(doc(db, 'threads', sessionId), threadData, { merge: true });
    } catch (e) {
      console.error('Failed to create thread', e);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionId) return;
    
    const msgId = `msg_${Math.random().toString(36).substr(2, 9)}`;
    const newMsg: ChatMessage = {
      id: msgId,
      threadId: sessionId,
      senderId: sessionId,
      senderName: customerName,
      text: inputText,
      timestamp: new Date().toISOString()
    };
    
    setInputText('');
    
    try {
      await setDoc(doc(db, 'messages', msgId), newMsg);
      await setDoc(doc(db, 'threads', sessionId), {
        customerName: customerName,
        lastMessage: newMsg.text,
        timestamp: newMsg.timestamp,
        unreadAdmin: true,
        unreadCustomer: false
      }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-purple-600 border border-purple-500/20 text-white shadow-xl hover:bg-purple-700 hover:-translate-y-1 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'} z-40`}
      >
        <MessageCircle className="w-7 h-7" />
        {unreadMsgCount > 0 && !isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right border border-purple-100 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} z-50`} style={{ height: '500px', maxHeight: '80vh' }}>
        
        {/* Header */}
        <div className="bg-purple-600 border-b border-purple-700/50 text-white p-5 flex justify-between items-start relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-display font-bold text-xl">Support Chat</h3>
            <p className="text-purple-200 text-xs mt-1">We typically reply in a few minutes.</p>
            <a href="https://www.facebook.com/Mnnabil.2024/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-100 hover:text-white underline mt-1.5 inline-block">Support on Facebook</a>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-purple-200 hover:text-white transition-colors relative z-10 p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!nameEntered ? (
          <div className="flex-1 p-6 flex flex-col justify-center bg-slate-50 relative">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center relative z-10">
              <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="font-display font-bold text-slate-800 mb-2">Welcome!</h4>
              <p className="text-sm text-slate-500 mb-6">Tell us your name to start chatting.</p>
              
              <form onSubmit={handleStartChat}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 outline-none transition-all mb-4 text-sm font-medium placeholder:text-slate-400"
                  required
                />
                <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-sm">
                  Start Chat
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bgslate-50">
              <div className="text-center text-xs text-slate-400 font-medium my-4">Today</div>
              {messages.map((msg) => {
                const isMe = msg.senderId === sessionId;
                return (
                  <div key={msg.id} className={`flex flex-col relative z-10 ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-slate-400 mb-1 mx-1 font-medium">{isMe ? 'You' : msg.senderName}</span>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${isMe ? 'bg-purple-600 text-white rounded-tr-sm shadow-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm shadow-sm'}`}>
                      <p className="text-sm border-0 whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-full focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                disabled={!inputText.trim()}
                className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shrink-0 shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
