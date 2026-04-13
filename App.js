import React, { useState } from 'react';
import { Heart, MessageCircle, User } from 'lucide-react';

export default function App() {
  const [posts] = useState([
    { id: 1, user: 'Pure_User', content: 'Eindelijk online! ✨' },
    { id: 2, user: 'Dev_Buddy', content: 'De 404 is weg, nu de rest nog.' }
  ]);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '900', letterSpacing: '-2px' }}>PURE</h1>
      </header>

      <main style={{ maxWidth: '400px', margin: '0 auto' }}>
        {posts.map(post => (
          <div key={post.id} style={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '20px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <User size={20} />
              <span style={{ fontWeight: 'bold' }}>{post.user}</span>
            </div>
            <p style={{ color: '#ccc', lineHeight: '1.5' }}>{post.content}</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '15px', color: '#666' }}>
              <Heart size={20} />
              <MessageCircle size={20} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
