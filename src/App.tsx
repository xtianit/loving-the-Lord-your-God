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
};

type ScriptureDB = Record<string, BibleVersions>;

const initialScriptureDB: ScriptureDB = {
    "Hosea 4:6": {
        KJV: "6 My people are destroyed for lack of knowledge: because thou hast rejected knowledge, I will also reject thee, that thou shalt be no priest to me: seeing thou hast forgotten the law of thy God, I will also forget thy children.",
        NKJV: "6 My people are destroyed for lack of knowledge. Because you have rejected knowledge, I also will reject you from being priest for Me; Because you have forgotten the law of your God, I also will forget your children.",
        NIV: "6 My people are destroyed from lack of knowledge. Because you have rejected knowledge, I also reject you as my priests; because you have ignored the law of your God, I also will ignore your children.",
        ESV: "6 My people are destroyed for lack of knowledge; because you have rejected knowledge, I reject you from being a priest to me. And since you have forgotten the law of your God, I also will forget your children.",
        AMP: "6 My people are destroyed for lack of knowledge [of My law, where I reveal My will]. Because you [the priestly nation] have rejected knowledge, I will also reject you from being My priest. Since you have forgotten the law of your God, I will also forget your children.",
        NLT: "6 My people are being destroyed because they don’t know me. Since you priests refuse to know me, I refuse to recognize you as my priests. Since you have forgotten the laws of your God, I will forget to bless your children."
    },
    "Matthew 24:12": {
        KJV: "12 And because iniquity shall abound, the love of many shall wax cold.",
        NKJV: "12 And because lawlessness will abound, the love of many will grow cold.",
        NIV: "12 Because of the increase of wickedness, the love of most will grow cold,",
        ESV: "12 And because lawlessness will be increased, the love of many will grow cold.",
        AMP: "12 And because lawlessness will be increased, the love of most people will grow cold.",
        NLT: "12 Sin will be rampant everywhere, and the love of many will grow cold."
    },
    "Matthew 24:38": {
        KJV: "38 For as in the days that were before the flood they were eating and drinking, marrying and giving in marriage, until the day that Noe entered into the ark,",
        NKJV: "38 For as in the days before the flood, they were eating and drinking, marrying and giving in marriage, until the day that Noah entered the ark,",
        NIV: "38 For in the days before the flood, people were eating and drinking, marrying and giving in marriage, up to the day Noah entered the ark;",
        ESV: "38 For as in those days before the flood they were eating and drinking, marrying and giving in marriage, until the day when Noah entered the ark,",
        AMP: "38 For as in those days before the flood they were eating and drinking, marrying and giving in marriage, until the [very] day when Noah entered the ark,",
        NLT: "38 In those days before the flood, the people were enjoying banquets and parties and weddings right up to the time Noah entered his boat."
    },
    "John 14:6": {
        KJV: "6 Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
        NKJV: "6 Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father except through Me.",
        NIV: "6 Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.",
        ESV: "6 Jesus said to him, “I am the way, and the truth, and the life. No one comes to the Father except through me.",
        AMP: "6 Jesus said to him, “I am the [only] Way [to God] and the [real] Truth and the [real] Life; no one comes to the Father but through Me.",
        NLT: "6 Jesus told him, “I am the way, the truth, and the life. No one can come to the Father except through me."
    },
    "Galatians 1:13-14": {
        KJV: "13 For ye have heard of my conversation in time past in the Jews' religion, how that beyond measure I persecuted the church of God, and wasted it: 14 And profited in the Jews' religion above many my equals in mine own nation, being more exceedingly zealous of the traditions of my fathers.",
        NKJV: "13 For you have heard of my former conduct in Judaism, how I persecuted the church of God beyond measure and tried to destroy it. 14 And I advanced in Judaism beyond many of my contemporaries in my own nation, being more exceedingly zealous for the traditions of my fathers.",
        NIV: "13 For you have heard of my previous way of life in Judaism, how intensely I persecuted the church of God and tried to destroy it. 14 I was advancing in Judaism beyond many of my own age among my people and was extremely zealous for the traditions of my fathers.",
        ESV: "13 For you have heard of my former life in Judaism, how I persecuted the church of God violently and tried to destroy it. 14 And I was advancing in Judaism beyond many of my own age among my people, so extremely zealous was I for the traditions of my fathers.",
        AMP: "13 You have heard of my past career and former manner of life in the Jewish religion (Judaism), how I employed myself in persecuting and attacking the church of God violently and tried to destroy it. 14 And I [was] advancing in Judaism beyond many of my contemporaries among my countrymen, being more extremely zealous for the traditions of my fathers.",
        NLT: "13 You know what I was like when I followed the Jewish religion—how I violently persecuted God’s church. I did my best to destroy it. 14 I was far ahead of my fellow Jews in my zeal for the traditions of my ancestors."
    },
    "Philippians 2:3": {
        KJV: "3 Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves.",
        NKJV: "3 Let nothing be done through selfish ambition or conceit, but in lowliness of mind let each esteem others better than himself.",
        NIV: "3 Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves,",
        ESV: "3 Do nothing from selfish ambition or conceit, but in humility count others more significant than yourselves.",
        AMP: "3 Do nothing from selfishness or empty conceit [through factional motives, or strife], but with [an attitude of] humility [being neither arrogant nor self-righteous], regard others as more important than yourselves.",
        NLT: "3 Don’t be selfish; don’t try to impress others. Be humble, thinking of others as better than yourselves."
    },
    "Colossians 2:8": {
        KJV: "8 Beware lest any man spoil you through philosophy and vain deceit, after the tradition of men, after the rudiments of the world, and not after Christ.",
        NKJV: "8 Beware lest anyone cheat you through philosophy and empty deceit, according to the tradition of men, according to the basic principles of the world, and not according to Christ.",
        NIV: "8 See to it that no one takes you captive through hollow and deceptive philosophy, which depends on human tradition and the elemental spiritual forces of this world rather than on Christ.",
        ESV: "8 See to it that no one takes you captive by philosophy and empty deceit, according to human tradition, according to the elemental spirits of the world, and not according to Christ.",
        AMP: "8 See to it that no one takes you captive through philosophy and empty deception [pseudo-intellectual babble], according to the tradition [and musings] of mere men, following the elementary principles of this world, rather than following [the truth—the teachings of] Christ.",
        NLT: "8 Don’t let anyone capture you with empty philosophies and high-sounding nonsense that come from human thinking and from the spiritual powers of this world, rather than from Christ."
    },
    "Colossians 2:20": {
        KJV: "20 Wherefore if ye be dead with Christ from the rudiments of the world, why, as though living in the world, are ye subject to ordinances,",
        NKJV: "20 Therefore, if you died with Christ from the basic principles of the world, why, as though living in the world, do you subject yourselves to regulations—",
        NIV: "20 Since you died with Christ to the elemental spiritual forces of this world, why, as though you still belonged to the world, do you submit to its rules:",
        ESV: "20 If with Christ you died to the elemental spirits of the world, why, as if you were still alive in the world, do you submit to regulations—",
        AMP: "20 If you have died with Christ to the elementary principles of the world, why, as if you were still living in the world, do you submit to rules and regulations, such as,",
        NLT: "20 You have died with Christ, and he has set you free from the spiritual powers of this world. So why do you keep on following the rules of the world, such as,"
    },
    "1 Corinthians 3:1-5": {
        KJV: "1 And I, brethren, could not speak unto you as unto spiritual, but as unto carnal, even as unto babes in Christ. 2 I have fed you with milk, and not with meat: for hitherto ye were not able to bear it, neither yet now are ye able. 3 For ye are yet carnal: for whereas there is among you envying, and strife, and divisions, are ye not carnal, and walk as men? 4 For while one saith, I am of Paul; and another, I am of Apollos; are ye not carnal? 5 Who then is Paul, and who is Apollos, but ministers by whom ye believed, even as the Lord gave to every man?",
        NKJV: "1 And I, brethren, could not speak to you as to spiritual people but as to carnal, as to babes in Christ. 2 I fed you with milk and not with solid food; for until now you were not able to receive it, and even now you are still not able; 3 for you are still carnal. For where there is envy, strife, and divisions among you, are you not carnal and behaving like mere men? 4 For when one says, “I am of Paul,” and another, “I am of Apollos,” are you not carnal? 5 Who then is Paul, and who is Apollos, but ministers through whom you believed, as the Lord gave to each one?",
        NIV: "1 Brothers and sisters, I could not address you as people who live by the Spirit but as people who are still worldly—mere infants in Christ. 2 I gave you milk, not solid food, for you were not yet ready for it. Indeed, you are still not ready. 3 You are still worldly. For since there is jealousy and quarreling among you, are you not worldly? Are you not acting like mere humans? 4 For when one says, “I follow Paul,” and another, “I follow Apollos,” are you not mere human beings? 5 What, after all, is Apollos? And what is Paul? Only servants, through whom you came to believe—as the Lord has assigned to each his task.",
        ESV: "1 But I, brothers, could not address you as spiritual people, but as people of the flesh, as infants in Christ. 2 I fed you with milk, not solid food, for you were not ready for it. And even now you are not yet ready, 3 for you are still of the flesh. For while there is jealousy and strife among you, are you not of the flesh and behaving only in a human way? 4 For when one says, “I follow Paul,” and another, “I follow Apollos,” are you not being merely human? 5 What then is Apollos? What is Paul? Servants through whom you believed, as the Lord assigned to each.",
        AMP: "1 However, brothers and sisters, I could not talk to you as to spiritual people [people dominated by the Spirit], but as to worldly people [dominated by human nature], as to infants [in the new life] in Christ! 2 I fed you with milk, not solid food; for you were not yet able to receive it. Even now you are still not ready. 3 You are still worldly [controlled by ordinary impulses, the sinful capacity]. For as long as there is jealousy and strife and discord among you, are you not unspiritual, and are you not walking like ordinary men [unchanged by faith]? 4 For when one of you says, “I am [a disciple] of Paul,” and another, “I am [a disciple] of Apollos,” are you not [proving yourselves to be] merely [unchanged] men? 5 What then is Apollos? And what is Paul? Just servants through whom you believed [in Christ], even as the Lord appointed to each his task.",
        NLT: "1 Dear brothers and sisters, when I was with you I couldn’t talk to you as I would to spiritual people. I had to talk as though you belonged to this world or as though you were infants in Christ. 2 I had to feed you with milk, not with solid food, because you weren’t ready for anything stronger. And you still aren’t ready, 3 for you are still controlled by your sinful nature. You are jealous of one another and quarrel with each other. Doesn’t that prove you are controlled by your sinful nature? Aren’t you living like people of the world? 4 When one of you says, “I am a follower of Paul,” and another says, “I follow Apollos,” aren’t you acting just like people of the world? 5 After all, who is Apollos? Who is Paul? We are only God’s servants through whom you believed the Good News. Each of us did the work the Lord gave us."
    },
    "1 Corinthians 3:8": {
        KJV: "8 Now he that planteth and he that watereth are one: and every man shall receive his own reward according to his own labour.",
        NKJV: "8 Now he who plants and he who waters are one, and each one will receive his own reward according to his own labor.",
        NIV: "8 The one who plants and the one who waters have one purpose, and they will each be rewarded according to their own labor.",
        ESV: "8 He who plants and he who waters are one, and each will receive his wages according to his labor.",
        AMP: "8 Now he who plants and he who waters are one [in importance and esteem, working toward the same purpose]; but each will receive his own reward according to his own labor.",
        NLT: "8 The one who plants and the one who waters work together with the same purpose. And both will be rewarded for their own hard work."
    },
    "1 Corinthians 12:13": {
        KJV: "13 For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit.",
        NKJV: "13 For by one Spirit we were all baptized into one body—whether Jews or Greeks, whether slaves or free—and have all been made to drink into one Spirit.",
        NIV: "13 For we were all baptized by one Spirit so as to form one body—whether Jews or Gentiles, slave or free—and we were all given the one Spirit to drink.",
        ESV: "13 For in one Spirit we were all baptized into one body—Jews or Greeks, slaves or free—and all were made to drink of one Spirit.",
        AMP: "13 For by one [Holy] Spirit we were all baptized into one body, [spiritually transformed—united together] whether Jews or Greeks (Gentiles), slaves or free, and we were all made to drink of one [Holy] Spirit [since the same Holy Spirit fills each life].",
        NLT: "13 Some of us are Jews, some are Gentiles, some are slaves, and some are free. But we have all been baptized into one body by one Spirit, and we all share the same Spirit."
    },
    "1 Corinthians 14:29-33": {
        KJV: "29 Let the prophets speak two or three, and let the other judge. 30 If any thing be revealed to another that sitteth by, let the first hold his peace. 31 For ye may all prophesy one by one, that all may learn, and all may be comforted. 32 And the spirits of the prophets are subject to the prophets. 33 For God is not the author of confusion, but of peace, as in all churches of the saints.",
        NKJV: "29 Let two or three prophets speak, and let the others judge. 30 But if anything is revealed to another who sits by, let the first keep silent. 31 For you can all prophesy one by one, that all may learn and all may be encouraged. 32 And the spirits of the prophets are subject to the prophets. 33 For God is not the author of confusion but of peace, as in all the churches of the saints.",
        NIV: "29 Two or three prophets should speak, and the others should weigh carefully what is said. 30 And if a revelation comes to someone who is sitting down, the first speaker should stop. 31 For you can all prophesy in turn so that everyone may be instructed and encouraged. 32 The spirits of prophets are subject to the control of prophets. 33 For God is not a God of disorder but of peace—as in all the congregations of the Lord’s people.",
        ESV: "29 Let two or three prophets speak, and let the others weigh what is said. 30 If a revelation is made to another sitting there, let the first be silent. 31 For you can all prophesy one by one, so that all may learn and all be encouraged, 32 and the spirits of prophets are subject to prophets. 33 For God is not a God of confusion but of peace. As in all the churches of the saints,",
        AMP: "29 Let two or three prophets speak [as inspired by the Holy Spirit], and let the others weigh what is said [testing it by the Word of God]. 30 But if a revelation is made to another who is seated [nearby], let the first one be silent. 31 For you can all prophesy one by one [taking your turn], so that all may learn and all may be exhorted [and encouraged]. 32 The spirits of prophets are subject to the prophets [the prophecy is under the speaker’s control, and he can stop speaking]; 33 for God is not a God of confusion and disorder but of peace and order. As [is the practice] in all the churches of the saints (God’s people),",
        NLT: "29 Let two or three people prophesy, and let the others evaluate what is said. 30 But if someone is prophesying and another person receives a revelation from the Lord, the one who is speaking must stop. 31 In this way, all who prophesy will have a turn to speak, one after the other, so that everyone will learn and be encouraged. 32 Remember that people who prophesy are in control of their spirit and can take turns. 33 For God is not a God of disorder but of peace, as in all the meetings of God’s holy people."
    },
    "1 Corinthians 3:3-4": {
        KJV: "3 For ye are yet carnal: for whereas there is among you envying, and strife, and divisions, are ye not carnal, and walk as men? 4 For while one saith, I am of Paul; and another, I am of Apollos; are ye not carnal?",
        NKJV: "3 for you are still carnal. For where there is envy, strife, and divisions among you, are you not carnal and behaving like mere men? 4 For when one says, “I am of Paul,” and another, “I am of Apollos,” are you not carnal?",
        NIV: "3 You are still worldly. For since there is jealousy and quarreling among you, are you not worldly? Are you not acting like mere humans? 4 For when one says, “I follow Paul,” and another, “I follow Apollos,” are you not mere human beings?",
        ESV: "3 for you are still of the flesh. For while there is jealousy and strife among you, are you not of the flesh and behaving only in a human way? 4 For when one says, “I follow Paul,” and another, “I follow Apollos,” are you not being merely human?",
        AMP: "3 You are still worldly [controlled by ordinary impulses, the sinful capacity]. For as long as there is jealousy and strife and discord among you, are you not unspiritual, and are you not walking like ordinary men [unchanged by faith]? 4 For when one of you says, “I am [a disciple] of Paul,” and another, “I am [a disciple] of Apollos,” are you not [proving yourselves to be] merely [unchanged] men?",
        NLT: "3 for you are still controlled by your sinful nature. You are jealous of one another and quarrel with each other. Doesn’t that prove you are controlled by your sinful nature? Aren’t you living like people of the world? 4 When one of you says, “I am a follower of Paul,” and another says, “I follow Apollos,” aren’t you acting just like people of the world?"
    },
    "2 Timothy 2:4": {
        KJV: "4 No man that warreth entangleth himself with the affairs of this life; that he may please him who hath chosen him to be a soldier.",
        NKJV: "4 No one engaged in warfare entangles himself with the affairs of this life, that he may please him who enlisted him as a soldier.",
        NIV: "4 No one serving as a soldier gets entangled in civilian affairs, but rather tries to please his commanding officer.",
        ESV: "4 No soldier gets entangled in civilian pursuits, since his aim is to please the one who enlisted him.",
        AMP: "4 No soldier in active service gets entangled in the [ordinary business] affairs of civilian life; [he avoids them] so that he may please the one who enlisted him to serve.",
        NLT: "4 Soldiers don’t get tied up in the affairs of civilian life, for then they cannot please the officer who enlisted them."
    },
    "2 Timothy 4:10": {
        KJV: "10 For Demas hath forsaken me, having loved this present world, and is departed unto Thessalonica; Crescens to Galatia, Titus unto Dalmatia.",
        NKJV: "10 for Demas has forsaken me, having loved this present world, and has departed for Thessalonica—Crescens for Galatia, Titus for Dalmatia.",
        NIV: "10 for Demas, because he loved this world, has deserted me and has gone to Thessalonica. Crescens has gone to Galatia, and Titus to Dalmatia.",
        ESV: "10 For Demas, in love with this present world, has deserted me and gone to Thessalonica. Crescens has gone to Galatia, Titus to Dalmatia.",
        AMP: "10 for Demas, having loved [the pleasures of] this present world, has deserted me and gone to Thessalonica; Crescens has gone to Galatia, Titus to Dalmatia.",
        NLT: "10 Demas has deserted me because he loves the things of this life and has gone to Thessalonica. Crescens has gone to Galatia, and Titus has gone to Dalmatia."
    },
    "1 John 2:16": {
        KJV: "16 For all that is in the world, the lust of the flesh, and the lust of the eyes, and the pride of life, is not of the Father, but is of the world.",
        NKJV: "16 For all that is in the world—the lust of the flesh, the lust of the eyes, and the pride of life—is not of the Father but is of the world.",
        NIV: "16 For everything in the world—the lust of the flesh, the lust of the eyes, and the pride of life—comes not from the Father but from the world.",
        ESV: "16 For all that is in the world—the desires of the flesh and the desires of the eyes and pride of life—is not from the Father but is from the world.",
        AMP: "16 For all that is in the world—the lust and sensual craving of the flesh and the lust and longing of the eyes and the boastful pride of life [pretentious confidence in one’s resources or in the stability of earthly things]—these do not come from the Father, but are from the world.",
        NLT: "16 For the world offers only a craving for physical pleasure, a craving for everything we see, and pride in our achievements and possessions. These are not from the Father, but are from this world."
    },
    "Galatians 1:14": {
        KJV: "14 And profited in the Jews' religion above many my equals in mine own nation, being more exceedingly zealous of the traditions of my fathers.",
        NKJV: "14 And I advanced in Judaism beyond many of my contemporaries in my own nation, being more exceedingly zealous for the traditions of my fathers.",
        NIV: "14 I was advancing in Judaism beyond many of my own age among my people and was extremely zealous for the traditions of my fathers.",
        ESV: "14 And I was advancing in Judaism beyond many of my own age among my people, so extremely zealous was I for the traditions of my fathers.",
        AMP: "14 And I [was] advancing in Judaism beyond many of my contemporaries among my countrymen, being more extremely zealous for the traditions of my fathers.",
        NLT: "14 I was far ahead of my fellow Jews in my zeal for the traditions of my ancestors."
    },
   
};

// const quizQuestions = [
//     {
//         q: "Daniel and his friends refused the king’s food. Beyond obedience, what principle does this demonstrate about moral integrity in a corrupt environment?",
//         a: [
//             "Moral integrity requires conscious, personal decisions regardless of external pressure",
//             "It is enough to avoid sin occasionally when convenient",
//             "Integrity is determined by public recognition",
//             "Compromise is acceptable if it ensures personal comfort"
//         ],
//         correct: 0
//     },
//     {
//         q: "In Daniel 1:8, Daniel 'purposed in his heart.' What does this teach about the relationship between intention and action?",
//         a: [
//             "Internal resolve precedes and empowers outward obedience",
//             "Actions are irrelevant if intentions are good",
//             "Only public declarations matter, not internal purpose",
//             "Faith is passive; decisions happen automatically"
//         ],
//         correct: 0
//     },
//     {
//         q: "How does Daniel 1:17 illustrate the principle of divine partnership in human decision-making?",
//         a: [
//             "God equips and enhances the effectiveness of those who remain undefiled",
//             "God’s favor bypasses personal responsibility entirely",
//             "Divine help is only for physical survival, not wisdom",
//             "Human effort alone is sufficient without reliance on God"
//         ],
//         correct: 0
//     },
//     {
//         q: "Why might Daniel 1:6–7 be considered an example of navigating cultural assimilation without spiritual compromise?",
//         a: [
//             "They adopted necessary aspects of their environment while refusing to internalize ungodly values",
//             "They fully isolated themselves to maintain purity",
//             "They conformed outwardly but abandoned principles internally",
//             "They relied solely on persuasion to change the culture around them"
//         ],
//         correct: 0
//     },
//     {
//         q: "Daniel and his friends succeeded in part because they 'made an effort' (Daniel 1:9–14). What does this teach about human initiative in God’s plan?",
//         a: [
//             "Faithful action is required to access God’s provision and favor",
//             "God acts automatically regardless of human effort",
//             "Success is unrelated to moral decisions",
//             "Human effort is futile in the presence of divine will"
//         ],
//         correct: 0
//     },
//     {
//         q: "Considering Daniel 1:18–19, how does God’s favor manifest in leadership and societal recognition when one stands for righteousness?",
//         a: [
//             "God positions and distinguishes His faithful servants, even in worldly systems",
//             "God removes faithful people from positions of influence",
//             "Worldly systems always oppose righteousness without exception",
//             "Recognition is only a result of self-promotion"
//         ],
//         correct: 0
//     },
//     {
//         q: "From Daniel 1, what can we infer about the subtle ways environments can attempt to 'pollute' believers?",
//         a: [
//             "Cultural practices, peer pressure, and seemingly ordinary privileges can compromise faith",
//             "Only obviously sinful actions affect spiritual integrity",
//             "Faith is only threatened by legal restrictions, not everyday environments",
//             "Believers are naturally immune to environmental influence"
//         ],
//         correct: 0
//     },
//     {
//         q: "How can the lessons of Daniel 1 inform modern-day decision-making in professional or academic settings?",
//         a: [
//             "Maintaining integrity and refusing compromise can lead to favor and success without sacrificing principles",
//             "It is better to conform to peer pressure for faster progress",
//             "Success is unrelated to ethical choices",
//             "Avoiding challenges entirely ensures safety and favor"
//         ],
//         correct: 0
//     },
//     {
//         q: "What is the connection between 'personal resolution' (Daniel 1:8) and long-term spiritual and social impact?",
//         a: [
//             "Deliberate choices to honor God can produce influence, respect, and divine favor over time",
//             "Personal decisions have no effect beyond immediate circumstances",
//             "Social approval matters more than spiritual integrity",
//             "Long-term impact depends only on luck and timing"
//         ],
//         correct: 0
//     },
//     {
//         q: "If Daniel and his friends had compromised, what does the lesson suggest about the potential consequences?",
//         a: [
//             "Short-term convenience could have led to long-term spiritual loss and loss of God’s favor",
//             "Compromise has no lasting effect if intentions remain good",
//             "God would have automatically corrected their mistakes without consequence",
//             "They would still have gained favor through popularity alone"
//         ],
//         correct: 0
//     }
// ];
const quizQuestions = [
    {
        q: "According to 1 Corinthians 3:3–4, which behavior most clearly reveals carnality among believers?",
        a: [
            "Envy, strife, division, and preference",
            "Differences in spiritual gifts",
            "Active church participation",
            "Growth in material possessions"
        ],
        correct: 0
    },
    {
        q: "How does the lesson define worldliness?",
        a: [
            "Conducting one’s life according to the systems and principles of the derailed world order",
            "Living outside society completely",
            "Possessing material wealth",
            "Having cultural diversity"
        ],
        correct: 0
    },
    {
        q: "What illustration is used to explain carnality in the lesson?",
        a: [
            "A soldier acting like an ordinary civilian",
            "A farmer neglecting his crops",
            "A king abandoning his throne",
            "A child refusing discipline"
        ],
        correct: 0
    },
    {
        q: "Why did the believers in Corinth struggle in their relationships?",
        a: [
            "They failed to distinguish between conduct in God’s kingdom and the kingdom of men",
            "They lacked spiritual gifts",
            "They were persecuted by outsiders",
            "They misunderstood church leadership"
        ],
        correct: 0
    },
    {
        q: "Which attitude is expected in God’s kingdom instead of envy?",
        a: [
            "Esteeming others above oneself",
            "Competing for recognition",
            "Self-promotion",
            "Avoiding relationships"
        ],
        correct: 0
    },
    {
        q: "According to the lesson, what often causes great and potential men to live as ordinary men?",
        a: [
            "Lack of knowledge of their true identity",
            "Lack of natural talent",
            "Lack of social connections",
            "Lack of formal education"
        ],
        correct: 0
    },
    {
        q: "What happens when iniquity becomes the approved way of life in a society?",
        a: [
            "Love for God grows cold",
            "Faith becomes stronger",
            "Righteousness increases",
            "Spiritual maturity accelerates"
        ],
        correct: 0
    },
    {
        q: "Which factor directly reflects love for the godless system of the world?",
        a: [
            "Choosing the world over faithfulness to God",
            "Living peacefully with others",
            "Respecting authority",
            "Participating in cultural activities"
        ],
        correct: 0
    },
    {
        q: "According to 1 John 2:16 as used in the lesson, which of the following fuels carnality?",
        a: [
            "Lust of the flesh, lust of the eyes, and pride of life",
            "Hard work and diligence",
            "Community involvement",
            "Spiritual discipline"
        ],
        correct: 0
    },
    {
        q: "What warning does the conclusion of the lesson give concerning worldliness and carnality?",
        a: [
            "They are avenues that can lead to damnation and must be fled from",
            "They are unavoidable stages of spiritual growth",
            "They have no serious spiritual consequences",
            "They only affect unbelievers"
        ],
        correct: 0
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
        versions: { KJV: "", NKJV: "", NIV: "", ESV: "", AMP: "", NLT: "" },
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
    
    
// const [contentData, setContentData] = useState<ContentData>({
//     lessonDate: "September 4, 2016",
//     lessonTitle: "Worldliness and Carnality",

//     memoryVerse:
//         "No man that warreth entangleth himself with the affairs of this life; that he may please Him who hath chosen him to be a soldier.",
//     memoryVerseRef: "2 Timothy 2:4",

//     // Scriptures explicitly mentioned inside the Introduction area
//     introScriptures: ["2 Timothy 2:4", "John 14:6"],

//     // Main text of the lesson
//     lessonIntroScriptures: ["1 Corinthians 3:1-5"],

//     introduction:
//         "Every kingdom has its way of life and the kingdom of God is not an exception. In this light Jesus proclaimed to all especially to the kingdom’s citizens that He is that Way of life. Most of the citizens of God’s kingdom have failed to realize this fact and are living as citizens of this world. Worldliness means conducting one’s life according to the systems and the principles of the derailed World Order, while Carnality is the behavioral patterns of action like an ordinary person e.g. a Soldier acting like an ordinary civilian – 2 Tim. 2:4. A Nigerian will always have problems if he lives as one in another nation. Jesus implies that as citizens of the kingdom we can only prevail if we live like Him in God’s kingdom.",

//     aims:
//         "To cause Christ believers to live as citizens of God’s kingdom here on earth.",

//     objectives:
//         "To impact the earth, its occupants and one’s self with offer of God’s kingdom.",

//     lessonIntro:
//         "The believers of Christ in Corinth were having the problem of relating with one another. They didn’t understand the separate application of relationship between people in God’s kingdom and the kingdom of men. Consequently, they were living as ordinary men would in God’s kingdom. This is the picture of many citizens of God’s kingdom in our domain and is responsible for the many ungodly results. Let’s study this lesson that is meant to reposition us as children of God to meet with the image that’s expected of us.",


//     lessonPoints: [
//         {
//             title: "Signals of Worldliness and Carnality (Vs 3-4)",
//             content:
//                 "With the subject earlier defined, we can now see that many professed Christians are worldly in conduct unawares while others maintain worldliness for possession sake. Here are some of the signs that indicate that a person is worldly and carnal: Envy, Strife, Division and preference - Vs 3-4. These are the ways the worldly conducts themselves and obtain what they want. Therefore to do the same is tantamount to being like them. Other signs are of Cultural practices, obtainable mode of present day marriages, business practices and religion. Inability to separate one's self by Godly standards is a sign of worldliness and carnality. In God's kingdome",
//             scriptures: [
//                 "1 Corinthians 3:3-4",
//                 "Galatians 1:13-14",
//                 "Colossians 2:8",
//                 "Colossians 2:20 (NIV)",
//                 "Matthew 24:38",
//             ],
//             subPoints: [],
//         },
//         {
//             title: "Practice in God’s Kingdom",
//             content:
//                 "In God’s kingdom the practice is to esteem the other above yourself as against envy, allowing another person first as against strife, and seeing all as one instead of preference and division.",
//             scriptures: [
//                 "Philippians 2:3",
//                 "1 Corinthians 14:29-33",
//                 "1 Corinthians 3:8",
//                 "1 Corinthians 12:13",
//             ],
//             subPoints: [],
//         },
//         {
//             title: "What Makes a Person Live as Worldly and Carnal",
//             content:
//                 "Great and potential men do live as ordinary and worthless men because of the following factors:\n\n(a) Lack of knowledge of one’s true identity.\n(b) When iniquity becomes the approved and leading way of life.\n(c) When love for God grows cold.\n(d) When one feels obligated to godless tradition.\n(e) When one is in love with the godless system of the world.\n(f) When one has the lunch to satisfy the cravings of the flesh which is tailored by the evil nature of Satan imbibed at the fall of man.\n(g) When the lust of the eyes becomes predominant in one’s heart.\n(h) When one is controlled by the hunch of self exaltation because of what he has and does.",
//             scriptures: [
//                 "Hosea 4:6",
//                 "Matthew 24:12",
//                 "Galatians 1:14",
//                 "2 Timothy 4:10",
//                 "1 John 2:16",
//             ],
//             subPoints: [
//                 {
//                     title: "Lack of knowledge of one’s true identity",
//                     content: "Lack of knowledge of one’s true identity.",
//                     scripture: "Hosea 4:6", // Changed from scriptures: [...] to scripture: "..."
//                 },
//                 {
//                     title: "Iniquity becomes approved",
//                     content:
//                         "When iniquity becomes the approved and leading way of life.",
//                     scripture: "Matthew 24:12", // Changed from scriptures: [...] to scripture: "..."
//                 },
//                 {
//                     title: "Love for God grows cold",
//                     content: "When love for God grows cold.",
//                     scripture: "Matthew 24:12", // Changed from scriptures: [...] to scripture: "..."
//                 },
//                 {
//                     title: "Obligated to godless tradition",
//                     content:
//                         "When one feels obligated to godless tradition.",
//                     scripture: "Galatians 1:14", // Changed from scriptures: [...] to scripture: "..."
//                 },
//                 {
//                     title: "Love for the world system",
//                     content:
//                         "When one is in love with the godless system of the world.",
//                     scripture: "2 Timothy 4:10", // Changed from scriptures: [...] to scripture: "..."
//                 },
//                 {
//                     title: "Cravings of the flesh",
//                     content:
//                         "When one has the lunch to satisfy the cravings of the flesh which is tailored by the evil nature of Satan imbibed at the fall of man.",
//                     scripture: "1 John 2:16", // Changed from scriptures: [...] to scripture: "..."
//                 },
//                 {
//                     title: "Lust of the eyes",
//                     content:
//                         "When the lust of the eyes becomes predominant in one’s heart.",
//                     scripture: "1 John 2:16", // Changed from scriptures: [...] to scripture: "..."
//                 },
//                 {
//                     title: "Pride / self exaltation",
//                     content:
//                         "When one is controlled by the hunch of self exaltation because of what he has and does.",
//                     scripture: "1 John 2:16", // Changed from scriptures: [...] to scripture: "..."
//                 },
//             ],
//         },
//     ],

//     conclusion:
//         "Only those citizens who abide by the principles of the kingdom of God will enjoy the benefits thereof but others will face the wrath of the government of the kingdom. Worldliness and carnality are enough avenues for damnation therefore flee from it.",

//     conclusionScriptures: [],

//     prayerPoints: [
//         "Father, help me not to entangle myself with the affairs of this life.",
//         "Lord, help me to live by the principles of Your kingdom and not the derailed world order.",
//         "Holy Spirit, deliver me from envy, strife, division, and preference.",
//         "Father, help me to esteem others above myself and to walk in unity.",
//         "Lord, keep my heart from the lust of the flesh, lust of the eyes, and the pride of life.",
//         "Father, help me to flee from worldliness and carnality.",
//     ],
// });

const [contentData, setContentData] = useState<ContentData>({
    lessonDate: "February 1, 2026",
    lessonTitle: "Worldliness and Carnality",

    memoryVerse:
        "No man that warreth entangleth himself with the affairs of this life; that he may please Him who hath chosen him to be a soldier. 2 Tim. 2:4",
    memoryVerseRef: "2 Tim. 2:4",

    introScriptures: ["2 Tim. 2:4", "Jn 14:6"],
    lessonIntroScriptures: ["1 CORINTHIANS 3:1-5"],

    introduction:
        "Every kingdom has its way of life and the kingdom of God is not an exception. In this light Jesus proclaimed to all especially to the kingdom's citizens that He is that Way of life. Most of the citizens of God's kingdom have failed to realize this fact and are living as citizens of this world. Worldliness means conducting One's life according to the systems and the principles of the derailed World Order, while Carnality is the behavioral patterns of action like an ordinary person e.g. a Soldier acting like an ordinary civilian - 2 Tim. 2:4. A Nigerian will always have problems if he lives as one in another nation. Jesus implies that as citizens of the kingdom we can only prevail if we live like Him in God's kingdom.\nJn 14:6",

    aims:
        "To cause Christ believers to live as citizens of God's kingdom here on earth.",

    objectives:
        "To impact the earth, its occupants and one's self with offer of God's kingdom.",

    lessonIntro:
        "The believers of Christ in Corinth were having the problem of relating with one another. They didn't understand the separate application of relationship between people in God's kingdom and the kingdom of men. Consequently, they were living as ordinary men would in God's kingdom. This is the picture of many citizens of God's kingdom in our domain and is responsible for the many ungodly results. Let's study this lesson that is meant to reposition us as children of God to meet with the image that's expected of us.",

    lessonPoints: [
        {
            title: "SIGNALS OF WORLDLINESS AND CARNALITY:",
            content:
                "With the subject earlier defined, we can now see that many professed Christians are worldly in conduct unawares while others maintain worldliness for possession sake. Here are some of the signs that indicate that a person is worldly and carnal. Envy, Strife, Division and preference - Vs 3-4. These are the ways the worldly conducts themselves and obtain what they want. Therefore to do the same is tantamount to being like them. Other signs are of Cultural practices, obtainable mode of present day marriages, business practices and religion. Inability to separate one's self by Godly standards is a sign of worldliness and carnality. Galatians 1:13-14; Col. 2:8, 20 (NIV); Matt. 24:38.\n\nIn God's kingdom the practice is to esteem the other above yourself as against envy (Phil. 2:3), Allowing another person first as against strife (I Cor. 14:29-33) and seeing all as one instead of preference and division (I Cor. 3:8; 12:13).",
            scriptures: [
                "1 Corinthians 3:3-4",
                "Galatians 1:13-14",
                "Colossians 2:8",
                "Colossians 2:20",
                "Matthew 24:38",
                "Philippians 2:3",
                "1 Corinthians 14:29-33",
                "1 Corinthians 3:8",
                "1 Corinthians 12:13",
            ],
            subPoints: [],
        },
        {
            title: "WHAT MAKES A PERSON LIVE AS WORLDLY AND CARNAL:",
            content: `Great and potential men do live as ordinary and worthless men because of the following factors:

                (a) Lack of knowledge of one's true identity
                Hos. 4:6

                (b) When iniquity becomes the approved and leading way of life
                Matt. 24:12

                (c) When love for God grows cold
                Matt. 24:12

                (d) When one feels obligated to godless tradition
                Gal. 1:14

                (e) When one is in love with the godless system of the world
                2 Tim. 4:10

                (f) When one has the lunch to satisfy the cravings of the flesh which is tailored by the evil nature of Satan imbibed at the fall of man
                1 Jn. 2:16

                (g) When the lust of the eyes becomes predominant in one's heart
                1 Jn. 2:16

                (h) When one is controlled by the hunch of self exaltation because of what he has and does
                1 Jn. 2:16`,




        scriptures: [
                "Hosea 4:6",
                "Matthew 24:12",
                "Galatians 1:14",
                "2 Timothy 4:10",
                "1 John 2:16",
            ],
            subPoints: [],
        },
    ],

    conclusion:
        "Only those citizens who abide by the principles of the kingdom of God will enjoy the benefits thereof but others will face the wrath of the government of the kingdom. Worldliness and carnality are enough avenues for damnation therefore flee from it.",

    conclusionScriptures: [],

    // Not provided on the scanned pages you shared
    prayerPoints: [
        "Father, help me not to entangle myself with the affairs of this life, but to live to please You who has chosen me as a soldier.",
        "Lord, deliver me from every form of worldliness and carnality in my thoughts, actions, and decisions.",
        "Father, help me to live as a true citizen of Your kingdom and not as a citizen of this world.",
        "Holy Spirit, open my eyes to understand my true identity in Christ and keep me from living as an ordinary man.",
        "Lord, uproot envy, strife, division, and preference from my heart and help me to walk in love and unity.",
        "Father, help me to esteem others above myself and to allow peace to reign in my relationships.",
        "Lord, give me grace to separate myself from ungodly cultural practices, traditions, and systems that oppose Your will.",
        "Father, keep my heart from loving the godless system of this world and help me to remain faithful to You.",
        "Lord, quench every lust of the flesh, lust of the eyes, and pride of life working against my spiritual growth.",
        "Holy Spirit, keep my love for God alive and prevent it from growing cold in these last days.",
        "Father, help me to flee from every form of carnality that can lead to destruction and damnation.",
        "Lord, empower me to live by the principles of Your kingdom so that I may enjoy its benefits.",
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
                            Worldliness and Carnality
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
                                        Text: 1 Corinthians 3:1-5
                                    </h3>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() =>
                                                showBibleVersions(
                                                    "1 Corinthians 3:1-5"
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                        >
                                        <BookOpen size={16} />
                                            Read 1 Corinthians 3:1-5
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
                                            <button
                                            onClick={() =>
                                                showBibleVersions(
                                                    "John 14:6"
                                                )
                                            }
                                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-lg transition flex items-center gap-2 text-sm"
                                        >
                                            <BookOpen size={16} />
                                                John 14:6
                                            </button>
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
                                        Self-Assessment: Worldliness vs Kingdom Conduct
                                    </h4>

                                    <p className="mb-4">
                                        On a scale of 1 to 10, how consistently do you live by the
                                        principles of God’s kingdom—avoiding envy, strife, division, and
                                        preference—and choosing unity and humility (1 Cor. 3:3–4; Phil. 2:3)?
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
                                            ? "Excellent! You are growing in kingdom-minded living—humility, unity, and peace."
                                            : faithRating >= 5
                                            ? "Good progress. Identify specific areas where envy, strife, or preference still shows up."
                                            : "This is a call to re-evaluate your attitudes and relationships and align with God’s kingdom principles."}
                                    </p>
                                </div>

                                {/* Personal Decisions */}
                                <div
                                    className={`${
                                        darkMode ? "bg-gray-700" : "bg-white border border-gray-200"
                                    } p-6 rounded-lg`}
                                >
                                    <h4 className="text-xl font-semibold mb-4">
                                        Personal Decisions: Reject Worldliness and Carnality
                                    </h4>

                                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={commitmentInput}
                                            onChange={(e) => setCommitmentInput(e.target.value)}
                                            placeholder="Write a personal decision (e.g., reject envy, stop strife, avoid favoritism, practice unity, honor others)..."
                                            className={`flex-1 px-4 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                            onKeyPress={(e) => e.key === "Enter" && addCommitment()}
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
                                                <CheckCircle className="text-green-600 mt-1" size={20} />
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
                                        Worldliness and carnality often show up through envy, strife,
                                        division, and preference (1 Cor. 3:3–4). Use this section to record
                                        clear, practical decisions that help you live as a true citizen of
                                        God’s kingdom and please the One who chose you (2 Tim. 2:4).
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
