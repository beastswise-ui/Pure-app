import React, { useState } from 'react';
import { Heart, MessageCircle, Send, User, Plus, Search, Camera } from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Pure_User', content: 'Welkom op PURE! ✨', mood: 'Blij', likes: 5 },
    { id: 2, user: 'VibeCheck', content: 'Dit is mijn eerste post in de cloud.', mood: 'Relaxed', likes: 12 }
  ]);
  const [newCaption, setNewCaption] = useState('');

  const handlePost = () => {
    if (!newCaption.trim()) return;
    
    const newPost = {
      id: Date.now(),
      user: 'Jij',
      content: newCaption,
      mood: 'Nieuw',
      likes: 0
    };
    
    setPosts([newPost, ...posts]);
    setNewCaption('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center p-6 sticky top-0 bg-black/80 backdrop-blur-md z-10">
        <h1 className="text-3xl font-black tracking-tighter italic">PURE</h1>
        <div className="flex gap-5">
          <Search className="w-6 h-6" />
          <User className="w-6 h-6" />
        </div>
      </header>

      {/* Post Creator */}
      <div className="w-full max-w-md px-6 mb-8">
        <div className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800">
          <textarea 
            className="w-full bg-transparent border-none focus:ring-0 text-zinc-300 placeholder-zinc-600 resize-none"
            placeholder="Wat is je vibe?"
            rows="2"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-800">
            <Camera className="text-zinc-500 w-5 h-5" />
            <button 
              onClick={handlePost}
              className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <main className="w-full max-w-md px-6 space-y-6 pb-20">
        {posts.map(post => (
          <div key={post.id} className="bg-zinc-900/50 rounded-3xl p-6 border border-zinc-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-zinc-700 to-zinc-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">{post.user}</p>
                <p className="text-zinc-500 text-xs">{post.mood}</p>
              </div>
            </div>
            <p className="text-zinc-200 leading-relaxed mb-6">{post.content}</p>
            <div className="flex gap-6 text-zinc-500">
              <button className="flex items-center gap-2 hover:text-red-500 transition">
                <Heart className="w-5 h-5" />
                <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500 transition">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs">0</span>
              </button>
              <Send className="w-5 h-5 ml-auto hover:text-white transition" />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
