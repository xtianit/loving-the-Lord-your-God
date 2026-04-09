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
  "Matthew 5:48": {
    "KJV": "Be ye therefore perfect, even as your Father which is in heaven is perfect.",
    "NKJV": "Therefore you shall be perfect, just as your Father in heaven is perfect.",
    "NIV": "Be perfect, therefore, as your heavenly Father is perfect.",
    "ESV": "You therefore must be perfect, as your heavenly Father is perfect.",
    "AMP": "You, therefore, must be perfect [growing into complete maturity of godliness in mind and character, having reached the proper height of virtue and integrity], as your heavenly Father is perfect.",
    "NLT": "But you are to be perfect, even as your Father in heaven is perfect.",
    "MSG": "In a word, what I’m saying is, Grow up. You’re kingdom subjects. Now live like it! Live out your God-created identity. Live generously and graciously toward others, the way God lives toward you."
  },

  "Acts 4:13-14": {
    "KJV": "13 Now when they saw the boldness of Peter and John, and perceived that they were unlearned and ignorant men, they marvelled; and they took knowledge of them, that they had been with Jesus. 14 And beholding the man which was healed standing with them, they could say nothing against it.",
    "NKJV": "13 Now when they saw the boldness of Peter and John, and perceived that they were uneducated and untrained men, they marveled. And they realized that they had been with Jesus. 14 And seeing the man who had been healed standing with them, they could say nothing against it.",
    "NIV": "13 When they saw the courage of Peter and John and realized that they were unschooled, ordinary men, they were astonished and they took note that these men had been with Jesus. 14 But since they could see the man who had been healed standing there with them, there was nothing they could say.",
    "ESV": "13 Now when they saw the boldness of Peter and John, and perceived that they were uneducated, common men, they were astonished. And they recognized that they had been with Jesus. 14 But seeing the man who was healed standing beside them, they had nothing to say in opposition.",
    "AMP": "13 Now when the men of the Sanhedrin saw the confidence and boldness of Peter and John, and grasped the fact that they were uneducated and untrained [ordinary] men, they were astounded, and began to recognize that they had been with Jesus. 14 And seeing the man who had been healed standing there with them, they had nothing to say in reply.",
    "NLT": "13 The members of the council were amazed when they saw the boldness of Peter and John, for they could see that they were ordinary men with no special training in the Scriptures. They also recognized them as men who had been with Jesus. 14 But since they could see the man who had been healed standing right there among them, there was nothing the council could say.",
    "MSG": "13-14 They couldn't take their eyes off them—Peter and John standing there so confident, so sure of themselves! Their fascination deepened when they realized these two were laymen with no training in Scripture or formal education. They recognized them as companions of Jesus, but with the man right before them, seeing him standing there so upright—so healed!—what could they say against that?"
  },
  "Titus 2:12": {
    "KJV": "Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world;",
    "NKJV": "teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly in the present age,",
    "NIV": "It teaches us to say “No” to ungodliness and worldly passions, and to live self-controlled, upright and godly lives in this present age,",
    "ESV": "training us to renounce ungodliness and worldly passions, and to live self-controlled, upright, and godly lives in the present age,",
    "AMP": "it teaches us to reject ungodliness and worldly (immoral) desires, and to live sensible, upright, and godly lives [with a vortex of peace that centers on His Word and His power] in this present age,",
    "NLT": "And we are instructed to turn from godless living and sinful pleasures. We should live in this evil world with wisdom, righteousness, and devotion to God,",
    "MSG": "We’re being disciplined to say no to godless junk and to self-indulgent passions, and to say yes to a God-filled, God-honoring life in our day-to-day lives, right in the middle of the dark world of sin."
  },
  "Mark 3:14": {
    "KJV": "And he ordained twelve, that they should be with him, and that he might send them forth to preach,",
    "NKJV": "Then He appointed twelve, that they might be with Him and that He might send them out to preach,",
    "NIV": "He appointed twelve that they might be with him and that he might send them out to preach",
    "ESV": "And he appointed twelve (whom he also named apostles) so that they might be with him and he might send them out to preach",
    "AMP": "And He appointed twelve [distinct companions], whom He also named apostles, so that they would be with Him [for instruction] and so that He could send them out to preach [the good news of salvation],",
    "NLT": "Then he appointed twelve of them and called them his apostles. They were to accompany him, and he would send them out to preach,",
    "MSG": "He settled on twelve, and designated them apostles. The plan was that they would be with him, and he would send them out to proclaim the Word"
  },
  
  "Matthew 7:13-14": {
    "KJV": "13 Enter ye in at the strait gate: for wide is the gate, and broad is the way, that leadeth to destruction, and many there be which go in thereat: 14 Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it.",
    "NKJV": "13 “Enter by the narrow gate; for wide is the gate and broad is the way that leads to destruction, and there are many who go in by it. 14 Because narrow is the gate and difficult is the way which leads to life, and there are few who find it.",
    "NIV": "13 “Enter through the narrow gate. For wide is the gate and broad is the road that leads to destruction, and many enter through it. 14 But small is the gate and narrow the road that leads to life, and only a few find it.",
    "ESV": "13 “Enter by the narrow gate. For the gate is wide and the way is easy that leads to destruction, and those who enter by it are many. 14 For the gate is narrow and the way is hard that leads to life, and those who find it are few.",
    "AMP": "13 “Enter through the narrow gate. For wide is the gate and broad and easy to travel is the path that leads the way to destruction and eternal loss, and there are many who enter through it. 14 But small is the gate and narrow and difficult to travel is the path that leads the way to [everlasting] life, and there are few who find it.",
    "NLT": "13 “You can enter God’s Kingdom only through the narrow gate. The highway to hell is broad, and its gate is wide for the many who choose that way. 14 But the gateway to life is very narrow and the road is difficult, and only a few ever find it.",
    "MSG": "13-14 “Don’t look for shortcuts to God. The market is flooded with surefire, easygoing formulas for a successful life that can be practiced in your spare time. Don’t fall for that stuff, even though crowds of people do. The way to life—to God!—is vigorous and requires total attention."
  },
  "Matthew 3:17": {
    "KJV": "And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.",
    "NKJV": "And suddenly a voice came from heaven, saying, “This is My beloved Son, in whom I am well pleased.”",
    "NIV": "And a voice from heaven said, “This is my Son, whom I love; with him I am well pleased.”",
    "ESV": "and behold, a voice from heaven said, “This is my beloved Son, with whom I am well pleased.”",
    "AMP": "And behold, a voice from heaven said, “This is My beloved Son, in whom I am well-pleased and delighted.”",
    "NLT": "And a voice from heaven said, “This is my dearly loved Son, who brings me great joy.”",
    "MSG": "And then a voice from heaven said, “This is my Son, chosen and marked by my love, delight of my life.”"
  },

  "Matthew 17:5": {
    "KJV": "While he yet spake, behold, a bright cloud overshadowed them: and behold a voice out of the cloud, which said, This is my beloved Son, in whom I am well pleased; hear ye him.",
    "NKJV": "While he was still speaking, behold, a bright cloud overshadowed them; and suddenly a voice came out of the cloud, saying, “This is My beloved Son, in whom I am well pleased. Hear Him!”",
    "NIV": "While he was still speaking, a bright cloud covered them, and a voice from the cloud said, “This is my Son, whom I love; with him I am well pleased. Listen to him!”",
    "ESV": "He was still speaking when, behold, a bright cloud overshadowed them, and a voice from the cloud said, “This is my beloved Son, with whom I am well pleased; listen to him.”",
    "AMP": "While he was still speaking, behold, a bright cloud overshadowed them, and a voice out of the cloud said, “This is My beloved Son, with whom I am well-pleased and delighted! Listen to Him!”",
    "NLT": "But even as he spoke, a bright cloud overshadowed them, and a voice from the cloud said, “This is my dearly loved Son, who brings me great joy. Listen to him.”",
    "MSG": "While he was goes on like this, optimistic and mistake-prone, a radiant cloud hovered over them, and from the cloud a voice: “This is my Son, marked by my love, focus of my delight. Listen to him.”"
  },
"John 3:36": {
    "KJV": "He that believeth on the Son hath everlasting life: and he that believeth not the Son shall not see life; but the wrath of God abideth on him.",
    "NKJV": "He who believes in the Son has everlasting life; and he who does not believe the Son shall not see life, but the wrath of God abides on him.",
    "NIV": "Whoever believes in the Son has eternal life, but whoever rejects the Son will not see life, for God’s wrath remains on them.",
    "ESV": "Whoever believes in the Son has eternal life; whoever does not obey the Son shall not see life, but the wrath of God remains on him.",
    "AMP": "He who believes and trusts in the Son and accepts Him [as Savior] has eternal life [that is, already possesses it]; but he who does not believe the Son and chooses to separate himself (disobey, unbelieve) [from Him] will not see life [joyful, blessed life], but the wrath of God remains on him.",
    "NLT": "And anyone who believes in God’s Son has eternal life. Anyone who doesn’t obey the Son will never have eternal life, but the vertical judgment of God remains upon them.",
    "MSG": "Whoever accepts and trusts the Son gets in on everything`, life complete and forever! And that is also why the person who avoids the Son and refuses to trust him doesn’t experience anything of life. Instead of experiencing life, he can’t get out from under the darkness and the anger of God."
  },
  "Colossians 1:18-19": {
    "KJV": "18 And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence. 19 For it pleased the Father that in him should all fulness dwell;",
    "NKJV": "18 And He is the head of the body, the church, who is the beginning, the firstborn from the dead, that in all things He may have the preeminence. 19 For it pleased the Father that in Him all the fullness should dwell,",
    "NIV": "18 And he is the head of the body, the church; he is the beginning and the firstborn from among the dead, so that in everything he might have the supremacy. 19 For God was pleased to have all his fullness dwell in him,",
    "ESV": "18 And he is the head of the body, the church. He is the beginning, the firstborn from the dead, that in everything he might be preeminent. 19 For in him all the fullness of God was pleased to dwell,",
    "AMP": "18 He is also the head [the life-source and leader] of the body, the church; and He is the beginning, the firstborn from the dead, so that He Himself will come to have first place in everything. 19 For it was the Father’s good pleasure for all the fullness to dwell in Him,",
    "NLT": "18 He is the head of the body, the church; he is the beginning and the firstborn from among the dead, so that in everything he might have supremacy. 19 For God was pleased to have all his fullness dwell in him,",
    "MSG": "18-19 He is the head of the church, which is his body. He is the beginning, supreme over all who rise from the dead. So he is first in everything. For God in all his fullness was pleased to live in Christ,"  
  },
  "Hebrews 2:10": {
    "KJV": "For it became him, for whom are all things, and by whom are all things, in bringing many sons unto glory, to make the captain of their salvation perfect through sufferings.",
    "NKJV": "For it was fitting for Him, for whom are all things and by whom are all things, in bringing many sons to glory, to make the captain of their salvation perfect through sufferings.",
    "NIV": "In bringing many sons and daughters to glory, it was fitting that God, for whom and through whom everything exists, should make the pioneer of their salvation perfect through what he suffered.",
    "ESV": "For it was fitting that he, for whom and by whom all things exist, in bringing many sons to glory, should make the founder of their salvation perfect through suffering.",
    "AMP": "For it was fitting for God [that is, an act worthy of His divine nature] that He, for whom are all things, and through whom are all things, in bringing many sons to glory, should make the author and founder of their salvation perfect through suffering [bringing Him to the full maturity of His human experience].",
    "NLT": "God, for whom and through whom everything was made, chose to bring many children into his glory. And it was only right that he should make Jesus, through his suffering, a perfect leader, fit to bring them into their salvation.",
    "MSG": "It makes good sense that God, who got everything started and keeps everything going, now involving himself in creating a line of sons, should make Jesus, a perfect leader through the experience of suffering."
  },
  "Matthew 10:25": {
    "KJV": "It is enough for the disciple that he be as his master, and the servant as his lord. If they have called the master of the house Beelzebub, how much more shall they call them of his household?",
    "NKJV": "It is enough for a disciple that he be like his teacher, and a servant like his master. If they have called the master of the house Beelzebub, how much more will they call those of his household!",
    "NIV": "It is enough for students to be like their teachers, and servants like their masters. If the head of the house has been called Beelzebub, how much more the members of his household!",
    "ESV": "It is enough for the disciple to be like his teacher, and the servant like his master. If they have called the master of the house Beelzebub, how much more will they malign those of his household.",
    "AMP": "It is enough for the disciple to be like his teacher, and the servant like his master. If they have called the head of the house Beelzebul (the prince of demons), how much more [will they malign] the members of his household!",
    "NLT": "Students are to be like their teacher, and slaves are to be like their master. And since I, the master of the household, have been called the prince of demons, the members of my household will be called by even worse names!",
    "MSG": "A student doesn’t get a better desk than her teacher. A laborer doesn’t make more money than his boss. Be content—pleased, even—when you, my students, are treated the same way I’m treated. If they call me, the Master of the House, ‘Satan’s Right-Hand Man,’ what do you think they’re going to call you?"
  },
  "Matthew 5:16": {
    "KJV": "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.",
    "NKJV": "Let your light so shine before men, that they may see your good works and glorify your Father in heaven.",
    "NIV": "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
    "ESV": "In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven.",
    "AMP": "Let your light shine before men in such a way that they may see your good works, and glorify your Father who is in heaven.",
    "NLT": "In the same way, let your good deeds shine out for all to see, so that everyone will praise your heavenly Father.",
    "MSG": "Now that I’ve put you there on a hilltop, on a light stand—shine! Keep open house; be generous with your lives. By opening up to others, you’ll prompt people to open up with God, this generous Father in heaven."
  },
  "John 12:32": {
    "KJV": "And I, if I be lifted up from the earth, will draw all men unto me.",
    "NKJV": "And I, if I am lifted up from the earth, will draw all peoples to Myself.”",
    "NIV": "And I, when I am lifted up from the earth, will draw all people to myself.”",
    "ESV": "And I, when I am lifted up from the earth, will draw all people to myself.”",
    "AMP": "And I, if and when I am lifted up from the earth [on the cross], will draw all people to Myself [gentiles, as well as Jews].”",
    "NLT": "And when I am lifted up from the earth, I will draw everyone to myself.”",
    "MSG": "And I, as I am lifted up from the earth, will attract everyone to me and gather them around me.”"
  },
  "Acts 4:13": {
    "KJV": "Now when they saw the boldness of Peter and John, and perceived that they were unlearned and ignorant men, they marvelled; and they took knowledge of them, that they had been with Jesus.",
    "NKJV": "Now when they saw the boldness of Peter and John, and perceived that they were uneducated and untrained men, they marveled. And they realized that they had been with Jesus.",
    "NIV": "When they saw the courage of Peter and John and realized that they were unschooled, ordinary men, they were astonished and they took note that these men had been with Jesus.",
    "ESV": "Now when they saw the boldness of Peter and John, and perceived that they were uneducated, common men, they were astonished. And they recognized that they had been with Jesus.",
    "AMP": "Now when the men of the Sanhedrin saw the confidence and boldness of Peter and John, and grasped the fact that they were uneducated and untrained [ordinary] men, they were astounded, and began to recognize that they had been with Jesus.",
    "NLT": "The members of the council were amazed when they saw the boldness of Peter and John, for they could see that they were ordinary men with no special training in the Scriptures. They also recognized them as men who had been with Jesus.",
    "MSG": "They couldn't take their eyes off them—Peter and John standing there so confident, so sure of themselves! Their fascination deepened when they realized these two were laymen with no training in Scripture or formal education. They recognized them as companions of Jesus."
  },
  "John 14:3": {
    "KJV": "And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.",
    "NKJV": "And if I go and prepare a place for you, I will come again and receive you to Myself; that where I am, there you may be also.",
    "NIV": "And if I go and prepare a place for you, I will come back and take you to be with me that you also may be where I am.",
    "ESV": "And if I go and prepare a place for you, I will come again and will take you to myself, that where I am you may be also.",
    "AMP": "And if I go and prepare a place for you, I will come back again and I will take you to Myself, so that where I am you may be also.",
    "NLT": "When everything is ready, I will come and get you, so that you will always be with me where I am.",
    "MSG": "And if I’m going on to prepare a place for you, I’ll surely come back and get you so that where I am, you’ll be, too."
  },
  "John 14:23": {
    "KJV": "Jesus answered and said unto him, If a man love me, he will keep my words: and my Father will love him, and we will come unto him, and make our abode with him.",
    "NKJV": "Jesus answered and said to him, “If anyone loves Me, he will keep My word; and My Father will love him, and We will come to him and make Our home with him.",
    "NIV": "Jesus replied, “Anyone who loves me will obey my teaching. My Father will love them, and we will come to them and make our home with them.",
    "ESV": "Jesus answered him, “If anyone loves me, he will keep my word, and my Father will love him, and we will come to him and make our home with him.",
    "AMP": "Jesus answered, “If anyone [really] loves Me, he will keep My word (teaching); and My Father will love him, and We will come to him and make Our abode (home) with him.",
    "NLT": "Jesus replied, “All who love me will do what I say. My Father will love them, and we will come and make our home with each of them.",
    "MSG": "Jesus said, “Because I love you, I will do what I say. My Father will love you, and we will come to you and live with you."
  },
  "Matthew 10:22": {
    "KJV": "And ye shall be hated of all men for my name's sake: but he that endureth to the end shall be saved.",
    "NKJV": "And you will be hated by all for My name’s sake. But he who endures to the end will be saved.",
    "NIV": "You will be hated by everyone because of me, but the one who stands firm to the end will be saved.",
    "ESV": "and you will be hated by all for my name's sake. But the one who endures to the end will be saved.",
    "AMP": "And you will be hated by everyone because of [your association with] My name, but it is the one who has patiently persevered and endured to the end who will be saved.",
    "NLT": "And all nations will hate you because you are my followers. But everyone who endures to the end will be saved.",
    "MSG": "There’s no getting around it: You’re in for a hard time of it. But there’s no reason to quit. Hang in there to the end. That’s what counts."
  },

  "John 15:20": {
    "KJV": "Remember the word that I said unto you, The servant is not greater than his lord. If they have persecuted me, they will also persecute you; if they have kept my saying, they will keep yours also.",
    "NKJV": "Remember the word that I said to you, ‘A servant is not greater than his master.’ If they persecuted Me, they will also persecute you. If they kept My word, they will keep yours also.",
    "NIV": "Remember what I told you: ‘A servant is not greater than his master.’ If they persecuted me, they will persecute you also. If they obeyed my teaching, they will obey yours also.",
    "ESV": "Remember the word that I said to you, ‘A servant is not greater than his master.’ If they persecuted me, they will also persecute you. If they kept my word, they will also keep yours.",
    "AMP": "Remember [and continue to meditate on] the word that I said to you, ‘A servant is not greater than his master.’ If they persecuted Me, they will also persecute you; if they kept My word, they will keep yours also.",
    "NLT": "Do you remember what I told you? ‘A slave is not greater than the master.’ Since they persecuted me, naturally they will persecute you. And if they had listened to me, they would listen to you.",
    "MSG": "Remember what I told you: ‘A servant is not greater than the master.’ If they threw rocks at me, they’ll throw rocks at you; if they listened to me, they’ll listen to you."
  },

  "John 14:12": {
    "KJV": "Verily, verily, I say unto you, He that believeth on me, the works that I do shall he do also; and greater works than these shall he do; because I go unto my Father.",
    "NKJV": "“Most assuredly, I say to you, he who believes in Me, the works that I do he will do also; and greater works than these he will do, because I go to My Father.",
    "NIV": "Very truly I tell you, whoever believes in me will do the works I have been doing, and they will do even greater things than these, because I am going to the Father.",
    "ESV": "“Truly, truly, I say to you, whoever believes in me will also do the works that I do; and greater works than these will he do, because I am going to the Father.",
    "AMP": "I assure you and most solemnly say to you, anyone who believes in Me [as Savior] will also do the things that I do; and he will do even greater things than these [in extent and outreach], because I am going to the Father.",
    "NLT": "“I tell you the truth, anyone who believes in me will do the same works I have done, and even greater works, because I am going to be with the Father.",
    "MSG": "The person who trusts me will not only do what I’m doing but even greater things, because I, on my way to the Father, am giving you the same work to do that I’ve been doing."
  },

  "Matthew 7:21": {
    "KJV": "Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of my Father which is in heaven.",
    "NKJV": "“Not everyone who says to Me, ‘Lord, Lord,’ shall enter the kingdom of heaven, but he who does the will of My Father in heaven.",
    "NIV": "“Not everyone who says to me, ‘Lord, Lord,’ will enter the kingdom of heaven, but only the one who does the will of my Father who is in heaven.",
    "ESV": "“Not everyone who says to me, ‘Lord, Lord,’ will enter the kingdom of heaven, but the one who does the will of my Father who is in heaven.",
    "AMP": "“Not everyone who says to Me, ‘Lord, Lord,’ will enter the kingdom of heaven, but only he who does the will of My Father who is in heaven.",
    "NLT": "“Not everyone who calls out to me, ‘Lord! Lord!’ will enter the Kingdom of Heaven. Only those who actually do the will of my Father in heaven will enter.",
    "MSG": "“Knowing the correct password—saying ‘Master, Master,’ for instance—isn’t going to get you anywhere with me. What is required is serious obedience—doing what my Father wills."
  },

  "John 3:16": {
    "KJV": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    "NKJV": "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    "NIV": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "ESV": "“For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    "AMP": "“For God so [greatly] loved and dearly prized the world, that He [even] gave His [One and] only begotten Son, so that whoever believes and trusts in Him [as Savior] shall not perish, but have eternal life.",
    "NLT": "“For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.",
    "MSG": "“This is how much God loved the world: He gave his Son, his one and only Son. And this is why: so that no one need be destroyed; by believing in him, anyone can have a whole and lasting life."
  },
    "Matthew 7:22-23": {
        "KJV": "Many will say to me in that day, Lord, Lord, have we not prophesied in thy name? and in thy name have cast out devils? and in thy name done many wonderful works? And then will I profess unto them, I never knew you: depart from me, ye that work iniquity.",
        "NKJV": "Many will say to Me in that day, ‘Lord, Lord, have we not prophesied in Your name, cast out demons in Your name, and done many wonders in Your name?’ And then I will declare to them, ‘I never knew you; depart from Me, you who practice lawlessness!’",
        "NIV": "Many will say to me on that day, ‘Lord, Lord, did we not prophesy in your name and in your name drive out demons and in your name perform many miracles?’ Then I will tell them plainly, ‘I never knew you. Away from me, you evildoers!’",
        "ESV": "On that day many will say to me, ‘Lord, Lord, did we not prophesy in your name, and cast out demons in your name, and do many mighty works in your name?’ And then will I declare to them, ‘I never knew you; depart from me, you workers of lawlessness.’",
        "AMP": "Many will say to Me on that day [when I judge them], ‘Lord, Lord, did we not prophesy in Your name, and in Your name cast out demons, and in Your name do many miracles?’ And then I will declare to them publicly, ‘I never knew you; depart from Me [you are banished from My presence], you who act wickedly [disregarding My commands].’",
        "NLT": "On judgment day many will say to me, ‘Lord! Lord! We prophesied in your name and cast out demons in your name and performed many miracles in your name.’ But I will reply, ‘I never knew you. Get away from me, you who break God’s laws.’",
        "MSG": "I can hear it now—that day of judgment—with many stepping up and saying, ‘Master, Master, we preached the Message, we smashed the demons, our super-spiritual projects had everyone talking.’ And do you know what I am going to say? ‘You missed the boat. All you did was use me to make yourselves important. You don’t impress me one bit. You’re out of here.’"
    },
        "John 14:6": {
    "KJV": "6 Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
    "NKJV": "6 Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father except through Me.",
    "NIV": "6 Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.",
    "ESV": "6 Jesus said to him, “I am the way, and the truth, and the life. No one comes to the Father except through me.",
    "AMP": "6 Jesus said to him, “I am the [only] Way [to God] and the [real] Truth and the [real] Life; no one comes to the Father but through Me.",
    "NLT": "6 Jesus told him, “I am the way, the truth, and the life. No one can come to the Father except through me.",
    "MSG": "6 Jesus said, “I am the Road, also the Truth, also the Life. No one gets to the Father apart from me."
  },

  "Daniel 11:32": {
    "KJV": "32 And such as do wickedly against the covenant shall he corrupt by flatteries: but the people that do know their God shall be strong, and do exploits.",
    "NKJV": "32 Those who do wickedly against the covenant he shall corrupt with flattery; but the people who know their God shall be strong, and carry out great exploits.",
    "NIV": "32 With flattery he will corrupt those who have violated the covenant, but the people who know their God will firmly resist him.",
    "ESV": "32 He shall seduce with flattery those who violate the covenant, but the people who know their God shall stand firm and take action.",
    "AMP": "32 With smooth words [of flattery and promises] he will corrupt and seduce those who [abandon the precept of the law and] violate the covenant, but the people who know their God will be strong and take action.",
    "NLT": "32 He will flatter and win over those who have violated the covenant. But the people who know their God will be strong and will resist him.",
    "MSG": "32 By the use of smooth, flattering words he will corrupt those who betray the covenant. But the people who know their God will stand firm and take action."
  },

  "John 8:32": {
    "KJV": "32 And ye shall know the truth, and the truth shall make you free.",
    "NKJV": "32 And you shall know the truth, and the truth shall make you free.”",
    "NIV": "32 Then you will know the truth, and the truth will set you free.”",
    "ESV": "32 and you will know the truth, and the truth will set you free.”",
    "AMP": "32 And you will know the truth [regarding salvation], and the truth will set you free [from the penalty of sin].”",
    "NLT": "32 And you will know the truth, and the truth will set you free.”",
    "MSG": "32 Then you will experience for yourselves the truth, and the truth will free you.”"
  },

  "2 Timothy 2:15": {
    "KJV": "15 Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.",
    "NKJV": "15 Be diligent to present yourself approved to God, a worker who does not need to be ashamed, rightly dividing the word of truth.",
    "NIV": "15 Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.",
    "ESV": "15 Do your best to present yourself to God as one approved, a worker who has no need to be ashamed, rightly handling the word of truth.",
    "AMP": "15 Study and do your best to present yourself to God approved, a workman [tested by trial] who has no reason to be ashamed, accurately handling and skillfully teaching the word of truth.",
    "NLT": "15 Work hard so you can present yourself to God and receive his approval. Be a good worker, one who does not need to be ashamed and who correctly explains the word of truth.",
    "MSG": "15 Concentrate on doing your best for God, work you won’t be ashamed of, laying out the truth plain and simple."
  }
};

const quizQuestions = [
    {
        q: "What is the main theme or title of this lesson?",
        a: [
            "Doing The First Thing First",
            "IMITATING CHRIST JESUS",
            "The Power of Faith",
            "Living Without Boundaries"
        ],
        correct: 1
    },
    {
        q: "What is the memory verse of this lesson?",
        a: [
            "Matthew 6:33",
            "John 3:16",
            "Matthew 5:48",
            "Acts 4:13"
        ],
        correct: 2
    },
    {
        q: "According to the lesson, what does 'Imitating Christ' simply mean?",
        a: [
            "Going to church every day",
            "Copying the way Jesus behaves and talks",
            "Performing miracles",
            "Becoming a religious leader"
        ],
        correct: 1
    },
    {
        q: "What did the elders notice about the disciples in Acts 4:13?",
        a: [
            "They were highly educated",
            "They were wealthy men",
            "They had been with Jesus",
            "They were expert speakers"
        ],
        correct: 2
    },
    {
        q: "Why is it necessary to 'Know the Lord' to successfully imitate Him?",
        a: [
            "To gain high status in church",
            "Because no one can imitate an unknown person",
            "To become famous",
            "To prove intelligence"
        ],
        correct: 1
    },
    {
        q: "What is a common mistake among Christians mentioned in the lesson regarding character?",
        a: [
            "They focus too much on character",
            "They have charisma and religious cloaks but no trait of Godly character",
            "They do not have the Holy Spirit",
            "They study the Bible too much"
        ],
        correct: 1
    },
    {
        q: "Who is described as the 'Pacesetter' for the many sons born to God?",
        a: [
            "The Apostle Paul",
            "The Elders of Israel",
            "The Lord Jesus Christ",
            "The Disciples"
        ],
        correct: 2
    },
    {
        q: "According to John 14:6, how can an individual reach God?",
        a: [
            "Through hard work",
            "Through religious traditions",
            "Only through Christ Jesus",
            "By being uneducated and ordinary"
        ],
        correct: 2
    },
    {
        q: "What is the 'identification mark' of a believer mentioned in the lesson?",
        a: [
            "Their religious title",
            "Their church attendance",
            "The manifestation of His character",
            "The amount of scriptures they know"
        ],
        correct: 2
    },
    {
        q: "Which scripture mentions that we will face persecution for His name's sake?",
        a: [
            "John 3:16",
            "Matthew 10:22",
            "Daniel 11:32",
            "Matthew 5:48"
        ],
        correct: 1
    },
    {
        q: "What is the ultimate consequence of failing to imitate Christ according to Matthew 7:22-23?",
        a: [
            "Missing a church service",
            "Rejection by the Lord",
            "Loss of material wealth",
            "Lack of charisma"
        ],
        correct: 1
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
    





const [contentData, setContentData] = useState<ContentData>({
    lessonDate: "April 12, 2026",
    lessonTitle: "IMITATING CHRIST JESUS",

    memoryVerse:
        "Be ye therefore perfect, even as your Father which is in heaven is perfect - Matt 5:48",
    memoryVerseRef: "Matthew 5:48",

    introScriptures: ["Acts 4:13-14"],
    lessonIntroScriptures: ["Matthew 7:13-14", "John 3:36", "Matthew 3:17", "Matthew 17:5", "John 14:6"],

    introduction:
        "Giving the chance many Christian believers will prefer living without boundaries but the Lord who saved us and His kingdom has a standard to maintain. Matt. 7:13, 14 (The narrow gate and way), Jn. 3:36. Jesus is God's model and standard to mankind for a relationship with him and entry to his kingdom. Matt. 3:17; 17:5. In this vein, there is a glaring demand for believers to be like Jesus. Jn. 14:6. Imitating Christ therefore simply means copying the way Jesus behaves and talks (Character).",

    aims:
        "That the believer may be in the image and likeness of Christ Jesus",

    aimsScriptures: [],

    objectives:
        "That the child of God may have God's approval, relationship and kingdom benefits.",

    objectivesScriptures: [],

    lessonIntro:
        "Some disciples of Jesus were apprehended by a company of Israel's elders with the charges of blasphemy for preaching the gospel. After every form of intimidation and threat the elders saw something unique with these disciples. They were noticed for being like Jesus and a conclusive investigation revealed that they had being with the Lord Jesus. Who have you being with and who do you look like?",

    lessonPoints: [
        {
            title: "HOW TO IMITATE CHRIST",
            content:
                "To successfully imitate Christ, one must move beyond outward religious appearance to a true transformation of character.",
            scriptures: [],
            subPoints: [
                {
                    title: "KNOW THE LORD",
                    content:
                        "You have to know the Lord Jesus to be able to imitate Him. No one can imitate an unknown person. Dan 11:32, Jn. 8:32",
                    scriptures: ["Daniel 11:32", "John 8:32"]
                },
                {
                    title: "STUDY HIS CHARACTER",
                    content:
                        "Most Christians have charisma, the Holy Spirit and a religious cloak but have not trait of Godly character. 2 Tim. 2:15, Mk. 3:14. You need to know his character to be like him successfully.",
                    scriptures: ["2 Timothy 2:15", "Mark 3:14"]
                },
                {
                    title: "DETERMINATION",
                    content: 
                        "Be determined to be like Jesus because it is possible. Titus 2:12",
                    scriptures: ["Titus 2:12"]
                }
            ],
        },
        {
            title: "WHY IMITATE CHRIST",
            content:
                "Imitating Christ is the requirement for reaching God and serves as a testimony to others.",
            scriptures: ["Matthew 10:25"],
            subPoints: [
                {
                    title: "HE IS OUR PACESETTER",
                    content:
                        "Because He is the pacesetter for the many sons that must be born to God. Col. 1:18-19, Heb 2:10.",
                    scriptures: ["Colossians 1:18-19", "Hebrews 2:10"]
                },
                {
                    title: "SERVANT AND MASTER",
                    content: 
                        "It will suffice that a servant becomes like his master - Matt. 10:25",
                    scriptures: ["Matthew 10:25"]
                },
                {
                    title: "ACCESS TO THE FATHER",
                    content:
                        "No man can reach God except through Christ. This means that an individual can only go to God in the image and likeness of Jesus to receive attention. Jn. 14:6",
                    scriptures: ["John 14:6"]
                },
                {
                    title: "AN IDENTIFICATION MARK",
                    content:
                        "The manifestation of his character is an identification mark of a believer aimed at drawing others to Jesus. Matt. 5:16, Jn. 12:32",
                    scriptures: ["Matthew 5:16", "John 12:32"]
                }
            ],
        },
        {
            title: "RESULTS OF IMITATING CHRIST",
            content:
                "Imitating Jesus brings both spiritual rewards and earthly challenges.",
            scriptures: ["Acts 4:13"],
            subPoints: [
                {
                    title: "TRANSFORMATION",
                    content: 
                        "One becomes like Christ Jesus. Acts 4:13",
                    scriptures: ["Acts 4:13"]
                },
                {
                    title: "DIVINE APPROVAL",
                    content:
                        "One receives the Father's approval and entry to Heaven. Jn. 14:3, 23",
                    scriptures: ["John 14:3", "John 14:23"]
                },
                {
                    title: "PERSECUTION AND POWER",
                    content:
                        "One will face persecution. Matt. 10:22, Jn. 15:20. However, you will also operate like Jesus on earth. Jn. 14:12",
                    scriptures: ["Matthew 10:22", "John 15:20", "John 14:12"]
                },
                {
                    title: "ETERNAL REWARD",
                    content: 
                        "One will receive eternal reward. Matt. 7:21, Jn. 3:16",
                    scriptures: ["Matthew 7:21", "John 3:16"]
                },

                {
                    title: "FAILURE TO IMITATE CHRIST",
                    content:
                        "The consequences are numerous and grievous but above all one will face rejection. Matt. 7:22-23.",
                    scriptures: ["Matthew 7:22-23"],
                }
            ],
        }
    ],

    conclusion:
        "Start to imitate Christ from this moment and everything that responds to Jesus will begin to respond to you. Failure to imitate Christ leads to numerous consequences, above all one will face rejection. Matt. 7:22-23.",

    conclusionScriptures: ["Matthew 7:22-23"],

    prayerPoints: [
        "Lord, help me to study and mirror Your character daily.",
        "Father, let the life of Jesus be clearly seen in me.",
        "Lord, grant me the determination to walk in Your footsteps regardless of persecution.",
        "Father, may my life be a mark that draws others closer to Your kingdom."
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
                            IMITATING CHRIST JESUS
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
                                        Text: Acts 4:13-14
                                    </h3>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() =>
                                                showBibleVersions(
                                                    "Acts 4:13-14"
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                        >
                                        <BookOpen size={16} />
                                            Read  Acts 4:13-14
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
                        Self-Assessment: Walking as He Walked
                    </h4>

                    <p className="mb-4">
                        On a scale of 1 to 10, how well does your daily conduct reflect the character of Christ? 
                        Are you actively "denying ungodliness" and living "soberly, righteously, and godly" (Titus 2:12)?
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
                            ? "Excellent! Your growth in Christ-like character is evident. Continue to stay close to the Master."
                            : faithRating >= 5
                            ? "You are progressing. Ask the Holy Spirit to help you bridge the gap between charisma and character."
                            : "This is a call to a deeper transformation. Spend more time 'with Jesus' to reflect His image (Acts 4:13)."}
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
                        Personal Decisions: Commitment to Imitate
                    </h4>

                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <input
                            type="text"
                            value={commitmentInput}
                            onChange={(e) => setCommitmentInput(e.target.value)}
                            placeholder="E.g., I will study His character daily, I will choose to react with love instead of anger..."
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
                        Imitating Christ isn't about outward religious appearance, but a total change of lifestyle. 
                        As you copy the way Jesus behaves and talks, the world will take knowledge that you have been with Him (Acts 4:13). 
                        Remember: the goal is to be in His image and likeness.
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
