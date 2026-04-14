import logo from "./assets/logo.png";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import {
    BookOpen,
    Award,
    CheckCircle,
    Edit2,
    Save,
    X,
    Clock,
    Plus,
    Lock,
    Unlock,
} from "lucide-react";

// import { Save, CheckCircle, Heart, Zap, BookOpen, Trophy } from 'lucide-react';



interface PaystackResponse {
    reference: string;
    status: string;
    message: string;
    trans: string;
    transaction: string;
    trxref: string;
}

declare global {
    interface Window {
        PaystackPop: {
            setup: (config: {
                key: string;
                email: string;
                amount: number;
                currency: string;
                reference: string;
                onClose: () => void;
                callback: (response: PaystackResponse) => void;
            }) => { openIframe: () => void };
        };
    }
}

type BibleVersions = {
    KJV: string;
    NKJV: string;
    NIV: string;
    ESV: string;
    AMP: string;
    NLT: string;
    MSG: string;
};

type ScriptureDB = Record<string, BibleVersions>;



const initialScriptureDB: ScriptureDB = {
  "Amos 3:3": {
    "KJV": "Can two walk together, except they be agreed?",
    "NKJV": "Can two walk together, unless they are agreed?",
    "NIV": "Do two walk together unless they have agreed to do so?",
    "ESV": "Do two walk together, unless they have agreed to meet?",
    "AMP": "Do two walk together unless they have made an appointment and have agreed?",
    "NLT": "Can two walk together without agreeing on the direction?",
    "MSG": "Do two people walk hand in hand if they aren't going to the same place?"
  },

  "Mark 12:28-30": {
    "KJV": "28 And one of the scribes came, and having heard them reasoning together, and perceiving that he had answered them well, asked him, Which is the first commandment of all? 29 And Jesus answered him, The first of all the commandments is, Hear, O Israel; The Lord our God is one Lord: 30 And thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and with all thy strength: this is the first commandment.",
    "NKJV": "28 Then one of the scribes came, and having heard them reasoning together, perceiving that He had answered them well, asked Him, “Which is the first commandment of all?” 29 Jesus answered him, “The first of all the commandments is: ‘Hear, O Israel, the Lord our God, the Lord is one. 30 And you shall love the Lord your God with all your heart, with all your soul, with all your mind, and with all your strength.’ This is the first commandment.",
    "NIV": "28 One of the teachers of the law came and heard them debating. Noticing that Jesus had given them a good answer, he asked him, “Of all the commandments, which is the most important?” 29 “The most important one,” answered Jesus, “is this: ‘Hear, O Israel: The Lord our God, the Lord is one. 30 Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.’",
    "ESV": "28 And one of the scribes came up and heard them disputing with one another, and seeing that he answered them well, asked him, “Which commandment is the most important of all?” 29 Jesus answered, “The most important is, ‘Hear, O Israel: The Lord our God, the Lord is one. 30 And you shall love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.’",
    "AMP": "28 Then one of the scribes [an expert in Mosaic Law] came up and listened to them arguing [with one another], and noticing that Jesus had answered them well, asked Him, “Which commandment is the first and most important of all?” 29 Jesus answered, “The first and most important one is: ‘Hear, O Israel, the Lord our God is one Lord; 30 and you shall love the Lord your God with all your heart, and with all your soul (life), and with all your mind (thought, understanding), and with all your strength.’",
    "NLT": "28 One of the teachers of religious law was standing there listening to the debate. He realized that Jesus had answered well, so he asked, “Of all the commandments, which is the most important?” 29 Jesus replied, “The most important commandment is this: ‘Listen, O Israel! The Lord our God is the one and only Lord. 30 And you must love the Lord your God with all your heart, all your soul, all your mind, and all your strength.’",
    "MSG": "28 One of the religion scholars came up. Hearing the lively exchanges of question and answer and seeing how sharp Jesus was in his answers, he put in his own question: “Which is the most important commandment of all?” 29-30 Jesus said, “The first in importance is: ‘Listen, Israel: The Lord your God is one; so love the Lord God with all your passion and prayer and intelligence and energy.’"
  },
  "Matthew 18:19": {
    "KJV": "Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven.",
    "NKJV": "“Again I say to you that if two of you agree on earth concerning anything that they ask, it will be done for them by My Father in heaven.",
    "NIV": "“Again, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven.",
    "ESV": "Again I say to you, if two of you agree on earth about anything they ask, it will be done for them by my Father in heaven.",
    "AMP": "“Again I at tell you, if two of you on earth agree [harmonize together, make a symphony together] about anything that they may ask, it will come to pass and be done for them by My Father in heaven.",
    "NLT": "“I also tell you this: If two of you agree here on earth concerning anything you ask, my Father in heaven will do it for you.",
    "MSG": "“When two of you get together on anything at all on earth and make a prayer of it, my Father in heaven goes into action."
  },

  "Proverbs 4:23": {
    "KJV": "Keep thy heart with all diligence; for out of it are the issues of life.",
    "NKJV": "Keep your heart with all diligence, For out of it spring the issues of life.",
    "NIV": "Above all else, guard your heart, for everything you do flows from it.",
    "ESV": "Keep your heart with all vigilance, for from it flow the springs of life.",
    "AMP": "Watch over your heart with all diligence, For from it flow the springs of life.",
    "NLT": "Guard your heart above all else, for it determines the course of your life.",
    "MSG": "Keep vigilant watch over your heart; that’s where life starts."
  },
  "John 3:16": {
    "KJV": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    "NKJV": "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    "NIV": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "ESV": "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    "AMP": "For God so [greatly] loved and dearly prized the world, that He [even] gave His [One and] only begotten Son, so that whoever believes and trusts in Him [as Savior] shall not perish being lost and out of the way, but have eternal life.",
    "NLT": "For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.",
    "MSG": "This is how much God loved the world: He gave his Son, his one and only Son. And this is why: so that no one need be destroyed; by believing in him, anyone can have a whole and lasting life."
  },

  "Romans 5:8": {
    "KJV": "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
    "NKJV": "But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.",
    "NIV": "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    "ESV": "but God shows his love for us in that while we were still sinners, Christ died for us.",
    "AMP": "But God clearly shows and proves His own love for us, by the fact that while we were still sinners, Christ died for us.",
    "NLT": "But God showed his great love for us by sending Christ to die for us while we were still sinners.",
    "MSG": "But God put his love on the line for us by offering his Son in sacrificial death while we were of no use whatever to him."
  },
  

  "Philippians 2:5": {
    "KJV": "Let this mind be in you, which was also in Christ Jesus:",
    "NKJV": "Let this mind be in you which was also in Christ Jesus,",
    "NIV": "In your relationships with one another, have the same mindset as Christ Jesus:",
    "ESV": "Have this mind among yourselves, which is yours in Christ Jesus,",
    "AMP": "Have this same attitude in yourselves which was in Christ Jesus [look to Him as your example in selfless humility],",
    "NLT": "You must have the same attitude that Christ Jesus had.",
    "MSG": "Think of yourselves the way Christ Jesus thought of himself."
  },
  "John 1:11-12": {
    "KJV": "11 He came unto his own, and his own received him not. 12 But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:",
    "NKJV": "11 He came to His own, and His own did not receive Him. 12 But as many as received Him, to them He gave the right to become children of God, to those who believe in His name:",
    "NIV": "11 He came to that which was his own, but his own did not receive him. 12 Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God—",
    "ESV": "11 He came to his own, and his own people did not receive him. 12 But to all who did receive him, who believed in his name, he gave the right to become children of God,",
    "AMP": "11 He came to His own [domain and creations], and His own [people] did not accept Him. 12 But to as many as did receive and welcome Him, He gave the right [the authority, the privilege] to become children of God, that is, to those who believe in (adhere to, trust in, and rely on) His name—",
    "NLT": "11 He came to his own people, and even they rejected him. 12 But to all who believed him and accepted him, he gave the right to become children of God.",
    "MSG": "11 He came to his own people, but they didn’t want him. 12 But whoever did want him, who believed he was who he claimed and would do what he said, He made to be their true selves, their child-of-God selves."
  },

  "Matthew 13:58": {
    "KJV": "And he did not many mighty works there because of their unbelief.",
    "NKJV": "Now He did not do many mighty works there because of their unbelief.",
    "NIV": "And he did not do many miracles there because of their lack of faith.",
    "ESV": "And he did not do many mighty works there, because of their unbelief.",
    "AMP": "And He did not do many miracles there because of their unbelief [their lack of faith, their unteachableness].",
    "NLT": "And so he did only a few miracles there because of their unbelief.",
    "MSG": "And he didn’t do many miracles, holding back because of their unbelief."
  },

  "Mark 12:30": {
    "KJV": "And thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and with all thy strength: this is the first commandment.",
    "NKJV": "And you shall love the Lord your God with all your heart, with all your soul, with all your mind, and with all your strength.’ This is the first commandment.",
    "NIV": "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.’",
    "ESV": "And you shall love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.’",
    "AMP": "and you shall love the Lord your God with all your heart, and with all your soul (life), and with all your mind (thought, understanding), and with all your strength.’",
    "NLT": "And you must love the Lord your God with all your heart, all your soul, all your mind, and all your strength.’",
    "MSG": "so love the Lord God with all your passion and prayer and intelligence and energy.’"
  },

  "Genesis 2:7": {
    "KJV": "And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
    "NKJV": "And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living being.",
    "NIV": "Then the Lord God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "ESV": "then the Lord God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature.",
    "AMP": "then the Lord God formed [that is, created the body of] man from the dust of the ground, and breathed into his nostrils the breath of life; and the man became a living being [an individual complete in body and spirit].",
    "NLT": "Then the Lord God formed the man from the dust of the ground. He breathed the breath of life into the man’s nostrils, and the man became a living person.",
    "MSG": "God formed Man out of dirt from the ground and blew into his nostrils the breath of life. The Man came alive—a living soul!"
  }
};

// const quizQuestions = [
//     {
//         q: "What is the main theme or title of this lesson?",
//         a: [
//             "Doing The First Thing First",
//             "IMITATING CHRIST JESUS",
//             "The Power of Faith",
//             "Living Without Boundaries"
//         ],
//         correct: 1
//     },
//     {
//         q: "What is the memory verse of this lesson?",
//         a: [
//             "Matthew 6:33",
//             "John 3:16",
//             "Matthew 5:48",
//             "Acts 4:13"
//         ],
//         correct: 2
//     },
//     {
//         q: "According to the lesson, what does 'Imitating Christ' simply mean?",
//         a: [
//             "Going to church every day",
//             "Copying the way Jesus behaves and talks",
//             "Performing miracles",
//             "Becoming a religious leader"
//         ],
//         correct: 1
//     },
//     {
//         q: "What did the elders notice about the disciples in Acts 4:13?",
//         a: [
//             "They were highly educated",
//             "They were wealthy men",
//             "They had been with Jesus",
//             "They were expert speakers"
//         ],
//         correct: 2
//     },
//     {
//         q: "Why is it necessary to 'Know the Lord' to successfully imitate Him?",
//         a: [
//             "To gain high status in church",
//             "Because no one can imitate an unknown person",
//             "To become famous",
//             "To prove intelligence"
//         ],
//         correct: 1
//     },
//     {
//         q: "What is a common mistake among Christians mentioned in the lesson regarding character?",
//         a: [
//             "They focus too much on character",
//             "They have charisma and religious cloaks but no trait of Godly character",
//             "They do not have the Holy Spirit",
//             "They study the Bible too much"
//         ],
//         correct: 1
//     },
//     {
//         q: "Who is described as the 'Pacesetter' for the many sons born to God?",
//         a: [
//             "The Apostle Paul",
//             "The Elders of Israel",
//             "The Lord Jesus Christ",
//             "The Disciples"
//         ],
//         correct: 2
//     },
//     {
//         q: "According to John 14:6, how can an individual reach God?",
//         a: [
//             "Through hard work",
//             "Through religious traditions",
//             "Only through Christ Jesus",
//             "By being uneducated and ordinary"
//         ],
//         correct: 2
//     },
//     {
//         q: "What is the 'identification mark' of a believer mentioned in the lesson?",
//         a: [
//             "Their religious title",
//             "Their church attendance",
//             "The manifestation of His character",
//             "The amount of scriptures they know"
//         ],
//         correct: 2
//     },
//     {
//         q: "Which scripture mentions that we will face persecution for His name's sake?",
//         a: [
//             "John 3:16",
//             "Matthew 10:22",
//             "Daniel 11:32",
//             "Matthew 5:48"
//         ],
//         correct: 1
//     },
//     {
//         q: "What is the ultimate consequence of failing to imitate Christ according to Matthew 7:22-23?",
//         a: [
//             "Missing a church service",
//             "Rejection by the Lord",
//             "Loss of material wealth",
//             "Lack of charisma"
//         ],
//         correct: 1
//     }
// ];

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




const SundaySchoolApp = () => {
    const [showPaymentGate, setShowPaymentGate] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");


    // new content
// const [activeTab, setActiveTab] = useState("content");
//   const [loveRating, setLoveRating] = useState(5);
    // const [commitmentInput, setCommitmentInput] = useState("");
    // const [commitments, setCommitments] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);
    //End of new content
    const [darkMode, setDarkMode] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [loading, setLoading] = useState(false);
    const [appLoading, setAppLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [scriptureDB, setScriptureDB] =
        useState<ScriptureDB>(initialScriptureDB);
    const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
    const [bibleVersion, setBibleVersion] =
        useState<keyof BibleVersions>("KJV");
    const [showVerseModal, setShowVerseModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newVerse, setNewVerse] = useState<{
        reference: string;
        versions: BibleVersions;
    }>({
        reference: "",
        versions: { KJV: "", NKJV: "", NIV: "", ESV: "", AMP: "", NLT: "", MSG: "" },
    });
    const [verseLoading, setVerseLoading] = useState(false);
    const [quizActive, setQuizActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(50);
    const [showResults, setShowResults] = useState(false);
    // const [faithRating, setFaithRating] = useState(5);
    const [commitments, setCommitments] = useState<
        Array<{ text: string; date: string }>
    >([]);
    const [commitmentInput, setCommitmentInput] = useState("");
    const [editingContent, setEditingContent] = useState<string | null>(null);
    const [loveRating, setLoveRating] = useState(5);

    type SubPoint = { 
        title: string; 
        content: string; 
        scriptures?: string[]; 
    };
    type LessonPoint = {
        title: string;
        content: string;
        scriptures: string[];
        subPoints: SubPoint[];
    };
    type ContentData = {
        lessonDate: string;
        lessonTitle: string;
        memoryVerse: string;
        memoryVerseRef: string;
        introduction: string;
        introScriptures: string[];
        lessonIntroScriptures: string[];
        aims: string;
        aimsScriptures: string[];
        objectives: string;
        objectivesScriptures: string[];
        lessonIntro: string;
        lessonPoints: LessonPoint[];
        conclusion: string;
        conclusionScriptures: string[];
        prayerPoints: string[];
    };
const addCommitment = () => {
    if (!commitmentInput.trim()) return;
    const newCommitment = {
      text: commitmentInput,
      date: new Date().toLocaleDateString()
    };
    setCommitments([newCommitment, ...commitments]);
    setCommitmentInput("");
  };

  



const [contentData, setContentData] = useState<ContentData>({
    lessonDate: "April 19, 2026",
    lessonTitle: "LOVING THE LORD YOUR GOD",

    memoryVerse:
        "Can two walk together, except they be agreed? - Amos 3:3",
    memoryVerseRef: "Amos 3:3",

    introScriptures: ["Mark 12:28-30"],
    
    lessonIntroScriptures: [
        "Amos 3:3", 
        "Matthew 18:19", 
        "John 3:16", 
        "Romans 5:8"
    ],

    introduction:
        "Nothing meaningful can happen on planet earth to a people or a place without some level of co-operation. This phenomenon is what the Bible also calls agreement in Amos 3:3 and Matt 18:19. The scriptures clearly reveal the demonstration of God's love towards man with the purpose of restoration. Jn. 3:16, Rom. 5:8. This process cannot be achieved except there is an agreement between man and God in terms of love. He loves us already and demands our love for agreement to realize the set goals.",

    aims:
        "To enable believers to love the Lord their God.",

    aimsScriptures: [],

    objectives:
        "To bring man to reach agreement with God for his transformation.",

    objectivesScriptures: [],

    lessonIntro:
        "A Jewish lawyer confronted Jesus to prove his superiority and to publicly discredit the teachings of Jesus. By the time Jesus was through with His words that were bordered on love, he yielded unreservedly to his doctrine. Let's consider the lesson drawn from this.",

    lessonPoints: [
        {
            title: "THE DEFINITION AND DYNAMICS OF LOVE",
            content:
                "Love is the foundation of our relationship with God. It requires both an understanding of what love is and a reciprocal response to God's existing love.",
            scriptures: ["John 3:16", "Romans 5:8"],
            subPoints: [
                {
                    title: "WHAT IS LOVE?",
                    content:
                        "Love is the phenomenon of passionate feeling that motivates to do something positive. Jn. 3:16, Rom. 5:8. It moved God to give His only begotten Son to save man and restore all things.",
                    scriptures: ["John 3:16", "Romans 5:8"]
                },
                {
                    title: "LOVE FOR LOVE (AGREEMENT)",
                    content:
                        "Nothing works without an agreement or acceptance. Except you accept God or Satan either of them cannot use you. In the same vein, unless one loves God in return what he has to offer cannot be delivered — Jn 1:11-12, Matt. 13:58, Amos 3:3.",
                    scriptures: ["John 1:11-12", "Matthew 13:58", "Amos 3:3"]
                }
            ],
        },
        {
            title: "THE FOUR DIMENSIONS OF LOVING GOD",
            content:
                "Jesus commanded us to love God with our entire being: Heart, Soul, Mind, and Strength.",
            scriptures: ["Mark 12:30"],
            subPoints: [
                {
                    title: "LOVE WITH ALL HEART",
                    content:
                        "The heart is responsible for the pumping of blood (live) to all parts of the body. If the heart loves God it means the whole body will because its influence is transported around the body. Prov. 4:23.",
                    scriptures: ["Proverbs 4:23"]
                },
                {
                    title: "LOVE WITH ALL SOUL",
                    content: 
                        "The soul is a spiritual part of a man that is created to be earthly. GEN. 2:7. Man is made conscious of the earth through his soul. Therefore if the soul loves God the man will be able to fill his domain with God and his redemptive work.",
                    scriptures: ["Genesis 2:7"]
                },
                {
                    title: "LOVE WITH ALL MIND",
                    content:
                        "The mind is the reasoning device in the soul of a man. Whoever conquers in the mind controls the man. If this part is intoxicated with love for God, it therefore means that God will succeed in his restoration work. Phil. 2:5.",
                    scriptures: ["Philippians 2:5"]
                },
                {
                    title: "LOVE WITH ALL STRENGTH",
                    content:
                        "Strength has to do with ability or enabling power. Strength is in various forms but the bottom line is that it helps to cause a change. If ones strength is overwhelmed with love for God there is bound to be a positive change as a result of the strengths joined together.",
                    scriptures: []
                }
            ],
        }
    ],

    conclusion:
        "Our love for God will give room for agreement and trust to enable God work our redemption.",

    conclusionScriptures: [],

   prayerPoints: [
    "Lord, help me stay 100% synced with You today. I want us to be an unbeatable team, walking in total agreement! 🤜🤛",
    "Father, guard my heart like a treasure chest. Fill it so full of Your love that kindness flows out to everyone I meet.",
    "Lord, I 'download' Your Word into my mind today. Let Your thoughts be my thoughts so I can see the world like You do! 🧠✨",
    "Father, take my energy, my gaming skills, my sports, and my talents. Use my 'Strength' to be a world-changer for Your Kingdom!"
],
});




    const formatScriptureText = (text: string) => {
        const parts = text.split(/(\d+)/);
        return parts.map((part, index) => {
            if (/^\d+$/.test(part)) {
                return (
                    <strong key={index} className="font-bold">
                        {part}
                    </strong>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setAppLoading(false), 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => setDarkMode(!darkMode);
    const adjustFontSize = (delta: number) =>
        setFontSize((prev) => Math.min(Math.max(prev + delta, 12), 24));
    const handleTabChange = (tab: string) => {
        setLoading(true);
        setTimeout(() => {
            setActiveTab(tab);
            setLoading(false);
        }, 500);
    };

    const showBibleVersions = (reference: string) => {
        setSelectedVerse(reference);
        setShowVerseModal(true);
        setVerseLoading(true);
        setTimeout(() => setVerseLoading(false), 800);
    };

    const changeBibleVersion = (version: keyof BibleVersions) => {
        setVerseLoading(true);
        setTimeout(() => {
            setBibleVersion(version);
            setVerseLoading(false);
        }, 600);
    };

    const addNewScripture = () => {
        if (
            newVerse.reference &&
            Object.values(newVerse.versions).some((v) => v !== "")
        ) {
            setScriptureDB((prev) => ({
                ...prev,
                [newVerse.reference]: newVerse.versions,
            }));
            setNewVerse({
                reference: "",
                versions: {
                    KJV: "",
                    NKJV: "",
                    NIV: "",
                    ESV: "",
                    AMP: "",
                    NLT: "",
                    MSG: "",
                },
            });
            setEditMode(false);
        }
    };

    const updateVerseVersion = (version: keyof BibleVersions, text: string) => {
        setNewVerse((prev) => ({
            ...prev,
            versions: { ...prev.versions, [version]: text },
        }));
    };

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (quizActive && timeLeft > 0 && !showResults) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endQuiz();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [quizActive, timeLeft, showResults]);

    const startQuiz = () => {
        setQuizActive(true);
        setCurrentQuestion(0);
        setScore(0);
        setTimeLeft(50);
        setShowResults(false);
    };

    const checkAnswer = (choice: number) => {
        if (!quizActive || showResults) return;
        const correct = quizQuestions[currentQuestion].correct === choice;
        const timeBonus = Math.floor(timeLeft / 10);
        const points = correct ? 10 + timeBonus : 0;
        if (correct) setScore((prev) => prev + points);
        if (currentQuestion < quizQuestions.length - 1) {
            setTimeout(() => setCurrentQuestion((prev) => prev + 1), 1000);
        } else {
            setTimeout(() => endQuiz(), 1000);
        }
    };

    const endQuiz = () => {
        setQuizActive(false);
        setShowResults(true);
    };

    

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === "M") {
                e.preventDefault();
                handleTabChange("manage");
            }
            if (e.ctrlKey && e.shiftKey && e.key === "E") {
                e.preventDefault();
                setEditingContent(editingContent ? null : activeTab);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [editingContent, activeTab]);

    const updateContent = (field: string, value: string) =>
        setContentData((prev) => ({ ...prev, [field]: value }));
    const updateLessonPoint = (index: number, field: string, value: string) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === index ? { ...point, [field]: value } : point
            ),
        }));
    };
    const updatePrayerPoint = (index: number, value: string) => {
        setContentData((prev) => ({
            ...prev,
            prayerPoints: prev.prayerPoints.map((prayer, i) =>
                i === index ? value : prayer
            ),
        }));
    };
    const updateLessonSubPoint = (
        pointIndex: number,
        subIndex: number,
        field: string,
        value: string
    ) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: point.subPoints.map((sub, j) =>
                              j === subIndex ? { ...sub, [field]: value } : sub
                          ),
                      }
                    : point
            ),
        }));
    };
    const addLessonSubPoint = (pointIndex: number) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: [
                              ...point.subPoints,
                              {
                                  title: "New Point",
                                  content: "",
                                  scripture: "",
                              },
                          ],
                      }
                    : point
            ),
        }));
    };
    const deleteLessonSubPoint = (pointIndex: number, subIndex: number) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: point.subPoints.filter(
                              (_, j) => j !== subIndex
                          ),
                      }
                    : point
            ),
        }));
    };
    const addPrayerPoint = () =>
        setContentData((prev) => ({
            ...prev,
            prayerPoints: [...prev.prayerPoints, "New prayer point..."],
        }));

    const PAYSTACK_PUBLIC_KEY =
        "pk_test_bed97038ebcf74b30219ed0500cfffc6e80948f1";
    const PAYMENT_AMOUNT = 500000;

    const handlePaystackSuccess = (reference: unknown) => {
        console.log("Payment successful:", reference);
        setIsPaid(true);
        setShowPaymentGate(false);
    };

    const handlePaystackClose = () => console.log("Payment closed");

    const initializePaystack = () => {
        if (!window.PaystackPop) {
            alert("Paystack script not loaded!");
            return;
        }
        const paystack = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: "user@example.com",
            amount: PAYMENT_AMOUNT,
            currency: "NGN",
            reference: "SSA_" + Math.floor(Math.random() * 1000000000 + 1),
            onClose: () => handlePaystackClose(),
            callback: (transaction: PaystackResponse) =>
                handlePaystackSuccess(transaction),
        });
        paystack.openIframe();
    };

    const handleFreePlan = () => {
        setShowPaymentGate(false);
        setIsPaid(false);
    };

    const themeClasses = darkMode
        ? "bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white"
        : "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 text-gray-900";


        
    if (appLoading) {
        const animatedText = "Progress Through Thanksgiving".split("");

            return (
                <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full border-4 border-white/30 animate-ping"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="w-40 h-40 rounded-full border-4 border-white/20 animate-ping"
                                    style={{ animationDelay: "0.3s" }}
                                ></div>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Life Gate Ministries Worldwide
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Sunday School Lessons
                        </p>

                        {/* Single-color glowing neon text */}
                        <div className="flex justify-center mb-6 text-3xl md:text-4xl font-extrabold">
                            {animatedText.map((char, idx) => (
                                <span
                                    key={idx}
                                    className="inline-block text-blue-400 drop-shadow-[0_0_10px_#00ffff] animate-[wave_1.5s_ease-in-out_infinite]"
                                    style={{
                                        animationDelay: `${idx * 0.1}s`,
                                    }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </div>

                        <div className="text-white/80 mb-6 text-lg animate-pulse">
                            Loading Sunday School Lesson...
                        </div>
                        <div className="w-64 mx-auto bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-white/70 mt-3 text-sm">
                            {loadingProgress}%
                        </p>
                    </div>

                    {/* Keyframes for smooth wave bounce */}
                    <style>
                        {`
                            @keyframes wave {
                                0%, 100% { transform: translateY(0); }
                                25% { transform: translateY(-12px); }
                                50% { transform: translateY(8px); }
                                75% { transform: translateY(-6px); }
                            }
                        `}
                    </style>
                </div>
            );
        }




    if (showPaymentGate) {
        return (
            <div
                className={`min-h-screen ${themeClasses} flex items-center justify-center p-4 relative overflow-hidden`}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                    <div
                        className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>
                <div className="max-w-4xl w-full relative z-10">
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border border-white/20">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Sunday School Lesson
                        </h1>
                        <p className="text-xl opacity-80">
                            LOVING THE LORD YOUR GOD
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition duration-300 shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">
                                        Free Access
                                    </h3>
                                    <Unlock
                                        className="text-green-400"
                                        size={32}
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="text-4xl font-bold mb-2">
                                        ₦0
                                    </p>
                                    <p className="opacity-70">View Only Mode</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-green-400"
                                        />
                                        <span>Read all lesson content</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-green-400"
                                        />
                                        <span>Take interactive quizzes</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X size={20} className="text-red-400" />
                                        <span className="opacity-50">
                                            No content editing
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X size={20} className="text-red-400" />
                                        <span className="opacity-50">
                                            No scripture management
                                        </span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleFreePlan}
                                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-semibold text-white shadow-lg transform hover:scale-105 transition duration-300"
                                >
                                    Continue Free
                                </button>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition duration-300 shadow-2xl">
                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    BEST VALUE
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">
                                        Premium Access
                                    </h3>
                                    <Lock
                                        className="text-purple-400"
                                        size={32}
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="text-4xl font-bold mb-2">
                                        ₦5,000
                                    </p>
                                    <p className="opacity-70">Full Access</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Everything in Free</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Edit all lesson content</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Manage Bible scriptures</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Save your commitments</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Priority support</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={initializePaystack}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold text-white shadow-lg transform hover:scale-105 transition duration-300"
                                >
                                    Unlock Premium
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-center mt-8 opacity-70 text-sm">
                        Secure payment powered by Paystack • All transactions
                        are encrypted
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen ${themeClasses} transition-all duration-500 relative`}
            style={{ fontSize: `${fontSize}px` }}
        >
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-0 left-1/4 animate-pulse"></div>
                <div
                    className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>
            <Header
                logo={logo}
                contentData={contentData}
                fontSize={fontSize}
                adjustFontSize={adjustFontSize}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
            />
            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {contentData.lessonTitle}
                </h2>
                <div className="flex gap-2 mb-6 overflow-x-auto flex-nowrap md:flex-wrap justify-start md:justify-center scrollbar-hide backdrop-blur-sm bg-white/5 p-2 rounded-2xl border border-white/10">
                    {[
                        "intro",
                        "lesson",
                        "conclusion",
                        "application",
                        "quiz",
                        "prayer",
                    ].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex-shrink-0 ${
                                activeTab === tab
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                    : darkMode
                                    ? "bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10"
                                    : "bg-black/10 backdrop-blur-md hover:bg-black/20 border border-black/10"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                    {isPaid && (
                        <button
                            onClick={() => handleTabChange("manage")}
                            className={`px-2 py-3 rounded-xl font-semibold transition-all flex-shrink-0 opacity-0 hover:opacity-10 ${
                                activeTab === "manage"
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                    : "bg-white/10 backdrop-blur-md"
                            }`}
                            title="Admin"
                            style={{ width: "40px" }}
                        >
                            <Edit2 size={16} className="mx-auto" />
                        </button>
                    )}
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                )}
                {!loading && (
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8">
                        {activeTab === "intro" && (
                            <div className="space-y-6">
                                {editingContent === "intro" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <div
                                    className={`${
                                        darkMode
                                            ? "bg-blue-900/30"
                                            : "bg-blue-50"
                                    } p-6 rounded-lg border-l-4 border-blue-600`}
                                >
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <BookOpen className="text-blue-600" />{" "}
                                        Memory Verse
                                    </h3>
                                    {editingContent === "intro" ? (
                                        <textarea
                                            value={contentData.memoryVerse}
                                            onChange={(e) =>
                                                updateContent(
                                                    "memoryVerse",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-4 py-2 rounded-lg border text-xl italic mb-4 ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                            rows={2}
                                        />
                                    ) : (
                                        <blockquote className="text-xl italic mb-4">
                                            "{contentData.memoryVerse}"
                                        </blockquote>
                                    )}
                                    <button
                                        onClick={() =>
                                            showBibleVersions(
                                                contentData.memoryVerseRef
                                            )
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                    >
                                        <BookOpen size={16} />
                                        Read {contentData.memoryVerseRef}
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        Mark 12:28-30
                                    </h3>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() =>
                                                showBibleVersions(
                                                    "Mark 12:28-30"
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                        >
                                        <BookOpen size={16} />
                                            Read  Mark 12:28-30
                                        </button>

                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        Introduction
                                    </h3>
                                    {editingContent === "intro" ? (
                                        <textarea
                                            value={contentData.introduction}
                                            onChange={(e) =>
                                                updateContent(
                                                    "introduction",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-4 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                            rows={6}
                                        />
                                    ) : (
                                        <p className="leading-relaxed">
                                            {contentData.introduction}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                            {contentData.lessonIntroScriptures.map(
                                                (scripture) => (
                                                    <button
                                                        key={scripture}
                                                        onClick={() =>
                                                            showBibleVersions(
                                                                scripture
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                                                    >
                                                        <BookOpen size={14} />
                                                        {scripture}
                                                    </button>
                                                )
                                            )}
                                    
                                        </div>
                                            
                                        </p>
                                        
                                    )}
                                   
                                </div>
                                <div
                                    className={`${
                                        darkMode
                                            ? "bg-green-900/30"
                                            : "bg-green-50"
                                    } p-6 rounded-lg`}
                                >
                                    
                                   
                                    <h3 className="text-xl font-bold mb-3">
                                        Aims and Objectives
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <strong className="text-green-700 dark:text-green-400">
                                                AIMS:
                                            </strong>
                                            {editingContent === "intro" ? (
                                                <textarea
                                                    value={contentData.aims}
                                                    onChange={(e) =>
                                                        updateContent(
                                                            "aims",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-3 py-2 rounded-lg border mt-2 ${
                                                        darkMode
                                                            ? "bg-gray-800 border-gray-600"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                    rows={3}
                                                />
                                            ) : (
                                                <p>{contentData.aims}</p>
                                            )}
                                        </div>
                                        <div>
                                            <strong className="text-green-700 dark:text-green-400">
                                                OBJECTIVES:
                                            </strong>
                                            {editingContent === "intro" ? (
                                                <textarea
                                                    value={
                                                        contentData.objectives
                                                    }
                                                    onChange={(e) =>
                                                        updateContent(
                                                            "objectives",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-3 py-2 rounded-lg border mt-2 ${
                                                        darkMode
                                                            ? "bg-gray-800 border-gray-600"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                    rows={2}
                                                />
                                            ) : (
                                                <p>{contentData.objectives}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "lesson" && (
                            <div className="space-y-6">
                                {editingContent === "lesson" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4">
                                    Lesson Content
                                </h3>
                                {editingContent === "lesson" ? (
                                    <textarea
                                        value={contentData.lessonIntro}
                                        onChange={(e) =>
                                            updateContent(
                                                "lessonIntro",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={3}
                                    />
                                ) : (
                                    <p className="leading-relaxed mb-4">
                                        {contentData.lessonIntro}
                                        {/* <div className="mt-4 flex flex-wrap gap-2">
                                            {contentData.lessonIntroScriptures.map(
                                                (scripture) => (
                                                    <button
                                                        key={scripture}
                                                        onClick={() =>
                                                            showBibleVersions(
                                                                scripture
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                                                    >
                                                        <BookOpen size={14} />
                                                        {scripture}
                                                    </button>
                                                )
                                            )}
                                    
                                        </div> */}
                                        
                                    </p>
                                    
                                )}
                                <div className="space-y-6">
                                    {contentData.lessonPoints.map(
                                        (section, idx) => (
                                            <div
                                                key={idx}
                                                className={`${
                                                    darkMode
                                                        ? "bg-gray-700"
                                                        : "bg-gray-50"
                                                } p-5 rounded-lg`}
                                            >
                                                {editingContent === "lesson" ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={
                                                                section.title
                                                            }
                                                            onChange={(e) =>
                                                                updateLessonPoint(
                                                                    idx,
                                                                    "title",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={`w-full px-3 py-2 rounded-lg border mb-3 text-xl font-semibold ${
                                                                darkMode
                                                                    ? "bg-gray-800 border-gray-600"
                                                                    : "bg-white border-gray-300"
                                                            }`}
                                                        />
                                                        {section.content && (
                                                            <textarea
                                                                value={
                                                                    section.content
                                                                }
                                                                onChange={(e) =>
                                                                    updateLessonPoint(
                                                                        idx,
                                                                        "content",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={`w-full px-3 py-2 rounded-lg border mb-3 ${
                                                                    darkMode
                                                                        ? "bg-gray-800 border-gray-600"
                                                                        : "bg-white border-gray-300"
                                                                }`}
                                                                rows={3}
                                                            />
                                                        )}
                                                        <div className="ml-6 space-y-3 mt-3">
                                                            {section.subPoints.map(
                                                                (
                                                                    subPoint,
                                                                    subIdx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            subIdx
                                                                        }
                                                                        className={`${
                                                                            darkMode
                                                                                ? "bg-gray-800"
                                                                                : "bg-white"
                                                                        } p-3 rounded-lg`}
                                                                    >
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <span className="text-sm font-bold text-yellow-600">
                                                                                {String.fromCharCode(
                                                                                    97 +
                                                                                        subIdx
                                                                                )}

                                                                                .
                                                                            </span>
                                                                            <button
                                                                                onClick={() =>
                                                                                    deleteLessonSubPoint(
                                                                                        idx,
                                                                                        subIdx
                                                                                    )
                                                                                }
                                                                                className="text-red-600 hover:text-red-800"
                                                                            >
                                                                                <X
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                subPoint.title
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "title",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Sub-point title"
                                                                            className={`w-full px-3 py-1 rounded border mb-2 text-sm font-semibold ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                        />
                                                                        <textarea
                                                                            value={
                                                                                subPoint.content
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "content",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Sub-point content"
                                                                            className={`w-full px-3 py-1 rounded border mb-2 text-sm ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                            rows={
                                                                                2
                                                                            }
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                subPoint.scriptures ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "scripture",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Scripture reference (optional)"
                                                                            className={`w-full px-3 py-1 rounded border text-sm ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                        />
                                                                    </div>
                                                                )
                                                            )}
                                                            <button
                                                                onClick={() =>
                                                                    addLessonSubPoint(
                                                                        idx
                                                                    )
                                                                }
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                                                            >
                                                                <Plus
                                                                    size={14}
                                                                />{" "}
                                                                Add Sub-point
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h4 className="text-xl font-semibold mb-2">
                                                            {idx + 1}.{" "}
                                                            {section.title}
                                                        </h4>
                                                        {section.content && (
                                                            <p className="leading-relaxed mb-3">
                                                                {
                                                                    section.content
                                                                }
                                                            </p>
                                                        )}
                                                        {section.scriptures &&
                                                            section.scriptures
                                                                .length > 0 && (
                                                                <div className="mt-3 flex flex-wrap gap-2">
                                                                    {section.scriptures.map(
                                                                        (
                                                                            scripture
                                                                        ) => (
                                                                            <button
                                                                                key={
                                                                                    scripture
                                                                                }
                                                                                onClick={() =>
                                                                                    showBibleVersions(
                                                                                        scripture
                                                                                    )
                                                                                }
                                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition flex items-center gap-2 text-sm"
                                                                            >
                                                                                <BookOpen
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
                                                                                {
                                                                                    scripture
                                                                                }
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                        {section.subPoints &&
                                                            section.subPoints
                                                                .length > 0 && (
                                                                <ol className="list-[lower-alpha] ml-6 space-y-3 mt-3">
                                                                    {section.subPoints.map(
                                                                        (
                                                                            subPoint,
                                                                            subIdx
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    subIdx
                                                                                }
                                                                            >
                                                                                <strong>
                                                                                    {
                                                                                        subPoint.title
                                                                                    }

                                                                                    :
                                                                                </strong>{" "}
                                                                                {
                                                                                    subPoint.content
                                                                                }
                                                                                <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                                                                                {subPoint.scriptures?.map((ref, i) => (
                                                                                    <button
                                                                                    key={i}
                                                                                    onClick={() => showBibleVersions(ref)}
                                                                                    className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap px-3 py-1 rounded-lg transition flex items-center gap-2 text-sm flex-shrink-0"
                                                                                    >
                                                                                    📖 Read {ref}
                                                                                    </button>
                                                                                ))}
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ol>
                                                            )}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTab === "conclusion" && (
                            <div className="space-y-4">
                                {editingContent === "conclusion" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4">
                                    Conclusion
                                </h3>
                                {editingContent === "conclusion" ? (
                                    <textarea
                                        value={contentData.conclusion}
                                        onChange={(e) =>
                                            updateContent(
                                                "conclusion",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border text-lg ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-lg leading-relaxed">
                                        {contentData.conclusion}
                                    </p>
                                )}
                                {contentData.conclusionScriptures &&
                                    contentData.conclusionScriptures.length >
                                        0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {contentData.conclusionScriptures.map(
                                                (scripture) => (
                                                    <button
                                                        key={scripture}
                                                        onClick={() =>
                                                            showBibleVersions(
                                                                scripture
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                                                    >
                                                        <BookOpen size={14} />
                                                        {scripture}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        )}


                        
            


            {activeTab === "application" && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">💖 Living the Love-Life</h3>

                    {/* Gamified Self-Assessment: The Love Battery */}
                    <div
                        className={`${
                            darkMode
                                ? "bg-gray-700 border-red-900"
                                : "bg-gradient-to-r from-red-50 to-pink-50 border-pink-100"
                        } p-6 rounded-2xl border-2 shadow-sm`}
                    >
                        <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                            🔋 Love Connection Status
                        </h4>
                        <p className="mb-6 text-sm opacity-80">
                            God’s love for you is always 100%! But how much are you "plugged in" 
                            to Him today? Check your agreement level (Amos 3:3).
                        </p>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-xs font-mono uppercase tracking-wider">Connection Strength</span>
                                <span className={`text-3xl font-black ${loveRating > 7 ? 'text-green-500' : 'text-orange-500'}`}>
                                    {loveRating * 10}%
                                </span>
                            </div>
                            
                            {/* Visual Battery Bar */}
                            <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
                                <div 
                                    className={`h-full transition-all duration-500 ${
                                        loveRating > 7 ? 'bg-green-500' : loveRating > 4 ? 'bg-orange-400' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${loveRating * 10}%` }}
                                />
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={loveRating}
                                onChange={(e) => setLoveRating(Number(e.target.value))}
                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                        </div>

                        <div className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
                            darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
                        }`}>
                            {loveRating >= 8
                                ? "🔥 WOW! You're in total agreement with God! Your heart, soul, and mind are high-fiving Him right now!"
                                : loveRating >= 5
                                ? "⚡ Charging... You're making progress! Try 'intoxicating' your mind with a favorite verse today to boost your score."
                                : "🔌 Connection Low. Time to re-sync! God is waiting for a 'Love-Agreement' with you. Let's talk to Him!"}
                        </div>
                    </div>

                    {/* Mission Log: My Love Actions */}
                    <div
                        className={`${
                            darkMode
                                ? "bg-gray-700 border-gray-600"
                                : "bg-white border-2 border-dashed border-red-200"
                        } p-6 rounded-2xl`}
                    >
                        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                            🚀 My Love Mission
                        </h4>
                        <p className="text-sm mb-4">
                            What is 1 cool thing you will do today to show God you love Him with all your 
                            <strong> Heart, Soul, Mind, or Strength</strong>?
                        </p>

                        <div className="flex flex-col gap-3 mb-6">
                            <input
                                type="text"
                                value={commitmentInput}
                                onChange={(e) => setCommitmentInput(e.target.value)}
                                placeholder="E.g., Sing a song for God, Be kind to my brother..."
                                className={`flex-1 px-4 py-3 rounded-xl border-2 outline-none focus:border-red-400 transition ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-600 text-white"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                            />
                            <button
                                onClick={addCommitment}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-200 transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Save size={18} /> ACCEPT MISSION
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {commitments.map((commitment, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 ${
                                        darkMode ? "bg-gray-800" : "bg-red-50 border border-red-100"
                                    }`}
                                >
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <CheckCircle className="text-red-500" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 dark:text-gray-100">{commitment.text}</p>
                                        <p className="text-[10px] uppercase font-black opacity-40 mt-1">
                                            Mission Logged: {commitment.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Final Thought</p>
                            <p className="text-sm italic font-medium">
                                "Can two walk together if they don't agree?" (Amos 3:3). 
                                When you agree to love God, You and Him become an unbeatable team! 🤜🤛
                            </p>
                        </div>
                    </div>
                </div>
            )}









                        {activeTab === "quiz" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">
                                        Speed Quiz Challenge
                                    </h3>
                                    {quizActive && (
                                        <div className="flex gap-4 items-center">
                                            <div className="flex items-center gap-2">
                                                <Clock className="text-blue-600" />
                                                <span className="text-xl font-bold">
                                                    {timeLeft}s
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Award className="text-yellow-600" />
                                                <span className="text-xl font-bold">
                                                    {score}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {!quizActive && !showResults && (
                                    <div className="text-center py-12">
                                        <Award
                                            size={64}
                                            className="mx-auto mb-4 text-yellow-600"
                                        />
                                        <h4 className="text-2xl font-bold mb-4">
                                            Ready to Test Your Knowledge?
                                        </h4>
                                        <p className="mb-6 text-lg">
                                            Answer quickly for bonus points!
                                        </p>
                                        <button
                                            onClick={startQuiz}
                                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition transform hover:scale-105"
                                        >
                                            Start Quiz
                                        </button>
                                    </div>
                                )}
                                {quizActive && !showResults && (
                                    <div>
                                        <div
                                            className={`${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-blue-50"
                                            } p-6 rounded-lg mb-6`}
                                        >
                                            <h4 className="text-xl font-semibold mb-4">
                                                Question {currentQuestion + 1}{" "}
                                                of {quizQuestions.length}
                                            </h4>
                                            <p className="text-lg mb-6">
                                                {
                                                    quizQuestions[
                                                        currentQuestion
                                                    ].q
                                                }
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {quizQuestions[
                                                    currentQuestion
                                                ].a.map((answer, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() =>
                                                            checkAnswer(idx)
                                                        }
                                                        className={`${
                                                            darkMode
                                                                ? "bg-gray-800 hover:bg-gray-900"
                                                                : "bg-white hover:bg-gray-50"
                                                        } p-4 rounded-lg border-2 border-blue-600 transition transform hover:scale-105 text-left`}
                                                    >
                                                        <span className="font-bold text-blue-600 mr-2">
                                                            {String.fromCharCode(
                                                                65 + idx
                                                            )}
                                                            .
                                                        </span>
                                                        {answer}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showResults && (
                                    <div className="text-center space-y-6">
                                        <Award
                                            size={80}
                                            className="mx-auto text-yellow-600"
                                        />
                                        <h4 className="text-3xl font-bold">
                                            Quiz Complete!
                                        </h4>
                                        <div
                                            className={`${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-gradient-to-r from-blue-50 to-indigo-50"
                                            } p-8 rounded-lg`}
                                        >
                                            <p className="text-5xl font-bold text-blue-600 mb-2">
                                                {score}
                                            </p>
                                            <p className="text-xl">
                                                Final Score
                                            </p>
                                            <p className="mt-4 text-lg">
                                                {score >= 100
                                                    ? "Outstanding! Excellent knowledge!"
                                                    : score >= 60
                                                    ? "Great work! Keep studying!"
                                                    : "Good effort! Review the lesson."}
                                            </p>
                                        </div>
                                        <button
                                            onClick={startQuiz}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "prayer" && (
                            <div className="space-y-4">
                                {editingContent === "prayer" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-6">
                                    Prayer Points
                                </h3>
                               



                                    <div className="space-y-4">
    {contentData.prayerPoints.map((prayer, idx) => (
        <div
            key={idx}
            className={`${
                darkMode
                    ? "bg-gray-700 border-purple-900"
                    : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
            } p-6 rounded-xl border-l-4 transition-all hover:shadow-md`}
        >
            {editingContent === "prayer" ? (
                <textarea
                    value={prayer}
                    onChange={(e) =>
                        updatePrayerPoint(
                            idx,
                            e.target.value
                        )
                    }
                    className={`w-full px-3 py-2 rounded-lg border font-medium ${
                        darkMode
                            ? "bg-gray-800 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-800"
                    }`}
                    rows={3}
                />
            ) : (
                <div className="flex items-start gap-3">
                    <span className="text-2xl mt-1">
                        {idx === 0 ? "🤝" : idx === 1 ? "💎" : idx === 2 ? "🧠" : "⚡"}
                    </span>
                    <p className={`text-lg leading-relaxed font-medium italic ${darkMode ? 'text-purple-200' : 'text-purple-900'}`}>
                        "{prayer}"
                    </p>
                </div>
            )}
        </div>
    ))}
</div>





                                {editingContent === "prayer" && (
                                    <button
                                        onClick={addPrayerPoint}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Prayer Point
                                    </button>
                                )}
                            </div>
                        )}
                        {activeTab === "manage" && isPaid && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">
                                        Manage Scriptures
                                    </h3>
                                    <button
                                        onClick={() => setEditMode(!editMode)}
                                        className={`${
                                            editMode
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-green-600 hover:bg-green-700"
                                        } text-white px-4 py-2 rounded-lg transition flex items-center gap-2`}
                                    >
                                        {editMode ? (
                                            <>
                                                <X size={16} /> Cancel
                                            </>
                                        ) : (
                                            <>
                                                <Edit2 size={16} /> Add New
                                            </>
                                        )}
                                    </button>
                                </div>
                                {editMode && (
                                    <div
                                        className={`${
                                            darkMode
                                                ? "bg-gray-700"
                                                : "bg-blue-50"
                                        } p-6 rounded-lg space-y-4`}
                                    >
                                        <input
                                            type="text"
                                            value={newVerse.reference}
                                            onChange={(e) =>
                                                setNewVerse({
                                                    ...newVerse,
                                                    reference: e.target.value,
                                                })
                                            }
                                            placeholder="Scripture Reference (e.g., John 3:16)"
                                            className={`w-full px-4 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                        />
                                        {(
                                            [
                                                "KJV",
                                                "NKJV",
                                                "NIV",
                                                "ESV",
                                                "AMP",
                                                "NLT",
                                            ] as const
                                        ).map((version) => (
                                            <div key={version}>
                                                <label className="block font-semibold mb-2">
                                                    {version}
                                                </label>
                                                <textarea
                                                    value={
                                                        newVerse.versions[
                                                            version
                                                        ] || ""
                                                    }
                                                    onChange={(e) =>
                                                        updateVerseVersion(
                                                            version,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Enter ${version} text...`}
                                                    rows={3}
                                                    className={`w-full px-4 py-2 rounded-lg border ${
                                                        darkMode
                                                            ? "bg-gray-800 border-gray-600"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={addNewScripture}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
                                        >
                                            <Save size={16} /> Save Scripture
                                        </button>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    {Object.keys(scriptureDB).map(
                                        (reference) => (
                                            <div
                                                key={reference}
                                                className={`${
                                                    darkMode
                                                        ? "bg-gray-700"
                                                        : "bg-white border border-gray-200"
                                                } p-4 rounded-lg`}
                                            >
                                                <h4 className="font-bold text-lg mb-2">
                                                    {reference}
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        showBibleVersions(
                                                            reference
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    View All Versions →
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTab === "manage" && !isPaid && (
                            <div className="text-center py-12">
                                <Lock
                                    size={64}
                                    className="mx-auto mb-4 text-purple-400"
                                />
                                <h3 className="text-2xl font-bold mb-4">
                                    Premium Feature
                                </h3>
                                <p className="mb-6">
                                    Upgrade to Premium to access scripture
                                    management
                                </p>
                                <button
                                    onClick={() => setShowPaymentGate(true)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold"
                                >
                                    Unlock Now
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showVerseModal && selectedVerse && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowVerseModal(false)}
                >
                    <div
                        className={`${
                            darkMode ? "bg-gray-800" : "bg-white"
                        } rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">
                                    {selectedVerse}
                                </h3>
                                <button
                                    onClick={() => setShowVerseModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                            {(
                                [
                                    "KJV",
                                    "NKJV",
                                    "NIV",
                                    "ESV",
                                    "AMP",
                                    "NLT",
                                    "MSG",

                                ] as const
                            ).map((version) => (
                                <button
                                    key={version}
                                    onClick={() => changeBibleVersion(version)}
                                    disabled={verseLoading}
                                    className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                                        bibleVersion === version
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    } ${
                                        verseLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {version}
                                </button>
                            ))}
                        </div>
                        <div
                            className="p-6 overflow-y-auto"
                            style={{ maxHeight: "calc(85vh - 180px)" }}
                        >
                            {verseLoading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="relative w-16 h-16 mb-4">
                                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                    <p className="text-gray-500 animate-pulse">
                                        Loading scripture...
                                    </p>
                                </div>
                            ) : selectedVerse &&
                              scriptureDB[selectedVerse] &&
                              scriptureDB[selectedVerse][bibleVersion] ? (
                                <div className="text-lg leading-relaxed animate-fadeIn">
                                    {formatScriptureText(
                                        scriptureDB[selectedVerse][bibleVersion]
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">
                                    Translation not available
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SundaySchoolApp;
