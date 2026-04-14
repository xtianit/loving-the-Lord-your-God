import { useState } from 'react';
import { CheckCircle, Heart, Zap } from 'lucide-react';

const LovingGodLesson = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [loveRating, setLoveRating] = useState(5);
  const [commitmentInput, setCommitmentInput] = useState("");
  const [commitments, setCommitments] = useState<Array<{ text: string; date: string }>>([]);
  const [darkMode, setDarkMode] = useState(false);

  //SCRIPTURE DATABASE
//   const scriptureDB = {
//     "Amos 3:3": {
//       "KJV": "Can two walk together, except they be agreed?",
//       "NKJV": "Can two walk together, unless they are agreed?",
//       "NIV": "Do two walk together unless they have agreed to do so?",
//       "MSG": "Do two people walk hand in hand if they aren't going to the same place?"
//     },
//     "John 3:16": {
//       "KJV": "For God so loved the world, that he gave his only begotten Son...",
//       "NLT": "For this is how God loved the world: He gave his one and only Son...",
//       "MSG": "This is how much God loved the world: He gave his Son, his one and only Son."
//     },
//     "Romans 5:8": {
//       "KJV": "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
//       "MSG": "But God put his love on the line for us by offering his Son in sacrificial death..."
//     },
//     "Mark 12:28-30": {
//       "KJV": "28 ...Which is the first commandment of all? 29 And Jesus answered him, The first of all the commandments is, Hear, O Israel; The Lord our God is one Lord: 30 And thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and with all thy strength: this is the first commandment.",
//       "MSG": "28 ...“Which is the most important commandment of all?” 29-30 Jesus said, “The first in importance is: ‘Listen, Israel: The Lord your God is one; so love the Lord God with all your passion and prayer and intelligence and energy.’"
//     },
//     "Proverbs 4:23": {
//       "KJV": "Keep thy heart with all diligence; for out of it are the issues of life.",
//       "NIV": "Above all else, guard your heart, for everything you do flows from it.",
//       "MSG": "Keep vigilant watch over your heart; that’s where life starts."
//     },
//     "Genesis 2:7": {
//       "KJV": "And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
//       "MSG": "God formed Man out of dirt from the ground and blew into his nostrils the breath of life. The Man came alive—a living soul!"
//     },
//     "Philippians 2:5": {
//       "KJV": "Let this mind be in you, which was also in Christ Jesus:",
//       "NLT": "You must have the same attitude that Christ Jesus had.",
//       "MSG": "Think of yourselves the way Christ Jesus thought of himself."
//     }
//   };

  // --- QUIZ DATA (20 QUESTIONS) ---
  const quizQuestions = [
    { q: "🌟 What is the super-cool title of our lesson today?", a: ["Doing The First Thing First", "LOVING THE LORD YOUR GOD", "The Power of Faith", "Living Without Boundaries"], correct: 1 },
    { q: "📖 Which verse is our 'Power Verse' to memorize this week?", a: ["Matthew 6:33", "John 3:16", "Amos 3:3", "Acts 4:13"], correct: 2 },
    { q: "🤝 According to Amos 3:3, what do two people need to 'walk together'?", a: ["The same shoes", "To be in agreement (Love)", "A map and a compass", "A fast car"], correct: 1 },
    { q: "🍎 In our lesson, what did the Jewish lawyer try to do to Jesus?", a: ["Give Him a gift", "Ask for a miracle", "Discredit Him (prove He was wrong)", "Invite Him to dinner"], correct: 2 },
    { q: "❤️ Why did God give His only Son (John 3:16)?", a: ["Because He was bored", "Because He loved the world so much!", "To show off His power", "To start a new holiday"], correct: 1 },
    { q: "🔋 Which part of us is like a 'pump' that sends God's love to our whole body?", a: ["Our Muscles", "Our Heart (Proverbs 4:23)", "Our Brain", "Our Feet"], correct: 1 },
    { q: "🌍 Which part of us helps us fill our world with God's good work?", a: ["Our Shadow", "Our Voice", "Our Soul (Genesis 2:7)", "Our Pockets"], correct: 2 },
    { q: "🧠 What happens if your Mind is 'intoxicated' with love for God?", a: ["You get a headache", "You forget everything", "God succeeds in changing your life!", "You become a scientist"], correct: 2 },
    { q: "💪 What is the 'Strength' dimension of loving God about?", a: ["Lifting heavy weights", "Using our abilities to cause positive change", "Being louder than everyone", "Winning every game"], correct: 1 },
    { q: "🌉 Our love for God is like a _____ that helps His goals come true.", a: ["Wall", "Bridge", "Tunnel", "Mountain"], correct: 1 },
    { q: "🏆 What is the 'First and Greatest' commandment (Mark 12:30)?", a: ["Clean your room", "Love the Lord your God with everything!", "Don't be late", "Eat your vegetables"], correct: 1 },
    { q: "🤔 Why did the lawyer yield to Jesus in the end?", a: ["He was afraid", "He was moved by Jesus' words on love", "He wanted a job", "Jesus did a magic trick"], correct: 1 },
    { q: "✨ What is the 'phenomenon' that makes things happen on earth?", a: ["Luck", "Co-operation (Agreement)", "Gravity", "Electricity"], correct: 1 },
    { q: "📜 In Romans 5:8, how did God show His love?", a: ["By giving us gold", "Christ died for us while we were sinners", "By lightning bolt", "He didn't show it"], correct: 1 },
    { q: "🕊️ What is the 'Reasoning Device' inside our soul?", a: ["Our Stomach", "Our Mind", "Our Ears", "Our Eyes"], correct: 1 },
    { q: "🚀 Complete: 'He loves us already and demands our love for ____'.", a: ["Money", "Agreement", "Rules", "Success"], correct: 1 },
    { q: "🚶‍♂️ What happens if you DON'T love God in return?", a: ["Prize", "What He offers cannot be delivered", "Nothing changes", "He stops loving you"], correct: 1 },
    { q: "💎 Which verse says 'Keep thy heart with all diligence'?", a: ["Gen 1:1", "Proverbs 4:23", "John 1:1", "Psalm 23:1"], correct: 1 },
    { q: "🧱 What did Jesus use to change the lawyer's mind?", a: ["A sword", "Words bordered on love", "A long book", "He ignored him"], correct: 1 },
    { q: "🌈 What is the 'bottom line' of Strength in this lesson?", a: ["Faster than a lion", "It helps to cause a change", "Never get tired", "To be the boss"], correct: 1 }
  ];

  const addCommitment = () => {
    if (!commitmentInput.trim()) return;
    const newCommitment = {
      text: commitmentInput,
      date: new Date().toLocaleDateString()
    };
    setCommitments([newCommitment, ...commitments]);
    setCommitmentInput("");
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
      {/* Tab Navigation */}
      <div className="flex border-b mb-6 overflow-x-auto justify-between items-center">
        <div className="flex">
          <button onClick={() => setActiveTab("content")} className={`px-6 py-3 font-bold ${activeTab === "content" ? "border-b-4 border-red-500 text-red-500" : ""}`}>Lesson</button>
          <button onClick={() => setActiveTab("application")} className={`px-6 py-3 font-bold ${activeTab === "application" ? "border-b-4 border-red-500 text-red-500" : ""}`}>My Mission</button>
          <button onClick={() => setActiveTab("quiz")} className={`px-6 py-3 font-bold ${activeTab === "quiz" ? "border-b-4 border-red-500 text-red-500" : ""}`}>Quest</button>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 rounded-lg font-bold bg-gray-200 dark:bg-gray-700">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* MISSION TAB */}
      {activeTab === "application" && (
        <div className="space-y-8 animate-in fade-in">
          <header className="text-center">
            <h3 className="text-3xl font-black text-red-500 mb-2">💖 Love Mission Control</h3>
            <p className="opacity-70">"Can two walk together unless they agree?" - Amos 3:3</p>
          </header>

          <div className={`p-8 rounded-3xl border-2 shadow-xl ${darkMode ? 'bg-gray-800 border-red-900' : 'bg-gradient-to-br from-red-50 to-pink-50 border-pink-100'}`}>
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="text-orange-500" /> Connection Battery</h4>
            <div className="relative h-12 w-full bg-gray-200 rounded-2xl border-4 border-gray-300 overflow-hidden mb-4">
              <div 
                className={`h-full transition-all duration-1000 ${loveRating > 7 ? 'bg-green-500' : loveRating > 4 ? 'bg-orange-400' : 'bg-red-500'}`}
                style={{ width: `${loveRating * 10}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-black text-xl drop-shadow-md">
                {loveRating * 10}% SYNCED
              </span>
            </div>
            <input 
              type="range" min="1" max="10" value={loveRating} 
              onChange={(e) => setLoveRating(Number(e.target.value))}
              className="w-full accent-red-500 h-4 bg-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <div className={`p-8 rounded-3xl border-2 border-dashed ${darkMode ? 'bg-gray-800' : 'bg-white border-red-200'}`}>
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Heart className="text-red-500" /> My Love Mission</h4>
            <div className="flex flex-col gap-4">
              <input 
                value={commitmentInput} onChange={(e) => setCommitmentInput(e.target.value)}
                placeholder="How will you love God today?"
                className={`p-4 rounded-xl border-2 text-lg outline-none focus:border-red-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              />
              <button onClick={addCommitment} className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg transform active:scale-95 transition">
                ACCEPT MISSION
              </button>
            </div>
            
            <div className="mt-6 space-y-3">
              {commitments.map((c, i) => (
                <div key={i} className={`p-4 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-700' : 'bg-red-50 animate-bounce-in'}`}>
                  <CheckCircle className="text-green-500" />
                  <div>
                    <p className="font-bold">{c.text}</p>
                    <p className="text-xs opacity-50 uppercase tracking-tighter">Mission Logged: {c.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ TAB (simplified for space) */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-center mb-6 text-blue-500">🏆 The 20-Question Quest</h3>
          <div className="space-y-4">
            {quizQuestions.map((question, index) => (
              <div key={index} className={`p-6 rounded-2xl border-2 ${darkMode ? 'bg-gray-800 border-blue-900' : 'bg-blue-50 border-blue-100'}`}>
                <p className="font-bold mb-4">{index + 1}. {question.q}</p>
                <div className="space-y-2">
                  {question.a.map((option, optIndex) => (
                    <button key={optIndex} className={`w-full p-3 text-left rounded-lg border-2 transition ${darkMode ? 'bg-gray-700 border-gray-600 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LovingGodLesson;