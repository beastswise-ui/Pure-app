```react
import React, { useState, useEffect } from 'react';
import { Home, Search, Plus, Heart, MessageCircle, User, Image as ImageIcon, Send, Sparkles, MapPin, Smile, X, Mic, Music, Palette, Volume2, VolumeX, Settings, Check, ArrowLeft, Users, MessageSquare, Calendar, Flame, Book, Edit2, Activity } from 'lucide-react';

// --- THEME CONFIGURATION ---
const THEME = {
  colors: {
    orange: { mainText: 'text-orange-600', mainBg: 'bg-orange-600', lightBg: 'bg-orange-50', border: 'border-orange-100', ring: 'ring-orange-100', icon: 'text-orange-400', accentText: 'text-orange-600/70', borderDash: 'border-orange-200' },
    blue: { mainText: 'text-blue-600', mainBg: 'bg-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-100', ring: 'ring-blue-100', icon: 'text-blue-400', accentText: 'text-blue-600/70', borderDash: 'border-blue-200' },
    pink: { mainText: 'text-pink-600', mainBg: 'bg-pink-600', lightBg: 'bg-pink-50', border: 'border-pink-100', ring: 'ring-pink-100', icon: 'text-pink-400', accentText: 'text-pink-600/70', borderDash: 'border-pink-200' },
    green: { mainText: 'text-green-600', mainBg: 'bg-green-600', lightBg: 'bg-green-50', border: 'border-green-100', ring: 'ring-green-100', icon: 'text-green-400', accentText: 'text-green-600/70', borderDash: 'border-green-200' }
  },
  bgs: {
    cream: { page: 'bg-[#F8F5F2] text-[#2D241E]', card: 'bg-white', nav: 'bg-[#2D241E]', navText: 'text-gray-400 hover:text-white', input: 'bg-gray-50' },
    dark: { page: 'bg-gray-900 text-gray-100', card: 'bg-gray-800', nav: 'bg-black', navText: 'text-gray-400 hover:text-white', input: 'bg-gray-700' },
    white: { page: 'bg-white text-gray-900', card: 'bg-gray-50', nav: 'bg-gray-900', navText: 'text-gray-400 hover:text-white', input: 'bg-white' }
  },
  shapes: {
    round: { card: 'rounded-[2.5rem]', image: 'rounded-[2rem]', button: 'rounded-2xl', avatar: 'rounded-2xl', modal: 'rounded-t-[3rem]' },
    soft: { card: 'rounded-xl', image: 'rounded-lg', button: 'rounded-lg', avatar: 'rounded-lg', modal: 'rounded-t-2xl' },
    sharp: { card: 'rounded-none', image: 'rounded-none', button: 'rounded-none', avatar: 'rounded-none', modal: 'rounded-none' }
  },
  fonts: {
    modern: "'Plus Jakarta Sans', sans-serif",
    serif: "'Playfair Display', serif",
    mono: "'Space Mono', monospace",
    comic: "'Comic Sans MS', cursive, sans-serif"
  }
};

const defaultSettings = {
  color: 'orange',
  bg: 'cream',
  shape: 'round',
  font: 'modern',
  chaos: false
};

const MOODS = [
  '✨ Geïnspireerd', '😊 Blij', '😢 Verdrietig', '🔥 Energiek',
  '😴 Moe', '🤔 Nadenkend', '😎 Chill', '🎉 Feestelijk', '😌 Rustig'
];

const getReactionEmoji = (mood) => mood ? mood.split(' ')[0] : '🤍';

const getPlantEmoji = (streak) => {
  if (streak === undefined || streak === 0) return '🥚';
  if (streak < 3) return '🌱';
  if (streak < 7) return '🌿';
  return '🌳';
};

// --- MOCK DATA ---
const initialUser = {
  username: 'pure_gebruiker',
  fullName: 'Jij',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
  mood: '✨ Geïnspireerd',
  profileSong: 'In The End - Linkin Park'
};

const initialPosts = [
  {
    id: 1,
    user: 'sophie_w',
    streak: 5,
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop',
    caption: 'Vandaag even helemaal offline in de natuur. 🌿',
    location: 'Hoge Veluwe',
    time: '2u',
    mood: '😌 Rustig',
    reaction: null, // Vibe-reactie in plaats van 'isLiked'
    comments: [
      { id: 101, user: 'daan_b', text: 'Prachtige lichtinval!' }
    ]
  },
  {
    id: 2,
    user: 'daan_b',
    streak: 2,
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop',
    caption: 'Focus op het proces, niet het resultaat. 🍕',
    location: 'Utrecht',
    time: '5u',
    mood: '🔥 Energiek',
    reaction: '🔥', // Ingevulde vibe-reactie
    comments: []
  }
];

const MOCK_USERS = [
  { username: 'sophie_w', fullName: 'Sophie de Wit', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', mood: '😌 Rustig', streak: 5 },
  { username: 'daan_b', fullName: 'Daan Bakker', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', mood: '🔥 Energiek', streak: 2 },
  { username: 'lisa_k', fullName: 'Lisa de Koning', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', mood: '✨ Geïnspireerd', streak: 12 },
  { username: 'tim_v', fullName: 'Tim Visser', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', mood: '😎 Chill', streak: 0 },
  { username: 'emma_j', fullName: 'Emma Jansen', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', mood: '🎉 Feestelijk', streak: 8 },
  { username: 'lars_o', fullName: 'Lars Oud', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', mood: '🔥 Energiek', streak: 1 },
];

const initialChats = [
  {
    id: 1,
    type: 'direct',
    name: 'sophie_w',
    streak: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    messages: [
      { id: 1, sender: 'sophie_w', text: 'Hey, ga je nog naar dat feestje?', time: '10:00' },
      { id: 2, sender: 'pure_gebruiker', text: 'Misschien! Ligt eraan wie er gaat.', time: '10:05' }
    ]
  },
  {
    id: 2,
    type: 'group',
    name: 'Weekend Vibes 🎉',
    avatar: null,
    messages: [
      { id: 1, sender: 'daan_b', text: 'Wie heeft er zin in pizza vanavond?', time: 'Gisteren' }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState(initialPosts);
  const [user, setUser] = useState(initialUser);
  const [newCaption, setNewCaption] = useState('');
  const [commentingId, setCommentingId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [isPostingAnimation, setIsPostingAnimation] = useState(false);

  const [newPostMood, setNewPostMood] = useState('✨ Geïnspireerd');
  const [showShareModal, setShowShareModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibeSearch, setSelectedVibeSearch] = useState(null);
  const [isEditingSong, setIsEditingSong] = useState(false);
  const [newProfileSong, setNewProfileSong] = useState('');

  const getLocalDateStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const todayStr = getLocalDateStr(new Date());

  const [diaryEntries, setDiaryEntries] = useState([
    { id: 1, date: getLocalDateStr(new Date(Date.now() - 86400000)), text: 'Vandaag een heerlijke wandeling gemaakt in de natuur. Echt goed om even helemaal offline te zijn.' }
  ]);
  const [newDiaryEntry, setNewDiaryEntry] = useState('');

  const handleAddDiaryEntry = () => {
    if (!newDiaryEntry.trim()) return;
    setDiaryEntries([{ id: Date.now(), date: todayStr, text: newDiaryEntry }, ...diaryEntries]);
    setNewDiaryEntry('');
  };

  const [postHistory, setPostHistory] = useState(() => {
    const d1 = new Date(); d1.setDate(d1.getDate() - 1);
    const d2 = new Date(); d2.setDate(d2.getDate() - 2);
    const d3 = new Date(); d3.setDate(d3.getDate() - 3);
    return [
      { date: getLocalDateStr(d3), mood: '😌 Rustig' },
      { date: getLocalDateStr(d2), mood: '🔥 Energiek' },
      { date: getLocalDateStr(d1), mood: '✨ Geïnspireerd' }
    ]; 
  });

  const postedDates = postHistory.map(p => p.date);
  const hasPostedToday = postedDates.includes(todayStr);

  const currentStreak = React.useMemo(() => {
    let streak = 0;
    const sortedDates = [...new Set(postedDates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    if (sortedDates.length === 0) return 0;

    const parseDate = (dStr) => new Date(dStr + 'T00:00:00');
    const todayDate = parseDate(todayStr);
    let prevDate = null;

    for (let i = 0; i < sortedDates.length; i++) {
        const currDate = parseDate(sortedDates[i]);
        if (prevDate === null) {
            const diff = (todayDate - currDate) / (1000 * 60 * 60 * 24);
            if (diff <= 2) streak++; 
            else break;
        } else {
            const diff = (prevDate - currDate) / (1000 * 60 * 60 * 24);
            if (diff <= 2) streak++;
            else break;
        }
        prevDate = currDate;
    }
    return streak;
  }, [postHistory, todayStr]);

  const vibeCheck = React.useMemo(() => {
    const recent = postHistory.filter(p => {
       const diff = (new Date(todayStr).getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24);
       return diff <= 7;
    });
    if (recent.length === 0) return null;

    const counts = {};
    let energiekCount = 0;
    let rustigCount = 0;

    const energeticMoods = ['🔥 Energiek', '✨ Geïnspireerd', '🎉 Feestelijk', '😊 Blij'];
    const calmMoods = ['😌 Rustig', '😎 Chill', '😴 Moe', '🤔 Nadenkend', '😢 Verdrietig'];

    recent.forEach(p => {
       counts[p.mood] = (counts[p.mood] || 0) + 1;
       if (energeticMoods.includes(p.mood)) energiekCount++;
       if (calmMoods.includes(p.mood)) rustigCount++;
    });

    const dominantMood = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return { dominantMood, energiekCount, rustigCount, total: recent.length };
  }, [postHistory, todayStr]);

  // --- GROEPS-VIBE BEREKENING ---
  const groupVibeStats = React.useMemo(() => {
    const moodCounts = {};
    MOCK_USERS.forEach(u => {
      moodCounts[u.mood] = (moodCounts[u.mood] || 0) + 1;
    });
    const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    const percentage = Math.round((moodCounts[dominantMood] / MOCK_USERS.length) * 100);
    return { mood: dominantMood, percentage };
  }, []);

  // Chat State
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState('direct');

  // Theme State
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    color: 'pink',
    bg: 'dark',
    shape: 'sharp',
    font: 'comic',
    chaos: true
  });

  const updateCustom = (key, value) => {
    setCustomSettings(prev => ({ ...prev, [key]: value }));
    setIsCustomActive(true); 
  };

  const activeTheme = isCustomActive ? customSettings : defaultSettings;
  const colors = THEME.colors[activeTheme.color];
  const bgs = THEME.bgs[activeTheme.bg];
  const shapes = THEME.shapes[activeTheme.shape];
  const fontStyle = THEME.fonts[activeTheme.font];

  // --- VIBE-REACTIE LOGICA ---
  const toggleReaction = (postId, postMood) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        // Wissel tussen "geen reactie" en "de vibe van de post"
        return { ...post, reaction: post.reaction ? null : getReactionEmoji(postMood) };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!newCaption.trim() || hasPostedToday || !newPostMood) return;
    
    setIsPostingAnimation(true);
    
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: user.username,
        userAvatar: user.avatar,
        image: `https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=600&fit=crop`,
        caption: newCaption,
        location: 'Mijn plek',
        time: 'nu',
        mood: newPostMood,
        streak: currentStreak,
        reaction: null,
        comments: []
      };
      setPosts([newPost, ...posts]);
      setNewCaption('');
      setPostHistory([...postHistory, { date: todayStr, mood: newPostMood }]);
      setUser(prev => ({ ...prev, mood: newPostMood }));
      setIsPostingAnimation(false);
    }, 2000);
  };

  const handleShareVibe = (chatId) => {
    const todaysMoodEntry = postHistory.find(p => p.date === todayStr);
    const moodToShare = todaysMoodEntry ? todaysMoodEntry.mood : newPostMood;
    const currentPlant = getPlantEmoji(currentStreak);
    const messageText = `Ik heb net mijn moment gedeeld! Mijn vibe vandaag is ${moodToShare}. ${currentPlant} (Streak: ${currentStreak} dagen)`;
    
    setChats(chats.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          messages: [...c.messages, { id: Date.now(), sender: user.username, text: messageText, time: 'Nu' }]
        };
      }
      return c;
    }));
    setShowShareModal(false);
    setActiveTab('messages');
    setActiveChatId(chatId);
  };

  const addComment = (postId) => {
    if (!newComment.trim()) return;
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), user: user.username, text: newComment }]
        };
      }
      return post;
    }));
    setNewComment('');
    setCommentingId(null);
  };

  const sendMessage = () => {
    if (!chatInput.trim() || !activeChatId) return;
    setChats(chats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, { id: Date.now(), sender: user.username, text: chatInput, time: 'Nu' }]
        };
      }
      return c;
    }));
    setChatInput('');
  };

  const createNewChat = () => {
    if (!newChatName.trim()) return;
    const newChat = {
      id: Date.now(),
      type: newChatType,
      name: newChatName,
      avatar: newChatType === 'direct' ? 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' : null,
      messages: []
    };
    setChats([newChat, ...chats]);
    setShowNewChatModal(false);
    setNewChatName('');
  };

  return (
    <div className={`min-h-screen flex justify-center transition-colors duration-500 ${bgs.page}`}>
      <div className="w-full max-w-md h-screen relative flex flex-col overflow-hidden shadow-2xl bg-inherit">
        
        {/* Header */}
        <header className="pt-8 pb-4 px-6 flex justify-between items-end shrink-0">
          <div>
            <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${colors.accentText} mb-1 font-sans`}>Echt & Dichtbij</p>
            <h1 className="text-4xl font-black tracking-tight italic">
              {activeTheme.chaos ? (
                <span className={`animate-pulse ${colors.mainText}`}>✨Pure✨</span>
              ) : (
                <>Pure<span className={colors.mainText}>.</span></>
              )}
            </h1>
          </div>
          <div className="flex gap-2 relative z-50">
            <button 
              onClick={() => setShowSettings(true)}
              className={`p-3 ${shapes.button} shadow-sm border transition-all active:scale-95 bg-white/10 backdrop-blur-md ${colors.border}`}
            >
              <Settings className={`w-5 h-5 ${colors.icon}`} />
            </button>
            <button 
              onClick={() => setIsCustomActive(!isCustomActive)}
              className={`p-3 ${shapes.button} shadow-sm border transition-all active:scale-95 ${isCustomActive ? `${colors.mainBg} text-white ${colors.border}` : `bg-white/10 backdrop-blur-md ${colors.icon} ${colors.border}`}`}
              title="Zet jouw creatie aan of uit"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Feed Area */}
        <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 custom-scrollbar">
          {activeTab === 'home' && (
            <div className="space-y-8">
              
              {/* GROEPS-VIBE WIDGET */}
              <div className={`p-4 ${shapes.card} ${colors.lightBg} border border-dashed ${colors.borderDash} flex items-center justify-between shadow-sm relative overflow-hidden`}>
                <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-xl opacity-30 ${colors.mainBg}`}></div>
                <div className="relative z-10">
                  <p className={`text-[10px] uppercase font-bold tracking-widest ${colors.accentText} mb-1 flex items-center gap-1`}>
                    <Activity className="w-3 h-3"/> Groeps-Vibe
                  </p>
                  <p className="text-sm font-medium">
                    <span className={`font-black ${colors.mainText}`}>{groupVibeStats.percentage}%</span> van je vrienden voelt zich momenteel {groupVibeStats.mood.split(' ')[1].toLowerCase()}!
                  </p>
                </div>
                <div className="text-3xl animate-bounce relative z-10 ml-4">
                  {getReactionEmoji(groupVibeStats.mood)}
                </div>
              </div>

              {posts.map((post) => (
                <article key={post.id} className="relative">
                  <div className="flex items-center gap-2 mb-4 px-2">
                    <img src={post.userAvatar} className={`w-8 h-8 ${shapes.avatar} object-cover ring-2 ${colors.ring}`} alt={post.user} />
                    <div>
                      <p className="text-xs font-bold tracking-tight">
                        {post.user} <span className="text-[10px] opacity-80 ml-1" title={`Dag ${post.streak || 0}`}>{getPlantEmoji(post.streak)}</span>
                      </p>
                      {post.location && (
                        <div className={`flex items-center text-[10px] ${colors.accentText} font-medium`}>
                          <MapPin className="w-2.5 h-2.5 mr-0.5" />
                          {post.location}
                        </div>
                      )}
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                      <span className="text-[10px] opacity-40 font-bold uppercase tracking-tighter mb-0.5">{post.time}</span>
                      {post.mood && (
                        <span className={`text-[9px] px-1.5 py-0.5 ${shapes.soft} ${colors.lightBg} ${colors.mainText} font-bold`}>
                          {post.mood}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`relative overflow-hidden ${shapes.card} shadow-xl p-2 transition-all ${activeTheme.chaos ? `${bgs.card} border-2 ${colors.border}` : `${bgs.card} shadow-black/5`}`}>
                    <div className={`${shapes.image} overflow-hidden aspect-[4/5] bg-gray-500/10 relative`}>
                      <img src={post.image} className="w-full h-full object-cover" alt="Post content" />
                    </div>
                    
                    <div className="p-5">
                      <p className="text-sm font-medium leading-relaxed italic mb-4">
                        "{post.caption}"
                      </p>
                      
                      <div className="flex items-center gap-3">
                        {/* VIBE REACTIE KNOP */}
                        <button 
                          onClick={() => toggleReaction(post.id, post.mood)}
                          className={`flex items-center gap-2 px-4 py-2 ${shapes.button} transition-all ${post.reaction ? `${colors.lightBg} ${colors.mainText} scale-105` : `${bgs.input} opacity-70 hover:opacity-100`}`}
                        >
                          <span className={`text-lg leading-none ${!post.reaction && 'grayscale opacity-50'}`}>
                            {post.reaction || '🤍'}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest">{post.reaction ? 'Gevibed' : 'Vibe mee'}</span>
                        </button>

                        <button 
                          onClick={() => setCommentingId(post.id)}
                          className={`flex items-center gap-2 px-4 py-2 ${shapes.button} ${bgs.input} opacity-70 hover:opacity-100 transition-all`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{post.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'search' && (
             <div className="space-y-6">
                <div className={`${bgs.card} ${shapes.button} p-4 shadow-sm border ${colors.border} flex items-center`}>
                  <Search className={`w-5 h-5 ${colors.icon} mr-3`} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Zoek een bekende..." 
                    className="bg-transparent outline-none w-full text-sm font-medium" 
                  />
                </div>
                
                <div className="mb-2">
                  <p className={`text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 px-1`}>Vind jouw vibe</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                     <button
                        onClick={() => setSelectedVibeSearch(null)}
                        className={`shrink-0 px-3 py-1.5 text-xs font-bold ${shapes.button} border ${selectedVibeSearch === null ? `${colors.mainBg} text-white border-transparent shadow-md scale-105` : `${bgs.input} ${colors.border} opacity-70 hover:opacity-100`} transition-all`}
                     >
                       Alles
                     </button>
                    {MOODS.map(m => (
                      <button
                        key={m}
                        onClick={() => setSelectedVibeSearch(m)}
                        className={`shrink-0 px-3 py-1.5 text-xs font-bold ${shapes.button} border ${selectedVibeSearch === m ? `${colors.mainBg} text-white border-transparent shadow-md scale-105` : `${bgs.input} ${colors.border} opacity-70 hover:opacity-100`} transition-all`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {searchQuery || selectedVibeSearch ? (
                  <div className="space-y-3">
                    <p className="text-xs opacity-60 italic mb-2 px-1">Resultaten</p>
                    {MOCK_USERS.filter(u => {
                      const matchVibe = selectedVibeSearch ? u.mood === selectedVibeSearch : true;
                      const matchText = searchQuery ? (u.username.toLowerCase().includes(searchQuery.toLowerCase()) || u.fullName.toLowerCase().includes(searchQuery.toLowerCase())) : true;
                      return matchVibe && matchText;
                    }).map(u => (
                      <div key={u.username} className={`p-4 ${bgs.card} ${shapes.card} shadow-sm border ${colors.border} flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer`}>
                         <img src={u.avatar} className={`w-12 h-12 ${shapes.avatar} object-cover shrink-0`} alt={u.username} />
                         <div className="flex-1 min-w-0">
                           <h4 className="font-bold text-sm truncate">{u.username}</h4>
                           <p className="text-[10px] opacity-60 truncate">{u.fullName}</p>
                         </div>
                         <div className="text-right flex flex-col items-end">
                           <span className={`text-[10px] font-bold px-2 py-1 mb-1 ${colors.lightBg} ${colors.mainText} ${shapes.soft}`}>
                             {u.mood}
                           </span>
                           <p className={`text-[10px] font-medium opacity-60 flex items-center gap-0.5 ${colors.mainText}`}>
                             {getPlantEmoji(u.streak)} Dag {u.streak}
                           </p>
                         </div>
                      </div>
                    ))}
                    {MOCK_USERS.filter(u => {
                      const matchVibe = selectedVibeSearch ? u.mood === selectedVibeSearch : true;
                      const matchText = searchQuery ? (u.username.toLowerCase().includes(searchQuery.toLowerCase()) || u.fullName.toLowerCase().includes(searchQuery.toLowerCase())) : true;
                      return matchVibe && matchText;
                    }).length === 0 && (
                       <p className="text-sm opacity-50 text-center py-8">Niemand gevonden met deze vibe... ✨</p>
                    )}
                  </div>
                ) : (
                  <div className={`${bgs.card} p-8 ${shapes.card} shadow-lg border ${colors.border} relative overflow-hidden`}>
                    <Sparkles className={`absolute -top-6 -right-6 w-32 h-32 ${colors.icon} opacity-20 rotate-12`} />
                    <div className="relative z-10">
                      <h3 className="text-xl font-black tracking-tight italic mb-6 leading-snug">
                        Vroeger draaide het niet om algoritmes, maar om <span className={colors.mainText}>zelfexpressie.</span>
                      </h3>
                      <p className="text-xs opacity-60 leading-relaxed">
                        Geen advertenties, alleen jouw vrienden en jouw eigen unieke stijl.
                      </p>
                    </div>
                  </div>
                )}
             </div>
          )}

          {activeTab === 'new' && (
            <div className={`${bgs.card} ${shapes.card} p-6 shadow-xl border ${colors.border}`}>
                {isPostingAnimation ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                    <div className={`w-20 h-20 mb-6 rounded-full flex items-center justify-center ${colors.mainBg} text-white animate-bounce shadow-xl`}>
                      <Sparkles className="w-10 h-10 animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-black italic mb-2">Moment delen...</h2>
                    <p className="text-sm opacity-60">Jouw pure moment wordt vastgelegd.</p>
                  </div>
                ) : hasPostedToday ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
                    
                    {/* Micro-animation: Glow & Groeiend plantje */}
                    <div className="relative group">
                       <div className="absolute -inset-4 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
                       <div className={`relative w-24 h-24 mb-4 rounded-[2rem] flex items-center justify-center ${colors.mainBg} text-white shadow-xl hover:scale-105 transition-transform`}>
                         <span className="text-4xl">{getPlantEmoji(currentStreak)}</span>
                       </div>
                    </div>
                    
                    <h2 className="text-3xl font-black italic mb-2">Puur Genieten!</h2>
                    
                    <div className={`inline-block px-6 py-2 mb-6 rounded-full ${colors.lightBg} border border-dashed ${colors.borderDash} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
                      <p className={`relative text-sm font-black tracking-widest uppercase ${colors.mainText}`}>
                        {currentStreak} {currentStreak === 1 ? 'dag' : 'dagen'} jezelf geweest
                      </p>
                    </div>

                    <div className={`p-4 mb-6 rounded-2xl ${bgs.card} border ${colors.border} shadow-sm w-full max-w-xs mx-auto transform rotate-[-2deg]`}>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">Jouw vibe vandaag</p>
                      <p className="text-lg font-bold">{user.mood}</p>
                    </div>

                    <p className="text-sm opacity-70 mb-8 leading-relaxed max-w-[250px] mx-auto">
                      Tot morgen.<br/> Deel weer een moment als je wilt. ✨
                    </p>
                    
                    <div className="flex flex-col gap-3 w-full">
                      <button onClick={() => setShowShareModal(true)} className={`w-full py-4 bg-transparent border-2 border-dashed ${colors.borderDash} ${colors.mainText} ${shapes.button} font-bold text-xs uppercase tracking-widest hover:bg-gray-500/5 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm`}>
                        <Send className="w-4 h-4"/> Stuur dit naar iemand
                      </button>
                      
                      <button onClick={() => setActiveTab('home')} className={`w-full py-4 ${colors.mainBg} text-white ${shapes.button} font-bold text-xs uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all`}>
                        Terug naar Feed
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`w-full aspect-square ${colors.lightBg} ${shapes.image} flex flex-col items-center justify-center mb-6 border-2 border-dashed ${colors.borderDash} cursor-pointer`}>
                      <Plus className={`w-10 h-10 ${colors.icon} mb-2`} />
                      <p className={`text-[10px] font-bold ${colors.mainText} uppercase tracking-widest`}>Kies je foto</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className={`text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2`}>Hoe voel je je nu?</p>
                      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                        {MOODS.map(m => (
                          <button
                            key={m}
                            onClick={() => setNewPostMood(m)}
                            className={`shrink-0 px-3 py-1.5 text-xs font-bold ${shapes.button} border ${newPostMood === m ? `${colors.mainBg} text-white border-transparent shadow-md scale-105` : `${bgs.input} ${colors.border} opacity-70 hover:opacity-100`} transition-all`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea 
                        value={newCaption}
                        onChange={(e) => setNewCaption(e.target.value)}
                        placeholder="Wat is het verhaal?"
                        className="w-full bg-transparent border-none focus:ring-0 text-lg italic min-h-[80px] mb-4 outline-none resize-none"
                    ></textarea>
                    <button onClick={handlePost} className={`w-full ${colors.mainBg} text-white py-5 ${shapes.button} font-bold tracking-widest uppercase text-[10px] shadow-lg hover:brightness-110 transition-all`}>Moment Deel</button>
                  </>
                )}
            </div>
          )}

          {activeTab === 'profile' && (
             <div className="space-y-8">
                <div className="text-center relative z-40">
                  <img src={user.avatar} className={`mx-auto w-28 h-28 ${shapes.avatar} object-cover ring-8 ${bgs.card} shadow-xl mb-4`} alt="User profile" />
                  <h2 className="text-2xl font-black tracking-tight">{user.fullName}</h2>
                  
                  <div className="relative inline-block mt-2">
                    <button 
                      onClick={() => setShowMoodSelector(!showMoodSelector)} 
                      className={`px-3 py-1.5 ${bgs.card} ${shapes.button} border ${colors.border} text-[10px] font-bold ${colors.mainText} hover:scale-105 transition-transform flex items-center gap-1.5 mx-auto shadow-sm`}
                    >
                      Mood: {user.mood} 
                      <span className="text-[8px] opacity-50">{showMoodSelector ? '▲' : '▼'}</span>
                    </button>
                    
                    {showMoodSelector && (
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-3 ${bgs.card} ${shapes.card} shadow-2xl border ${colors.border} flex flex-wrap gap-2 justify-center animate-in slide-in-from-top-2 fade-in duration-200`}>
                        {MOODS.map(m => (
                          <button
                            key={m}
                            onClick={() => {
                              setUser({ ...user, mood: m });
                              setShowMoodSelector(false);
                            }}
                            className={`text-[11px] font-medium px-2 py-1.5 ${shapes.button} transition-colors ${user.mood === m ? `${colors.mainBg} text-white shadow-md` : 'hover:bg-gray-500/10'}`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* --- INTERACTIEVE MUZIEK WIDGET --- */}
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-widest opacity-60 mb-2 px-1">Mijn Widgets</h3>
                  <div className={`p-5 ${shapes.card} relative overflow-hidden transition-all duration-500 ${isPlaying ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-[1.02]' : `${bgs.card} border ${colors.border} shadow-sm`}`}>
                     
                     {/* Equalizer Animatie (alleen zichtbaar als isPlaying true is) */}
                     {isPlaying && (
                       <div className="absolute top-4 right-4 flex gap-1.5 items-end h-6 opacity-80">
                          <div className="w-1.5 bg-white rounded-full eq-bar" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 bg-white rounded-full eq-bar" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-1.5 bg-white rounded-full eq-bar" style={{ animationDelay: '0.0s' }}></div>
                          <div className="w-1.5 bg-white rounded-full eq-bar" style={{ animationDelay: '0.2s' }}></div>
                       </div>
                     )}

                     <div className="flex items-center gap-4 relative z-10">
                       <button onClick={() => setIsPlaying(!isPlaying)} className={`w-12 h-12 ${shapes.button} flex items-center justify-center transition-all ${isPlaying ? `bg-white/20 text-white backdrop-blur-md hover:scale-110` : `${bgs.input} opacity-60 hover:opacity-100`}`}>
                         {isPlaying ? <Volume2 className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                       </button>
                       <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2">
                           <p className={`text-[10px] uppercase font-bold tracking-widest ${isPlaying ? 'opacity-80 text-white' : 'opacity-50'}`}>
                             {isPlaying ? 'Nu aan het luisteren' : 'Mijn Vibe Nummer'}
                           </p>
                           {!isEditingSong && !isPlaying && (
                             <button 
                               onClick={() => { setIsEditingSong(true); setNewProfileSong(user.profileSong); }}
                               className={`opacity-40 hover:opacity-100 ${colors.mainText}`}
                             >
                               <Edit2 className="w-3 h-3" />
                             </button>
                           )}
                         </div>
                         {isEditingSong ? (
                            <div className="flex items-center gap-2 mt-1">
                              <input 
                                type="text" 
                                value={newProfileSong} 
                                onChange={e => setNewProfileSong(e.target.value)} 
                                className={`flex-1 ${bgs.input} text-xs p-1.5 ${shapes.soft} outline-none border focus:${colors.border} text-gray-900`} 
                                autoFocus 
                              />
                              <button 
                                onClick={() => { setUser({...user, profileSong: newProfileSong}); setIsEditingSong(false); }} 
                                className={`p-1.5 ${colors.mainBg} text-white ${shapes.soft}`}
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            </div>
                         ) : (
                            <p className={`text-sm font-bold truncate mt-0.5 ${isPlaying ? 'text-white' : ''}`}>
                              {user.profileSong}
                            </p>
                         )}
                       </div>
                     </div>
                  </div>
                </div>

                {/* --- STATS & STREAKS --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-5 ${shapes.card} border ${colors.lightBg} ${colors.borderDash} text-center flex flex-col items-center justify-center relative overflow-hidden`}>
                    {/* Zachte glow op basis van progressie */}
                    {currentStreak > 0 && <div className="absolute -inset-4 bg-green-400/10 rounded-full blur-2xl"></div>}
                    <div className="text-2xl mb-2 relative z-10">
                       {getPlantEmoji(currentStreak)}
                    </div>
                    <span className="text-3xl font-black relative z-10">{currentStreak}</span>
                    <span className="text-[9px] uppercase font-bold opacity-60 tracking-widest mt-1 relative z-10">Dagen Jezelf</span>
                  </div>
                  <div className={`p-5 ${shapes.card} border ${colors.lightBg} ${colors.borderDash} text-center flex flex-col items-center justify-center`}>
                    <ImageIcon className={`w-6 h-6 mb-2 ${colors.mainText}`} />
                    <span className="text-3xl font-black">{postHistory.length}</span>
                    <span className="text-[9px] uppercase font-bold opacity-50 tracking-widest mt-1">Totale Posts</span>
                  </div>
                </div>

                {/* --- SLIMME VIBE CHECK --- */}
                {vibeCheck && vibeCheck.total >= 2 && (
                  <div className={`p-5 ${shapes.card} border ${colors.border} ${bgs.card} relative overflow-hidden shadow-sm`}>
                    <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl opacity-30 ${colors.mainBg}`}></div>
                    <h3 className="text-xs uppercase font-bold tracking-widest opacity-60 mb-3 flex items-center gap-2 relative z-10">
                      <Smile className="w-4 h-4"/> Jouw Vibe Check
                    </h3>
                    <p className="text-sm font-medium leading-relaxed mb-4 relative z-10">
                      {vibeCheck.energiekCount > vibeCheck.rustigCount 
                        ? "Veel energie deze week ⚡ Je zat lekker in je flow." 
                        : vibeCheck.rustigCount > vibeCheck.energiekCount 
                        ? "Je week voelde rustig. Je nam de tijd 🌿." 
                        : "Een mooie balans van rust en energie deze week ✨."}
                    </p>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {vibeCheck.energiekCount > 0 && (
                        <span className={`text-[10px] font-bold px-2.5 py-1.5 ${shapes.soft} ${colors.lightBg} ${colors.mainText} border border-dashed ${colors.borderDash}`}>
                          {vibeCheck.energiekCount} energieke dagen ⚡
                        </span>
                      )}
                      {vibeCheck.rustigCount > 0 && (
                        <span className={`text-[10px] font-bold px-2.5 py-1.5 ${shapes.soft} bg-blue-50 text-blue-600 border border-dashed border-blue-200`}>
                          {vibeCheck.rustigCount} rustige dagen 🌿
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* --- CALENDAR --- */}
                <div className={`p-5 ${shapes.card} border ${colors.lightBg} ${colors.borderDash}`}>
                   <div className="flex items-center justify-between mb-5">
                     <h3 className="text-xs uppercase font-bold tracking-widest opacity-60">Jouw Week</h3>
                     <Calendar className={`w-4 h-4 ${colors.icon}`} />
                   </div>
                   <div className="flex justify-between items-center">
                     {[...Array(7)].map((_, i) => {
                       const d = new Date();
                       d.setDate(d.getDate() - (6 - i));
                       const dateStr = getLocalDateStr(d);
                       const didPost = postHistory.map(p => p.date).includes(dateStr);
                       const isToday = dateStr === todayStr;

                       return (
                         <div key={dateStr} className="flex flex-col items-center gap-2">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${didPost ? `${colors.mainBg} text-white shadow-md scale-110` : isToday ? `border-2 border-dashed ${colors.borderDash} opacity-80` : `${bgs.input} opacity-40`}`}>
                             {didPost ? <Check className="w-4 h-4"/> : d.getDate()}
                           </div>
                           <span className={`text-[8px] font-bold uppercase ${isToday ? colors.mainText : 'opacity-40'}`}>
                             {['Zo','Ma','Di','Wo','Do','Vr','Za'][d.getDay()]}
                           </span>
                         </div>
                       )
                     })}
                   </div>
                </div>

                {/* --- DAGBOEK --- */}
                <div className={`p-5 ${shapes.card} border ${colors.lightBg} ${colors.borderDash}`}>
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xs uppercase font-bold tracking-widest opacity-60">Mijn Dagboek</h3>
                     <Book className={`w-4 h-4 ${colors.icon}`} />
                   </div>

                   <div className="mb-6">
                     <textarea
                       value={newDiaryEntry}
                       onChange={(e) => setNewDiaryEntry(e.target.value)}
                       placeholder="Hoe voel je je vandaag? (Alleen voor jou zichtbaar)"
                       className={`w-full p-3 ${shapes.soft} ${bgs.input} text-sm outline-none border border-transparent focus:${colors.border} resize-none min-h-[80px] mb-2`}
                     ></textarea>
                     <button
                       onClick={handleAddDiaryEntry}
                       className={`w-full py-3 ${colors.mainBg} text-white ${shapes.button} font-bold text-[10px] uppercase tracking-widest shadow-md hover:brightness-110 transition-all`}
                     >
                       Bewaar in dagboek
                     </button>
                   </div>

                   <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                     {diaryEntries.map(entry => (
                       <div key={entry.id} className={`p-3 ${shapes.soft} ${bgs.card} border ${colors.border} shadow-sm`}>
                         <span className={`text-[9px] font-bold uppercase tracking-widest ${colors.accentText} mb-1 block`}>{entry.date}</span>
                         <p className="text-xs leading-relaxed italic opacity-80">"{entry.text}"</p>
                       </div>
                     ))}
                     {diaryEntries.length === 0 && (
                       <p className="text-xs text-center opacity-50 italic">Nog geen dagboekberichten.</p>
                     )}
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-2xl font-black tracking-tight italic">Berichten</h2>
                <button 
                  onClick={() => setShowNewChatModal(true)}
                  className={`p-2 ${shapes.button} ${colors.lightBg} ${colors.mainText} font-bold text-xs flex items-center gap-1`}
                >
                  <Plus className="w-4 h-4" /> Nieuw
                </button>
              </div>

              <div className="space-y-3">
                {chats.map(chat => (
                  <div 
                    key={chat.id} 
                    onClick={() => setActiveChatId(chat.id)}
                    className={`p-4 ${bgs.card} ${shapes.card} shadow-sm border ${colors.border} flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform`}
                  >
                    {chat.type === 'group' ? (
                      <div className={`w-12 h-12 ${shapes.avatar} bg-gray-200 flex items-center justify-center shrink-0`}>
                        <Users className="w-6 h-6 text-gray-500" />
                      </div>
                    ) : (
                      <img src={chat.avatar} className={`w-12 h-12 ${shapes.avatar} object-cover shrink-0`} alt={chat.name} />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate flex items-center gap-2">
                        {chat.name}
                        {chat.type === 'direct' && chat.streak !== undefined && (
                          <span className={`text-[10px] font-medium opacity-60 flex items-center gap-0.5 ${colors.mainText}`}>
                            {getPlantEmoji(chat.streak)} Dag {chat.streak}
                          </span>
                        )}
                      </h4>
                      <p className="text-xs opacity-60 truncate">
                        {chat.messages.length > 0 
                          ? `${chat.messages[chat.messages.length - 1].sender === user.username ? 'Jij: ' : ''}${chat.messages[chat.messages.length - 1].text}`
                          : 'Nog geen berichten'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* SETTINGS OVERLAY (Zwevend bovenop alles) */}
        {showSettings && (
          <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center justify-end">
            <div className={`w-full ${bgs.card} ${shapes.modal} p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90%] overflow-y-auto custom-scrollbar flex flex-col`}>
              
              <div className="flex justify-between items-center mb-8 shrink-0">
                <h3 className="text-2xl font-black tracking-tight italic">Uiterlijk Aanpassen 🎨</h3>
                <button 
                    onClick={() => setShowSettings(false)} 
                    className={`p-3 ${bgs.input} ${shapes.button} hover:scale-110 transition-transform`}
                >
                  <X className="w-6 h-6 opacity-60" />
                </button>
              </div>
              
              <div className="space-y-10 flex-1 pb-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40">Accent Kleur</p>
                  <div className="flex gap-4">
                    {Object.keys(THEME.colors).map(c => (
                      <button 
                        key={c} 
                        onClick={() => updateCustom('color', c)} 
                        className={`w-12 h-12 ${THEME.shapes[customSettings.shape].button} ${THEME.colors[c].mainBg} ${customSettings.color === c ? 'ring-4 ring-offset-4 ring-black/20 scale-110 shadow-lg' : 'opacity-80 hover:scale-105'} transition-all`} 
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40">Pagina Stijl</p>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.keys(THEME.bgs).map(b => (
                      <button 
                        key={b} 
                        onClick={() => updateCustom('bg', b)} 
                        className={`py-4 text-xs font-black ${THEME.shapes[customSettings.shape].button} border-2 capitalize transition-all ${customSettings.bg === b ? `${THEME.colors[customSettings.color].mainText} border-current ${THEME.colors[customSettings.color].lightBg}` : 'border-transparent bg-gray-500/5 hover:bg-gray-500/10'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40">Afronding</p>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.keys(THEME.shapes).map(s => (
                      <button 
                        key={s} 
                        onClick={() => updateCustom('shape', s)} 
                        className={`py-4 text-xs font-black ${THEME.shapes[s].button} border-2 capitalize transition-all ${customSettings.shape === s ? `${THEME.colors[customSettings.color].mainText} border-current ${THEME.colors[customSettings.color].lightBg}` : 'border-transparent bg-gray-500/5 hover:bg-gray-500/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40">Lettertype</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(THEME.fonts).map(f => (
                      <button 
                        key={f} 
                        onClick={() => updateCustom('font', f)} 
                        style={{ fontFamily: THEME.fonts[f] }}
                        className={`py-4 text-sm font-bold ${THEME.shapes[customSettings.shape].button} border-2 capitalize transition-all ${customSettings.font === f ? `${THEME.colors[customSettings.color].mainText} border-current ${THEME.colors[customSettings.color].lightBg}` : 'border-transparent bg-gray-500/5 hover:bg-gray-500/10'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => updateCustom('chaos', !customSettings.chaos)}
                    className={`w-full py-5 ${THEME.shapes[customSettings.shape].button} font-black text-sm transition-all flex items-center justify-center gap-3 ${customSettings.chaos ? `${THEME.colors[customSettings.color].mainBg} text-white shadow-xl scale-[1.02]` : 'bg-gray-500/10 shadow-inner'}`}
                  >
                    <Sparkles className={`w-5 h-5 ${customSettings.chaos ? 'animate-spin' : ''}`} /> 
                    Chaos Modus {customSettings.chaos ? 'ACTIEF' : 'UIT'}
                  </button>
                </div>
              </div>

              {/* Opslaan Knop onderaan het menu */}
              <div className="pt-6 border-t mt-auto shrink-0">
                <button 
                  onClick={() => setShowSettings(false)}
                  className={`w-full py-5 ${colors.mainBg} text-white ${shapes.button} font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.98] transition-all`}
                >
                  <Check className="w-5 h-5" /> Opslaan & Sluiten
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE CHAT OVERLAY */}
        {activeChatId && (
          <div className={`absolute inset-0 z-[60] ${bgs.page} flex flex-col`}>
            {(() => {
              const chat = chats.find(c => c.id === activeChatId);
              return (
                <>
                  <header className={`p-4 flex items-center gap-4 ${bgs.card} border-b ${colors.border} shrink-0`}>
                    <button onClick={() => setActiveChatId(null)} className="p-2 hover:bg-gray-500/10 rounded-full">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    {chat.type === 'group' ? (
                      <div className={`w-10 h-10 ${shapes.avatar} bg-gray-200 flex items-center justify-center shrink-0`}>
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                    ) : (
                      <img src={chat.avatar} className={`w-10 h-10 ${shapes.avatar} object-cover shrink-0`} alt={chat.name} />
                    )}
                    <div>
                      <h2 className="font-bold text-lg leading-tight">{chat.name}</h2>
                      {chat.type === 'direct' && chat.streak !== undefined && (
                        <p className={`text-[10px] font-bold opacity-80 ${colors.mainText}`}>
                          {getPlantEmoji(chat.streak)} Zit op dag {chat.streak}
                        </p>
                      )}
                    </div>
                  </header>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {chat.messages.map(msg => {
                      const isMe = msg.sender === user.username;
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[80%] p-3 ${shapes.soft} ${isMe ? `${colors.mainBg} text-white` : `${bgs.input} text-current shadow-sm border ${colors.border}`}`}>
                            {!isMe && chat.type === 'group' && <p className="text-[10px] font-bold opacity-50 mb-1">{msg.sender}</p>}
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <span className="text-[9px] opacity-40 mt-1">{msg.time}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className={`p-4 ${bgs.card} border-t ${colors.border} shrink-0`}>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Typ een bericht..." 
                        className={`flex-1 p-3 ${shapes.button} ${bgs.input} text-sm outline-none border border-transparent focus:${colors.border}`}
                      />
                      <button 
                        onClick={sendMessage}
                        className={`p-3 ${shapes.button} ${colors.mainBg} text-white flex shrink-0 items-center justify-center shadow-md`}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* NEW CHAT MODAL */}
        {showNewChatModal && (
          <div className="absolute inset-0 z-[70] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-4">
             <div className={`w-full max-w-sm ${bgs.card} ${shapes.card} p-6 shadow-2xl animate-in zoom-in-95 duration-200`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black italic">Nieuwe Chat</h3>
                  <button onClick={() => setShowNewChatModal(false)}><X className="w-5 h-5 opacity-60" /></button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setNewChatType('direct')}
                      className={`flex-1 py-2 text-xs font-bold ${shapes.button} transition-colors ${newChatType === 'direct' ? `${colors.mainBg} text-white` : `${bgs.input}`}`}
                    >
                      Persoonlijk
                    </button>
                    <button 
                      onClick={() => setNewChatType('group')}
                      className={`flex-1 py-2 text-xs font-bold ${shapes.button} transition-colors ${newChatType === 'group' ? `${colors.mainBg} text-white` : `${bgs.input}`}`}
                    >
                      Groep
                    </button>
                  </div>
                  
                  <input 
                    type="text" 
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                    placeholder={newChatType === 'direct' ? "Gebruikersnaam..." : "Groepsnaam..."}
                    className={`w-full p-4 ${bgs.input} ${shapes.button} outline-none text-sm border ${colors.border}`}
                  />
                  
                  <button 
                    onClick={createNewChat}
                    className={`w-full py-4 ${colors.mainBg} text-white ${shapes.button} font-bold text-xs uppercase tracking-widest mt-2`}
                  >
                    Start Gesprek
                  </button>
                </div>
             </div>
          </div>
        )}

        {/* SHARE MODAL */}
        {showShareModal && (
          <div className="absolute inset-0 z-[80] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-4">
             <div className={`w-full max-w-sm ${bgs.card} ${shapes.card} p-6 shadow-2xl animate-in zoom-in-95 duration-200`}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-black italic">Deel je moment ✨</h3>
                    <p className="text-xs opacity-60 mt-1">Met wie wil je je vibe delen?</p>
                  </div>
                  <button onClick={() => setShowShareModal(false)}><X className="w-5 h-5 opacity-60 hover:opacity-100" /></button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                  {chats.map(chat => (
                    <button 
                      key={chat.id} 
                      onClick={() => handleShareVibe(chat.id)}
                      className={`w-full p-4 flex items-center gap-4 ${bgs.input} ${shapes.button} hover:scale-[1.02] active:scale-95 transition-transform text-left border border-transparent hover:${colors.border}`}
                    >
                      {chat.type === 'group' ? (
                        <div className={`w-10 h-10 ${shapes.avatar} bg-gray-200 flex items-center justify-center shrink-0`}>
                          <Users className="w-5 h-5 text-gray-500" />
                        </div>
                      ) : (
                        <img src={chat.avatar} className={`w-10 h-10 ${shapes.avatar} object-cover shrink-0`} alt={chat.name} />
                      )}
                      <span className="font-bold text-sm truncate flex-1">{chat.name}</span>
                      <Send className={`w-4 h-4 ${colors.icon} opacity-50`} />
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* Floating Navigation */}
        <div className="absolute bottom-6 left-0 right-0 px-6 z-[40]">
          <nav className={`${bgs.nav} ${shapes.card} p-2 flex justify-between items-center shadow-2xl`}>
            <button onClick={() => setActiveTab('home')} className={`p-4 ${shapes.button} transition-all ${activeTab === 'home' ? `${colors.mainBg} text-white shadow-lg` : bgs.navText}`}><Home className="w-5 h-5" /></button>
            <button onClick={() => setActiveTab('search')} className={`p-4 ${shapes.button} transition-all ${activeTab === 'search' ? `${colors.mainBg} text-white shadow-lg` : bgs.navText}`}><Search className="w-5 h-5" /></button>
            <button onClick={() => setActiveTab('new')} className={`p-4 ${shapes.button} transition-all ${activeTab === 'new' ? `${colors.mainBg} text-white shadow-lg` : bgs.navText}`}><Plus className="w-5 h-5" /></button>
            <button onClick={() => setActiveTab('messages')} className={`p-4 ${shapes.button} transition-all ${activeTab === 'messages' ? `${colors.mainBg} text-white shadow-lg` : bgs.navText}`}><MessageSquare className="w-5 h-5" /></button>
            <button onClick={() => setActiveTab('profile')} className={`p-4 ${shapes.button} transition-all ${activeTab === 'profile' ? `${colors.mainBg} text-white shadow-lg` : bgs.navText}`}><User className="w-5 h-5" /></button>
          </nav>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,800;1,400;1,800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        
        * { 
          font-family: ${fontStyle}; 
          transition: background-color 0.4s ease, border-color 0.4s ease, border-radius 0.4s ease, font-family 0.4s ease, transform 0.2s ease;
        }
        
        ${activeTheme.chaos ? `
          article { animation: shake 5s infinite; }
          @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(0.5deg); }
            75% { transform: rotate(-0.5deg); }
            100% { transform: rotate(0deg); }
          }
        ` : ''}

        /* Equalizer Animation voor Profiel Widget */
        @keyframes eq {
          0% { height: 4px; }
          50% { height: 20px; }
          100% { height: 4px; }
        }
        .eq-bar {
          animation: eq 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}