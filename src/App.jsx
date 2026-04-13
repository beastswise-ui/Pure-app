import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
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
reaction: null,
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
reaction: '🔥',
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

function App() {
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

// HERSCHREVEN DATUM FUNCTIES VOOR STRIKTE COMPATIBILITEIT
const getLocalDateStr = (d) => {
const year = d.getFullYear();
const month = String(d.getMonth() + 1).padStart(2, '0');
const day = String(d.getDate()).padStart(2, '0');
return year + '-' + month + '-' + day;
};

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

const groupVibeStats = React.useMemo(() => {
const moodCounts = {};
MOCK_USERS.forEach(u => {
moodCounts[u.mood] = (moodCounts[u.mood] || 0) + 1;
});
const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
const percentage = Math.round((moodCounts[dominantMood] / MOCK_USERS.length) * 100);
return { mood: dominantMood, percentage };
}, []);

const [chats, setChats] = useState(initialChats);
const [activeChatId, setActiveChatId] = useState(null);
const [chatInput, setChatInput] = useState('');
const [showNewChatModal, setShowNewChatModal] = useState(false);
const [newChatName, setNewChatName] = useState('');
const [newChatType, setNewChatType] = useState('direct');

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

const toggleReaction = (postId, postMood) => {
setPosts(posts.map(post => {
if (post.id === postId) {
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
image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=600&fit=crop',
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
const messageText = 'Ik heb net mijn moment gedeeld! Mijn vibe vandaag is ' + moodToShare + '. ' + currentPlant + ' (Streak: ' + currentStreak + ' dagen)';

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
<div className={'min-h-screen flex justify-center transition-colors duration-500 ' + bgs.page}>
<div className="w-full max-w-md h-screen relative flex flex-col overflow-hidden shadow-2xl bg-inherit">

{/* Header */}
<header className="pt-8 pb-4 px-6 flex justify-between items-end shrink-0">
<div>
<p className={'text-[10px] uppercase tracking-[0.2em] font-bold ' + colors.accentText + ' mb-1 font-sans'}>Echt & Dichtbij</p>
<h1 className="text-4xl font-black tracking-tight italic">
{activeTheme.chaos ? (
<span className={'animate-pulse ' + colors.mainText}>✨Pure✨</span>
) : (
<>Pure<span className={colors.mainText}>.</span></>
)}
</h1>
</div>
<div className="flex gap-2 relative z-50">
<button onClick={() => setShowSettings(true)} className={'p-3 ' + shapes.button + ' shadow-sm border transition-all active:scale-95 bg-white/10 backdrop-blur-md ' + colors.border}>
<Settings className={'w-5 h-5 ' + colors.icon} />
</button>
<button onClick={() => setIsCustomActive(!isCustomActive)} className={'p-3 ' + shapes.button + ' shadow-sm border transition-all active:scale-95 ' + (isCustomActive ? colors.mainBg + ' text-white ' + colors.border : 'bg-white/10 backdrop-blur-md ' + colors.icon + ' ' + colors.border)}>
<Sparkles className="w-5 h-5" />
</button>
</div>
</header>

<main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 custom-scrollbar">
{activeTab === 'home' && (
<div className="space-y-8">
<div className={'p-4 ' + shapes.card + ' ' + colors.lightBg + ' border border-dashed ' + colors.borderDash + ' flex items-center justify-between shadow-sm relative overflow-hidden'}>
<div className={'absolute -right-4 -top-4 w-16 h-16 rounded-full blur-xl opacity-30 ' + colors.mainBg}></div>
<div className="relative z-10">
<p className={'text-[10px] uppercase font-bold tracking-widest ' + colors.accentText + ' mb-1 flex items-center gap-1'}><Activity className="w-3 h-3"/> Groeps-Vibe</p>
<p className="text-sm font-medium"><span className={'font-black ' + colors.mainText}>{groupVibeStats.percentage}%</span> van je vrienden voelt zich momenteel {groupVibeStats.mood.split(' ')[1].toLowerCase()}!</p>
</div>
<div className="text-3xl animate-bounce relative z-10 ml-4">{getReactionEmoji(groupVibeStats.mood)}</div>
</div>

{posts.map((post) => (
<article key={post.id} className="relative">
<div className="flex items-center gap-2 mb-4 px-2">
<img src={post.userAvatar} className={'w-8 h-8 ' + shapes.avatar + ' object-cover ring-2 ' + colors.ring} alt={post.user} />
<div>
<p className="text-xs font-bold tracking-tight">{post.user} <span className="text-[10px] opacity-80 ml-1">{getPlantEmoji(post.streak)}</span></p>
{post.location && <div className={'flex items-center text-[10px] ' + colors.accentText + ' font-medium'}><MapPin className="w-2.5 h-2.5 mr-0.5" />{post.location}</div>}
</div>
<div className="ml-auto flex flex-col items-end">
<span className="text-[10px] opacity-40 font-bold uppercase tracking-tighter mb-0.5">{post.time}</span>
{post.mood && <span className={'text-[9px] px-1.5 py-0.5 ' + shapes.soft + ' ' + colors.lightBg + ' ' + colors.mainText + ' font-bold'}>{post.mood}</span>}
</div>
</div>
<div className={'relative overflow-hidden ' + shapes.card + ' shadow-xl p-2 transition-all ' + (activeTheme.chaos ? bgs.card + ' border-2 ' + colors.border : bgs.card + ' shadow-black/5')}>
<div className={shapes.image + ' overflow-hidden aspect-[4/5] bg-gray-500/10 relative'}><img src={post.image} className="w-full h-full object-cover" alt="Post content" /></div>
<div className="p-5">
<p className="text-sm font-medium leading-relaxed italic mb-4">"{post.caption}"</p>
<div className="flex items-center gap-3">
<button onClick={() => toggleReaction(post.id, post.mood)} className={'flex items-center gap-2 px-4 py-2 ' + shapes.button + ' transition-all ' + (post.reaction ? colors.lightBg + ' ' + colors.mainText + ' scale-105' : bgs.input + ' opacity-70 hover:opacity-100')}><span className={'text-lg leading-none ' + (!post.reaction && 'grayscale opacity-50')}>{post.reaction || '🤍'}</span><span className="text-[10px] font-bold uppercase tracking-widest">{post.reaction ? 'Gevibed' : 'Vibe mee'}</span></button>
<button className={'flex items-center gap-2 px-4 py-2 ' + shapes.button + ' ' + bgs.input + ' opacity-70 hover:opacity-100 transition-all'}><MessageCircle className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">{post.comments.length}</span></button>
</div>
</div>
</div>
</article>
))}
</div>
)}

{activeTab === 'search' && (
<div className="space-y-6">
<div className={bgs.card + ' ' + shapes.button + ' p-4 shadow-sm border ' + colors.border + ' flex items-center'}>
<Search className={'w-5 h-5 ' + colors.icon + ' mr-3'} />
<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Zoek een bekende..." className="bg-transparent outline-none w-full text-sm font-medium" />
</div>
<div className="mb-2">
<p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 px-1">Vind jouw vibe</p>
<div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
<button onClick={() => setSelectedVibeSearch(null)} className={'shrink-0 px-3 py-1.5 text-xs font-bold ' + shapes.button + ' border ' + (selectedVibeSearch === null ? colors.mainBg + ' text-white border-transparent shadow-md scale-105' : bgs.input + ' ' + colors.border + ' opacity-70 hover:opacity-100') + ' transition-all'}>Alles</button>
{MOODS.map(m => (
<button key={m} onClick={() => setSelectedVibeSearch(m)} className={'shrink-0 px-3 py-1.5 text-xs font-bold ' + shapes.button + ' border ' + (selectedVibeSearch === m ? colors.mainBg + ' text-white border-transparent shadow-md scale-105' : bgs.input + ' ' + colors.border + ' opacity-70 hover:opacity-100') + ' transition-all'}>{m}</button>
))}
</div>
</div>
{(searchQuery || selectedVibeSearch) && (
<div className="space-y-3">
{MOCK_USERS.filter(u => {
const matchVibe = selectedVibeSearch ? u.mood === selectedVibeSearch : true;
const matchText = searchQuery ? (u.username.toLowerCase().includes(searchQuery.toLowerCase()) || u.fullName.toLowerCase().includes(searchQuery.toLowerCase())) : true;
return matchVibe && matchText;
}).map(u => (
<div key={u.username} className={'p-4 ' + bgs.card + ' ' + shapes.card + ' shadow-sm border ' + colors.border + ' flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer'}>
<img src={u.avatar} className={'w-12 h-12 ' + shapes.avatar + ' object-cover shrink-0'} alt={u.username} />
<div className="flex-1 min-w-0"><h4 className="font-bold text-sm truncate">{u.username}</h4><p className="text-[10px] opacity-60 truncate">{u.fullName}</p></div>
<div className="text-right flex flex-col items-end"><span className={'text-[10px] font-bold px-2 py-1 mb-1 ' + colors.lightBg + ' ' + colors.mainText + ' ' + shapes.soft}>{u.mood}</span><p className={'text-[10px] font-medium opacity-60 flex items-center gap-0.5 ' + colors.mainText}>{getPlantEmoji(u.streak)} Dag {u.streak}</p></div>
</div>
))}
</div>
)}
</div>
)}

{activeTab === 'new' && (
<div className={bgs.card + ' ' + shapes.card + ' p-6 shadow-xl border ' + colors.border}>
{isPostingAnimation ? (
<div className="flex flex-col items-center justify-center py-16 text-center"><div className={'w-20 h-20 mb-6 rounded-full flex items-center justify-center ' + colors.mainBg + ' text-white animate-bounce shadow-xl'}><Sparkles className="w-10 h-10 animate-pulse" /></div><h2 className="text-2xl font-black italic mb-2">Moment delen...</h2></div>
) : hasPostedToday ? (
<div className="flex flex-col items-center justify-center py-12 text-center">
<div className={'relative w-24 h-24 mb-4 rounded-[2rem] flex items-center justify-center ' + colors.mainBg + ' text-white shadow-xl'}><span className="text-4xl">{getPlantEmoji(currentStreak)}</span></div>
<h2 className="text-3xl font-black italic mb-2">Puur Genieten!</h2>
<div className={'inline-block px-6 py-2 mb-6 rounded-full ' + colors.lightBg + ' border border-dashed ' + colors.borderDash}><p className={'text-sm font-black tracking-widest uppercase ' + colors.mainText}>{currentStreak} {currentStreak === 1 ? 'dag' : 'dagen'} jezelf geweest</p></div>
<button onClick={() => setActiveTab('home')} className={'w-full py-4 ' + colors.mainBg + ' text-white ' + shapes.button + ' font-bold text-xs uppercase tracking-widest shadow-lg'}>Terug naar Feed</button>
</div>
) : (
<>
<div className={'w-full aspect-square ' + colors.lightBg + ' ' + shapes.image + ' flex flex-col items-center justify-center mb-6 border-2 border-dashed ' + colors.borderDash + ' cursor-pointer'}><Plus className={'w-10 h-10 ' + colors.icon + ' mb-2'} /><p className={'text-[10px] font-bold ' + colors.mainText + ' uppercase tracking-widest'}>Kies je foto</p></div>
<textarea value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="Wat is het verhaal?" className="w-full bg-transparent border-none focus:ring-0 text-lg italic min-h-[80px] mb-4 outline-none resize-none"></textarea>
<button onClick={handlePost} className={'w-full ' + colors.mainBg + ' text-white py-5 ' + shapes.button + ' font-bold tracking-widest uppercase text-[10px] shadow-lg'}>Moment Deel</button>
</>
)}
</div>
)}

{activeTab === 'profile' && (
<div className="space-y-8">
<div className="text-center relative z-40">
<img src={user.avatar} className={'mx-auto w-28 h-28 ' + shapes.avatar + ' object-cover ring-8 ' + bgs.card + ' shadow-xl mb-4'} alt="User profile" />
<h2 className="text-2xl font-black tracking-tight">{user.fullName}</h2>
<button onClick={() => setShowMoodSelector(!showMoodSelector)} className={'px-3 py-1.5 ' + bgs.card + ' ' + shapes.button + ' border ' + colors.border + ' text-[10px] font-bold ' + colors.mainText + ' flex items-center gap-1.5 mx-auto shadow-sm mt-2'}>Mood: {user.mood}</button>
</div>
<div className={'p-5 ' + shapes.card + ' ' + (isPlaying ? 'bg-indigo-600 text-white shadow-lg' : bgs.card + ' border ' + colors.border + ' shadow-sm')}>
<div className="flex items-center gap-4">
<button onClick={() => setIsPlaying(!isPlaying)} className={'w-12 h-12 ' + shapes.button + ' flex items-center justify-center ' + (isPlaying ? 'bg-white/20' : bgs.input)}>{isPlaying ? <Volume2 className="w-5 h-5" /> : <Music className="w-5 h-5" />}</button>
<div className="flex-1 min-w-0"><p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Mijn Vibe Nummer</p><p className="text-sm font-bold truncate mt-0.5">{user.profileSong}</p></div>
</div>
</div>
</div>
)}

{activeTab === 'messages' && (
<div className="space-y-6">
<h2 className="text-2xl font-black tracking-tight italic">Berichten</h2>
<div className="space-y-3">
{chats.map(chat => (
<div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={'p-4 ' + bgs.card + ' ' + shapes.card + ' shadow-sm border ' + colors.border + ' flex items-center gap-4 cursor-pointer'}>
<img src={chat.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop'} className={'w-12 h-12 ' + shapes.avatar + ' object-cover shrink-0'} alt={chat.name} />
<div className="flex-1 min-w-0"><h4 className="font-bold text-sm truncate">{chat.name}</h4><p className="text-xs opacity-60 truncate">Klik om te chatten</p></div>
</div>
))}
</div>
</div>
)}
</main>

{/* SETTINGS OVERLAY */}
{showSettings && (
<div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center justify-end">
<div className={'w-full ' + bgs.card + ' ' + shapes.modal + ' p-8 shadow-2xl overflow-y-auto'}>
<div className="flex justify-between items-center mb-8 shrink-0"><h3 className="text-2xl font-black italic">Aanpassen 🎨</h3><button onClick={() => setShowSettings(false)} className={'p-3 ' + bgs.input + ' ' + shapes.button}><X className="w-6 h-6 opacity-60" /></button></div>
<div className="space-y-10 pb-10">
<div className="flex gap-4">{Object.keys(THEME.colors).map(c => (<button key={c} onClick={() => updateCustom('color', c)} className={'w-12 h-12 ' + THEME.shapes[customSettings.shape].button + ' ' + THEME.colors[c].mainBg} />))}</div>
<button onClick={() => setShowSettings(false)} className={'w-full py-5 ' + colors.mainBg + ' text-white ' + shapes.button + ' font-black uppercase'}>Klaar</button>
</div>
</div>
</div>
)}

{/* Floating Navigation */}
<div className="absolute bottom-6 left-0 right-0 px-6 z-[40]">
<nav className={bgs.nav + ' ' + shapes.card + ' p-2 flex justify-between items-center shadow-2xl'}>
<button onClick={() => setActiveTab('home')} className={'p-4 ' + shapes.button + ' ' + (activeTab === 'home' ? colors.mainBg + ' text-white shadow-lg' : bgs.navText)}><Home className="w-5 h-5" /></button>
<button onClick={() => setActiveTab('search')} className={'p-4 ' + shapes.button + ' ' + (activeTab === 'search' ? colors.mainBg + ' text-white shadow-lg' : bgs.navText)}><Search className="w-5 h-5" /></button>
<button onClick={() => setActiveTab('new')} className={'p-4 ' + shapes.button + ' ' + (activeTab === 'new' ? colors.mainBg + ' text-white shadow-lg' : bgs.navText)}><Plus className="w-5 h-5" /></button>
<button onClick={() => setActiveTab('messages')} className={'p-4 ' + shapes.button + ' ' + (activeTab === 'messages' ? colors.mainBg + ' text-white shadow-lg' : bgs.navText)}><MessageSquare className="w-5 h-5" /></button>
<button onClick={() => setActiveTab('profile')} className={'p-4 ' + shapes.button + ' ' + (activeTab === 'profile' ? colors.mainBg + ' text-white shadow-lg' : bgs.navText)}><User className="w-5 h-5" /></button>
</nav>
</div>

</div>

<style>{`
.custom-scrollbar::-webkit-scrollbar { width: 0px; }
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&display=swap');
* { font-family: ${fontStyle}; transition: background-color 0.4s ease, border-color 0.4s ease, border-radius 0.4s ease; }
`}</style>
</div>
);
}

// RENDER HOOK VOOR VERCEL/VITE
const container = document.getElementById('root');
if (container) {
const root = createRoot(container);
root.render(<App />);
}