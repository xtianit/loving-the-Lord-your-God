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

  "2 Corinthians 2:11": {
    "KJV": "11 Lest Satan should get an advantage of us: for we are not ignorant of his devices.",
    "NKJV": "11 lest Satan should take advantage of us; for we are not ignorant of his devices.",
    "NIV": "11 in order that Satan might not outwit us. For we are not unaware of his schemes.",
    "ESV": "11 so that we would not be outwitted by Satan; for we are not ignorant of his designs.",
    "AMP": "11 to keep Satan from taking advantage of us; for we are not ignorant of his schemes.",
    "NLT": "11 so that Satan will not outsmart us. For we are familiar with his evil schemes.",
    "MSG": "11 After all, we don't want to unwittingly give Satan an opening for yet more mischief—we're not oblivious to his sly ways!"
    },

    "Proverbs 18:10": {
    "KJV": "10 The name of the Lord is a strong tower: the righteous runneth into it, and is safe.",
    "NKJV": "10 The name of the Lord is a strong tower; The righteous run to it and are safe.",
    "NIV": "10 The name of the Lord is a fortified tower; the righteous run to it and are safe.",
    "ESV": "10 The name of the Lord is a strong tower; the righteous man runs into it and is safe.",
    "AMP": "10 The name of the Lord is a strong tower; The righteous runs to it and is safe and set on high [far above evil].",
    "NLT": "10 The name of the Lord is a strong fortress; the godly run to him and are safe.",
    "MSG": "10 God's name is a place of protection—good people can run there and be safe."
    },

  "Daniel 11:32": {
    "KJV": "32 And such as do wickedly against the covenant shall he corrupt by flatteries: but the people that do know their God shall be strong, and do exploits.",
    "NKJV": "32 Those who do wickedly against the covenant he shall corrupt with flattery; but the people who know their God shall be strong, and carry out great exploits.",
    "NIV": "32 With flattery he will corrupt those who have violated the covenant, but the people who know their God will firmly resist him.",
    "ESV": "32 He shall seduce with flattery those who violate the covenant, but the people who know their God shall stand firm and take action.",
    "AMP": "32 By smooth words he will turn to godlessness those who act wickedly against the covenant, but the people who know their God will be strong and take action.",
    "NLT": "32 He will flatter and win over those who have violated the covenant. But the people who know their God will be strong and will resist him.",
    "MSG": "32 Those who betray the covenant will be corrupted by flattery, but people who know their God will be strong and take action."
  },
  "1 Kings 21:1-13": {
        KJV: "1 And it came to pass after these things, that Naboth the Jezreelite had a vineyard, which was in Jezreel, hard by the palace of Ahab king of Samaria. 2 And Ahab spake unto Naboth, saying, Give me thy vineyard, that I may have it for a garden of herbs, because it is near unto my house: and I will give thee for it a better vineyard than it; or, if it seem good to thee, I will give thee the worth of it in money. 3 And Naboth said to Ahab, The Lord forbid it me, that I should give the inheritance of my fathers unto thee. 4 And Ahab came into his house heavy and displeased because of the word which Naboth the Jezreelite had spoken to him: for he had said, I will not give thee the inheritance of my fathers. And he laid him down upon his bed, and turned away his face, and would eat no bread. 5 But Jezebel his wife came to him, and said unto him, Why is thy spirit so sad, that thou eatest no bread? 6 And he said unto her, Because I spake unto Naboth the Jezreelite, and said unto him, Give me thy vineyard for money; or else, if it provide thee better, I will give thee another vineyard for it: and he answered, I will not give thee my vineyard. 7 And Jezebel his wife said unto him, Dost thou now govern the kingdom of Israel? arise, and eat bread, and let thine heart be merry: I will give thee the vineyard of Naboth the Jezreelite. 8 So she wrote letters in Ahab's name, and sealed them with his seal, and sent the letters unto the elders and to the nobles that were in his city, dwelling with Naboth. 9 And she wrote in the letters, saying, Proclaim a fast, and set Naboth on high among the people: 10 And set two men, sons of Belial, before him, to bear witness against him, saying, Thou didst blaspheme God and the king. And then carry him out, and stone him, that he may die. 11 And the men of his city, even the elders and the nobles who were the inhabitants in his city, did as Jezebel had sent unto them, and as it was written in the letters which she had sent unto them. 12 They proclaimed a fast, and set Naboth on high among the people. 13 And there came in two men, children of Belial, and sat before him: and the wicked men witnessed against him, even against Naboth, in the presence of the people, saying, Naboth did blaspheme God and the king. Then they carried him forth out of the city, and stoned him with stones, that he died.",
        NKJV: "1 And it came to pass after these things that Naboth the Jezreelite had a vineyard which was in Jezreel, next to the palace of Ahab king of Samaria. 2 So Ahab spoke to Naboth, saying, “Give me your vineyard, that I may have it for a vegetable garden, because it is near, next to my house; and for it I will give you a vineyard better than it. Or, if it seems good to you, I will give you its worth in money.” 3 But Naboth said to Ahab, “The Lord forbid that I should give the inheritance of my fathers to you!” 4 So Ahab went into his house sullen and displeased because of the word which Naboth the Jezreelite had spoken to him; for he had said, “I will not give you the inheritance of my fathers.” And he lay down on his bed, and turned away his face, and would eat no food. 5 But Jezebel his wife came to him, and said to him, “Why is your spirit so sullen that you eat no food?” 6 He said to her, “Because I spoke to Naboth the Jezreelite, and said to him, ‘Give me your vineyard for money; or else, if it pleases you, I will give you another vineyard for it.’ And he answered, ‘I will not give you my vineyard.’” 7 Then Jezebel his wife said to him, “You now exercise authority over Israel! Arise, eat food, and let your heart be cheerful; I will give you the vineyard of Naboth the Jezreelite.” 8 And she wrote letters in Ahab’s name, sealed them with his seal, and sent the letters to the elders and the nobles who were in his city, dwelling with Naboth. 9 She wrote in the letters, saying, Proclaim a fast, and seat Naboth with high honor among the people; 10 and seat two men, scoundrels, before him to bear witness against him, saying, “You have blasphemed God and the king.” Then take him out, and stone him, that he may die. 11 So the men of his city, the elders and the nobles who were inhabitants in his city, did as Jezebel had sent to them, as it was written in the letters which she had sent to them. 12 They proclaimed a fast, and seated Naboth with high honor among the people. 13 And two men, scoundrels, came in and sat before him; and the scoundrels witnessed against him, against Naboth, in the presence of the people, saying, “Naboth has blasphemed God and the king!” Then they carried him out of the city and stoned him with stones, so that he died.",
        NIV: "1 Some time later there was an incident involving a vineyard belonging to Naboth the Jezreelite. The vineyard was in Jezreel, close to the palace of Ahab king of Samaria. 2 Ahab said to Naboth, “Let me have your vineyard to use for a vegetable garden, since it is close to my palace. In exchange I will give you a better vineyard or, if you prefer, I will pay you whatever it is worth.” 3 But Naboth replied, “The Lord forbid that I should give you the inheritance of my ancestors.” 4 So Ahab went home, sullen and angry because Naboth the Jezreelite had said, “I will not give you the inheritance of my ancestors.” He lay on his bed sulking and refused to eat. 5 His wife Jezebel came in and asked him, “Why are you so sullen? Why won’t you eat?” 6 He answered her, “Because I said to Naboth the Jezreelite, ‘Sell me your vineyard; or if you prefer, I will give you another vineyard in exchange.’ But he said, ‘I will not give you my vineyard.’” 7 Jezebel his wife said, “Is this how you act as king over Israel? Get up and eat! Cheer up. I’ll get you the vineyard of Naboth the Jezreelite.” 8 So she wrote letters in Ahab’s name, placed his seal on them, and sent them to the elders and nobles who lived in Naboth’s city with him. 9 In those letters she wrote: “Proclaim a day of fasting and seat Naboth in a prominent place among the people. 10 But seat two scoundrels opposite him and have them bring charges that he has cursed both God and the king. Then take him out and stone him to death.” 11 So the elders and nobles who lived in Naboth’s city did as Jezebel directed in the letters she had written to them. 12 They proclaimed a fast and seated Naboth in a prominent place among the people. 13 Then two scoundrels came and sat opposite him and brought charges against Naboth before the people, saying, “Naboth has cursed both God and the king.” So they took him outside the city and stoned him to death.",
        ESV: "1 Now Naboth the Jezreelite had a vineyard in Jezreel, beside the palace of Ahab king of Samaria. 2 And after this Ahab said to Naboth, “Give me your vineyard, that I may have it for a vegetable garden, because it is near my house, and I will give you a better vineyard for it; or, if it seems good to you, I will give you its value in money.” 3 But Naboth said to Ahab, “The Lord forbid it me, that I should give you the inheritance of my fathers.” 4 And Ahab came into his house vexed and sullen because of what Naboth the Jezreelite had said to him, for he had said, “I will not give you the inheritance of my fathers.” And he lay down on his bed and turned away his face and would eat no food. 5 But Jezebel his wife came to him and said to him, “Why is your spirit so vexed that you eat no food?” 6 And he said to her, “Because I spoke to Naboth the Jezreelite and said to him, ‘Give me your vineyard for money, or else, if it please you, I will give you another vineyard for it.’ And he answered, ‘I will not give you my vineyard.’” 7 And Jezebel his wife said to him, “Do you now govern Israel? Arise and eat bread and let your heart be cheerful; I will give you the vineyard of Naboth the Jezreelite.” 8 So she wrote letters in Ahab's name and sealed them with his seal, and she sent the letters to the elders and the nobles who lived in his city with Naboth. 9 And she wrote in the letters, “Proclaim a fast, and set Naboth at the head of the people. 10 And set two worthless men opposite him, and let them bring a charge against him, saying, ‘You have cursed God and the king.’ Then take him out and stone him to death.” 11 And the men of his city, the elders and the nobles who lived in his city, did as Jezebel had sent word to them. As it was written in the letters that she had sent to them, 12 they proclaimed a fast and set Naboth at the head of the people. 13 And the two worthless men came in and sat opposite him. And the worthless men brought a charge against Naboth in the presence of the people, saying, “Naboth cursed God and the king.” So they took him outside the city and stoned him to death with stones.",
        AMP: "1 Now it came to pass after these things that Naboth the Jezreelite had a vineyard in Jezreel, beside the palace of Ahab king of Samaria. 2 Ahab spoke to Naboth, saying, “Give me your vineyard so that I may have it for a garden of herbs (vegetables), because it is near my house. I will give you a better vineyard for it, or, if you prefer, I will give you its worth in money.” 3 But Naboth said to Ahab, “The Lord forbid that I should give the inheritance of my fathers to you!” 4 So Ahab went into his house sullen and vexed because of the answer which Naboth the Jezreelite had given him; for he had said, “I will not give you the inheritance of my fathers.” And he lay down on his bed and turned away his face and would eat no food. 5 But Jezebel his wife came to him and asked, “Why is your spirit so troubled that you eat no food?” 6 And he said to her, “Because I spoke to Naboth the Jezreelite and said to him, ‘Give me your vineyard for money; or else, if you prefer, I will give you another vineyard for it.’ And he answered, ‘I will not give you my vineyard.’” 7 Jezebel his wife said to him, “Do you now exercise authority over Israel? Arise, eat bread, and let your heart be cheerful; I will give you the vineyard of Naboth the Jezreelite.” 8 So she wrote letters in Ahab’s name and sealed them with his seal, and sent them to the elders and to the nobles who lived in his city with Naboth. 9 Now she wrote in the letters, saying, “Proclaim a fast and seat Naboth at the head of the people; 10 and seat two worthless and unprincipled men opposite him, and have them testify against him, saying, ‘You cursed God and the king.’ Then take him out and stone him to death.” 11 So the men of his city, the elders and the nobles who lived in his city, did as Jezebel had sent word to them, just as it was written in the letters which she had sent to them. 12 They proclaimed a fast and seated Naboth at the head of the people. 13 Then the two worthless men came in and sat opposite him; and the worthless men testified against Naboth before the people, saying, “Naboth cursed God and the king.” So they took him outside the city and stoned him to death.",
        NLT: "1 Now there was a man named Naboth, from Jezreel, who owned a vineyard in Jezreel beside the palace of King Ahab of Samaria. 2 One day Ahab said to Naboth, “Since your vineyard is so convenient to my palace, I would like to buy it to use as a vegetable garden. I will give you a better vineyard in exchange, or if you prefer, I will pay you for it.” 3 But Naboth replied, “The Lord forbid that I should give you the inheritance that was passed down by my ancestors.” 4 So Ahab went home angry and sullen because of Naboth’s answer. The king went to bed with his face to the wall and refused to eat! 5 “What’s the matter?” his wife Jezebel asked him. “What’s made you so upset that you’re not eating?” 6 “I asked Naboth to sell me his vineyard or trade it, but he refused!” Ahab told her. 7 “Are you the king of Israel or not?” Jezebel asked. “Get up and eat something, and don’t worry about it. I’ll get you Naboth’s vineyard!” 8 So she wrote letters in Ahab’s name, sealed them with his seal, and sent them to the elders and other leaders of the town where Naboth lived. 9 In her letters she commanded: “Call the citizens together for a fast and give Naboth a place of honor. 10 And then seat two scoundrels across from him who will accuse him of cursing God and the king. Then take him out and stone him to death.” 11 So the elders and other town leaders followed the instructions Jezebel had written in the letters. 12 They called for a fast and put Naboth at a place of honor among the people. 13 Then the two scoundrels came and sat down across from him. And they accused Naboth before all the people, saying, “Naboth cursed God and the king.” So he was dragged outside the town and stoned to death.",
        MSG: "1-3 It came about after this that Naboth the Jezreelite owned a vineyard in Jezreel. It was right next to the palace of Ahab king of Samaria. Ahab said to Naboth, “Give me your vineyard so I can use it for a kitchen garden; it’s right next to my house. I’ll give you a better vineyard in exchange, or if you prefer, I’ll pay you a fair price in cash.” Naboth said to Ahab, “God forbid that I should give you my family inheritance!” 4 Ahab went home in a black mood, sulking because of Naboth’s answer, “I’ll never give you my family inheritance.” He went to bed, turned his face to the wall, and wouldn't eat a bite. 5-6 His wife Jezebel came in and said, “What’s going on? Why are you so out of sorts? Why aren't you eating?” He told her, “Because I spoke to Naboth the Jezreelite and said, ‘Give me your vineyard. I’ll pay you for it or, if you’d rather, I’ll give you another vineyard in exchange.’ And he said, ‘I’ll never give you my vineyard.’” 7 Jezebel his wife said, “Is this how the king of Israel acts? Get out of bed! Eat! Cheer up! I’ll get you the vineyard of Naboth the Jezreelite.” 8-10 So she wrote letters in Ahab’s name and sealed them with his seal. She sent the letters to the city fathers and leaders who lived in Naboth’s city. She wrote: “Call for a fast. Put Naboth in the front row. Then find two hoodlums and seat them opposite him. Have them accuse him, ‘You cursed God and the King!’ Then take him out and stone him to death.” 11-13 The city fathers and leaders did what Jezebel ordered in the letters she had sent them. They called for a fast and put Naboth in the front row. Then the two hoodlums came in, sat in the witness box, and accused Naboth before the people: “Naboth cursed God and the King!” They took him outside the city and stoned him to death."
    },
  "1 Kings 21:1-2": {
    KJV: "1 And it came to pass after these things, that Naboth the Jezreelite had a vineyard, which was in Jezreel, hard by the palace of Ahab king of Samaria. 2 And Ahab spake unto Naboth, saying, Give me thy vineyard, that I may have it for a garden of herbs, because it is near unto my house: and I will give thee for it a better vineyard than it; or, if it seem good to thee, I will give thee the worth of it in money.",
    NKJV: "1 And it came to pass after these things that Naboth the Jezreelite had a vineyard which was in Jezreel, next to the palace of Ahab king of Samaria. 2 So Ahab spoke to Naboth, saying, “Give me your vineyard, that I may have it for a vegetable garden, because it is near, next to my house; and for it I will give you a vineyard better than it. Or, if it seems good to you, I will give you its worth in money.”",
    NIV: "1 Some time later there was an incident involving a vineyard belonging to Naboth the Jezreelite. The vineyard was in Jezreel, close to the palace of Ahab king of Samaria. 2 Ahab said to Naboth, “Let me have your vineyard to use for a vegetable garden, since it is close to my palace. In exchange I will give you a better vineyard or, if you prefer, I will pay you whatever it is worth.”",
    ESV: "1 Now Naboth the Jezreelite had a vineyard in Jezreel, beside the palace of Ahab king of Samaria. 2 And after this Ahab said to Naboth, “Give me your vineyard, that I may have it for a vegetable garden, because it is near my house, and I will give you a better vineyard for it; or, if it seems good to you, I will give you its value in money.”",
    AMP: "1 Now it came to pass after these things that Naboth the Jezreelite had a vineyard in Jezreel, beside the palace of Ahab king of Samaria. 2 Ahab spoke to Naboth, saying, “Give me your vineyard so that I may have it for a garden of herbs (vegetables), because it is near my house. I will give you a better vineyard for it, or, if you prefer, I will give you its worth in money.”",
    NLT: "1 Now there was a man named Naboth, from Jezreel, who owned a vineyard in Jezreel beside the palace of King Ahab of Samaria. 2 One day Ahab said to Naboth, “Since your vineyard is so convenient to my palace, I would like to buy it to use as a vegetable garden. I will give you a better vineyard in exchange, or if you prefer, I will pay you for it.”",
    MSG: "1-2 It came about after this that Naboth the Jezreelite owned a vineyard in Jezreel. It was right next to the palace of Ahab king of Samaria. Ahab said to Naboth, “Give me your vineyard so I can use it for a kitchen garden; it’s right next to my house. I’ll give you a better vineyard in exchange, or if you prefer, I’ll pay you a fair price in cash.”"
  },
  "1 Kings 21:1": {
    KJV: "1 And it came to pass after these things, that Naboth the Jezreelite had a vineyard, which was in Jezreel, hard by the palace of Ahab king of Samaria.",
    NKJV: "1 And it came to pass after these things that Naboth the Jezreelite had a vineyard which was in Jezreel, next to the palace of Ahab king of Samaria.",
    NIV: "1 Some time later there was an incident involving a vineyard belonging to Naboth the Jezreelite. The vineyard was in Jezreel, close to the palace of Ahab king of Samaria.",
    ESV: "1 Now Naboth the Jezreelite had a vineyard in Jezreel, beside the palace of Ahab king of Samaria.",
    AMP: "1 Now it came to pass after these things that Naboth the Jezreelite had a vineyard in Jezreel, beside the palace of Ahab king of Samaria.",
    NLT: "1 Now there was a man named Naboth, from Jezreel, who owned a vineyard in Jezreel beside the palace of King Ahab of Samaria.",
    MSG: "1 It came about after this that Naboth the Jezreelite owned a vineyard in Jezreel. It was right next to the palace of Ahab king of Samaria."
  },
  "John 5:7": {
    KJV: "7 The impotent man answered him, Sir, I have no man, when the water is troubled, to put me into the pool: but while I am coming, another steppeth down before me.",
    NKJV: "7 The sick man answered Him, “Sir, I have no man to put me into the pool when the water is stirred up; but while I am coming, another steps down before me.”",
    NIV: "7 “Sir,” the invalid replied, “I have no one to help me into the pool when the water is stirred. While I am trying to get in, someone else goes down ahead of me.”",
    ESV: "7 The sick man answered him, “Sir, I have no one to put me into the pool when the water is stirred up, and while I am going another steps down before me.”",
    AMP: "7 The invalid answered, “Sir, I have no one to put me into the pool when the water is stirred up, and while I am coming [to get into it], someone else steps down before me.”",
    NLT: "7 “I can't, sir,” the sick man said, “for I have no one to put me into the pool when the water bubbles up. Someone else always gets there ahead of me.”",
    MSG: "7 The sick man said, “Sir, when the water is stirred, I don't have anybody to help me into the pool. By the time I get there, somebody else is already in.”"
  }
};



const quizQuestions = [
    {
        q: "According to 2 Corinthians 2:11, why should believers not be ignorant?",
        a: [
            "So they can gain wealth",
            "So Satan will not take advantage of them",
            "So they can rule nations",
            "So they can avoid responsibility"
        ],
        correct: 1
    },
    {
        q: "What biblical story forms the foundation of this lesson?",
        a: [
            "David and Goliath",
            "Joseph in Egypt",
            "Naboth and his vineyard",
            "Elijah and the prophets of Baal"
        ],
        correct: 2
    },
    {
        q: "What does the lesson say your 'vineyard' may represent today?",
        a: [
            "Only farmland",
            "Only inherited property",
            "Talents, business, relationships, position, or God’s assignment",
            "Government authority"
        ],
        correct: 2
    },
    {
        q: "What happened to Naboth according to the lesson review?",
        a: [
            "He became wealthy",
            "He moved to another city",
            "He died as a result of ignorance",
            "He inherited another vineyard"
        ],
        correct: 2
    },
    {
        q: "The story of the man who discovered crude oil under his house illustrates that:",
        a: [
            "Oil exploration is profitable",
            "People can possess great treasure yet remain poor due to ignorance",
            "Property should always be sold",
            "Bankruptcy leads to wealth"
        ],
        correct: 1
    },
    {
        q: "What does the lesson 'Closeness to God' emphasize?",
        a: [
            "Financial success",
            "Political influence",
            "Spiritual protection through closeness to God",
            "Public recognition"
        ],
        correct: 2
    },
    {
        q: "Which scripture supports the lesson on closeness to God?",
        a: [
            "Proverbs 18:10",
            "Genesis 1:1",
            "Matthew 5:9",
            "Psalm 150:6"
        ],
        correct: 0
    },
    {
        q: "According to the lesson, what character flaw did Ahab demonstrate?",
        a: [
            "Patience",
            "Generosity",
            "Selfishness",
            "Courage"
        ],
        correct: 2
    },
    {
        q: "The lesson 'Consider What’s Dear to Others' teaches believers to:",
        a: [
            "Respect and value what belongs to others",
            "Take advantage of others",
            "Ignore neighbors",
            "Compete with everyone"
        ],
        correct: 0
    },
    {
        q: "According to the conclusion and Daniel 11:32, those who know their God will:",
        a: [
            "Avoid responsibility",
            "Remain silent",
            "Do exploits",
            "Live without challenges"
        ],
        correct: 2
    }
];




const SundaySchoolApp = () => {
    const [showPaymentGate, setShowPaymentGate] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");
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
    const [faithRating, setFaithRating] = useState(5);
    const [commitments, setCommitments] = useState<
        Array<{ text: string; date: string }>
    >([]);
    const [commitmentInput, setCommitmentInput] = useState("");
    const [editingContent, setEditingContent] = useState<string | null>(null);

    type SubPoint = { title: string; content: string; scripture?: string };
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
        objectives: string;
        lessonIntro: string;
        lessonPoints: LessonPoint[];
        conclusion: string;
        conclusionScriptures: string[];
        prayerPoints: string[];
    };
    

const [contentData, setContentData] = useState<ContentData>({
    lessonDate: "March 15, 2026",
    lessonTitle: "Ignorant Of Own Treasure (Part 2)",

    memoryVerse:
        "Lest Satan should get an advantage of us. For we are not ignorant of his devices.",
    memoryVerseRef: "2 Corinthians 2:11",

    introScriptures: [
        "2 Corinthians 2:11"
    ],

    lessonIntroScriptures: ["1 Kings 21:1-13"],

    introduction:
        "This lesson should be an eye-opener to every child of God who has been blessed by the Lord. In Naboth's case it was a physical vineyard but yours may be different. Your vineyard could be a talent, business, properties, relations, position, assignment of God, etc. Utilize it appropriately and enjoy what it has to offer.",

    aims:
        "To arouse brethren to carefully examine what's at their disposal.",

    objectives:
        "To prevent the brethren from premature death out of ignorance.",

    lessonIntro:
        "Naboth was poor and died as a result of his ignorance. Vineyards are great asset far beyond the understanding of Naboth. This incident is like that of a man who sold his properties except the house he lived in due to bankruptcy. He had decided to sell the house also until he mistakenly plunged a pole on the floor which vomited crude oil. All that treasure was under him but he was poor due to ignorance. Appreciate what you have before others will take it.",

    lessonPoints: [
        {
            title: "CLOSENESS TO GOD:",
            content:
                "Naboth was too far from God to get his protection for himself and the vineyard. Get closer to God for your security.",
            scriptures: ["Proverbs 18:10"],
            subPoints: [],
        },
        {
            title: "CONSIDER WHAT'S DEAR TO OTHERS:",
            content:
                "Ahab was so selfish and didn't consider his neighbor. We must learn to respect and value what belongs to others.",
            scriptures: [],
            subPoints: [],
        }
    ],

    conclusion:
        "Don't give any place for ignorance in your life because it will destroy you. They that obtain knowledge shall do exploits.",

    conclusionScriptures: ["Daniel 11:32"],

    prayerPoints: [
        "Father, remove every form of ignorance from my life.",
        "Lord, help me recognize and value the treasures You have given me.",
        "Father, draw me closer to You so that I may enjoy Your protection and guidance."
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

    const addCommitment = () => {
        if (commitmentInput.trim()) {
            setCommitments((prev) => [
                ...prev,
                {
                    text: commitmentInput,
                    date: new Date().toLocaleDateString(),
                },
            ]);
            setCommitmentInput("");
        }
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
    const animatedText = "Dancing in Fame and Glory".split("");

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
                            Ignorant Of Own Treasure (Part 2)
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
                                        Text: 1 Kings 21:1-13
                                    </h3>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() =>
                                                showBibleVersions(
                                                    "1 Kings 21:1-13"
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                        >
                                        <BookOpen size={16} />
                                            Read  1 Kings 21:1-13
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
                                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mt-4">
                                                {/* <button
                                                onClick={() =>
                                                    showBibleVersions(
                                                        "Jeremiah 17:5"
                                                    )
                                                }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-lg transition flex items-center gap-2 text-sm"
                                            > */}
                                            {/* <BookOpen size={16} />
                                                Jeremiah 17:5
                                            </button>

                                            <button
                                                onClick={() =>
                                                    showBibleVersions(
                                                        "Psalm 121:2"
                                                    )
                                                }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-lg transition flex items-center gap-2 text-sm"
                                            >
                                                <BookOpen size={16} />
                                                    Psalm 121:2
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        showBibleVersions(
                                                            "1 Samuel 2:9"
                                                        )
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-lg transition flex items-center gap-2 text-sm">
                                                    <BookOpen size={16} />
                                                        1 Samuel 2:9
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        showBibleVersions(
                                                            "Romans 3:12"
                                                        )
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-lg transition flex items-center gap-2 text-sm">
                                                    <BookOpen size={16} />
                                                        Romans 3:12
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        showBibleVersions(
                                                            "Matthew 28:18"
                                                        )
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-lg transition flex items-center gap-2 text-sm">
                                                    <BookOpen size={16} />
                                                        Matthew 28:18
                                                </button> */}
                                                    

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
                                                                                subPoint.scripture ||
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
                                                                                {subPoint.scripture && (
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            if (
                                                                                                subPoint.scripture
                                                                                            )
                                                                                                showBibleVersions(
                                                                                                    subPoint.scripture
                                                                                                );
                                                                                        }}
                                                                                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                                                                                    >
                                                                                        📖
                                                                                        Read{" "}
                                                                                        {
                                                                                            subPoint.scripture
                                                                                        }
                                                                                    </button>
                                                                                )}
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
        <h3 className="text-2xl font-bold mb-4">Personal Application</h3>

        {/* Self-Assessment */}
        <div
            className={`${
                darkMode
                    ? "bg-gray-700"
                    : "bg-gradient-to-r from-blue-50 to-indigo-50"
            } p-6 rounded-lg`}
        >
            <h4 className="text-xl font-semibold mb-4">
                Self-Assessment: Ignorant Of Own Treasure
            </h4>

            <p className="mb-4">
                On a scale of 1 to 10, how well do you recognize, value, and cultivate
                the treasures God has placed in your life instead of neglecting them
                (1 Kings 21:1–2; Hosea 4:6a)?
            </p>

            <div className="flex items-center gap-4">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={faithRating}
                    onChange={(e) => setFaithRating(Number(e.target.value))}
                    className="flex-1"
                />
                <span className="text-2xl font-bold text-blue-600">
                    {faithRating}/10
                </span>
            </div>

            <p className="mt-3 text-sm italic">
                {faithRating >= 8
                    ? "Excellent! Continue appreciating and cultivating your God-given treasures before others attempt to seize them."
                    : faithRating >= 5
                    ? "You are making progress. Examine what you may be undervaluing and begin to intentionally cultivate it."
                    : "This is a wake-up call. Ask God for wisdom to recognize and protect what He has already placed in your hands."}
            </p>
        </div>

        {/* Personal Decisions */}
        <div
            className={`${
                darkMode
                    ? "bg-gray-700"
                    : "bg-white border border-gray-200"
            } p-6 rounded-lg`}
        >
            <h4 className="text-xl font-semibold mb-4">
                Personal Decisions: Valuing My Treasure
            </h4>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="text"
                    value={commitmentInput}
                    onChange={(e) => setCommitmentInput(e.target.value)}
                    placeholder="Write a personal decision (e.g., identify my gifts, cultivate my skills, protect my opportunities, avoid ignorance, refuse to celebrate poverty)..."
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                        darkMode
                            ? "bg-gray-800 border-gray-600"
                            : "bg-white border-gray-300"
                    }`}
                    onKeyPress={(e) =>
                        e.key === "Enter" && addCommitment()
                    }
                />
                <button
                    onClick={addCommitment}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                    <Save size={16} /> Save
                </button>
            </div>

            <div className="space-y-2">
                {commitments.map((commitment, idx) => (
                    <div
                        key={idx}
                        className={`${
                            darkMode ? "bg-gray-800" : "bg-gray-50"
                        } p-3 rounded-lg flex items-start gap-3`}
                    >
                        <CheckCircle
                            className="text-green-600 mt-1"
                            size={20}
                        />
                        <div className="flex-1">
                            <p>{commitment.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                                {commitment.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-sm italic text-gray-500">
                Naboth failed to maximize the full potential of his vineyard,
                and ignorance led to loss (1 Kings 21:1–13). The man at the pool
                lost opportunities because others moved faster (John 5:7).
                Do not allow ignorance, delay, or carelessness to rob you of
                what God has given you. Make deliberate and practical decisions
                to cultivate and protect your treasure.
            </p>
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
                                {contentData.prayerPoints.map((prayer, idx) => (
                                    <div
                                        key={idx}
                                        className={`${
                                            darkMode
                                                ? "bg-gray-700"
                                                : "bg-gradient-to-r from-purple-50 to-pink-50"
                                        } p-6 rounded-lg border-l-4 border-purple-600`}
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
                                                className={`w-full px-3 py-2 rounded-lg border ${
                                                    darkMode
                                                        ? "bg-gray-800 border-gray-600"
                                                        : "bg-white border-gray-300"
                                                }`}
                                                rows={3}
                                            />
                                        ) : (
                                            <p className="text-lg leading-relaxed">
                                                {prayer}
                                            </p>
                                        )}
                                    </div>
                                ))}
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
