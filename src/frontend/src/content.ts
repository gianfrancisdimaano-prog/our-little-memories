/**
 * ============================================================================
 *  ✦  EDIT EVERYTHING HERE  ✦
 * ============================================================================
 *  This is the ONE place to personalize the whole site. Change the text,
 *  photos, and song below — nothing else needs to be touched.
 *
 *  Tips:
 *   • Keep the quote marks (" ") around every value.
 *   • To add a photo, drop the image file into
 *     `src/frontend/public/assets/images/` and reference it as
 *     "/assets/images/your-file.jpg".
 *   • The letter is shown exactly as written here, so line breaks and
 *     paragraph breaks are preserved. Separate paragraphs with a blank line.
 *   • Wrap a phrase in **double asterisks** to show it in bold.
 * ============================================================================
 */

export interface Photo {
  /** Path to the image, e.g. "/assets/images/us-01.jpg". */
  src: string;
  /** Optional short caption shown beneath the photo. */
  caption?: string;
  /** Optional alt text for screen readers. Falls back to the caption. */
  alt?: string;
}

export interface StoryCard {
  /** Short card title, e.g. "The Way You Laugh". */
  title: string;
  /** One or two warm sentences describing the reason. */
  body: string;
}

export interface Song {
  /** Song title. */
  title: string;
  /** Artist name. */
  artist: string;
  /**
   * Audio source. Leave empty ("") to show a gentle "add a song" note.
   * To enable playback, place a legally obtained audio file in
   * `src/frontend/public/assets/audio/` and set this to its path, e.g.
   * "/assets/audio/our-song.mp3". You may also paste a direct audio URL.
   */
  src: string;
}

export interface Content {
  /** Small label above the hero headline, e.g. "OUR STORY · MONTH 12". */
  eyebrow: string;
  /** Large hero headline. */
  heroHeadline: string;
  /** Softer line beneath the headline. */
  heroSubtitle: string;
  /** Label for the button that scrolls to the letter. */
  letterButtonLabel: string;
  /** Label for the button that scrolls to the photo album. */
  albumButtonLabel: string;
  /** The full letter, shown verbatim. Separate paragraphs with a blank line. */
  letter: string;
  /** Signature line at the end of the letter. */
  letterSignature: string;
  /** Heading for the photo album section. */
  albumHeading: string;
  /** Short intro line for the photo album section. */
  albumIntro: string;
  /** The photos shown in the album. */
  photos: Photo[];
  /** Heading for the song section. */
  songHeading: string;
  /** Short intro line for the song section. */
  songIntro: string;
  /** The song that plays for you two. */
  song: Song;
  /** Heading for the "Why I Love Our Story" section. */
  storyHeading: string;
  /** Short intro line for the story section. */
  storyIntro: string;
  /** The five reasons, shown as cards. */
  storyCards: StoryCard[];
  /** Closing message shown in the finale. */
  closingMessage: string;
  /** Label for the finale button that releases a burst of petals. */
  finaleButtonLabel: string;
}

export const content: Content = {
  // ── Hero ────────────────────────────────────────────────────────────────
  eyebrow: "OUR STORY · MONTH 1",
  heroHeadline: "Happy 1st Monthsary, My Love ❤️",
  heroSubtitle: "Another month, another beautiful memory with you.",
  letterButtonLabel: "Open My Letter",
  albumButtonLabel: "See Our Moments",

  // ── The Letter (shown exactly as written) ───────────────────────────────
  letter: `Dear to my bb labs in the whole world,

Happy monthsary po! ❤️ Wow, it feels like matagal na tayo nag-usap, parang one year na HAHAHA. Well, you know naman kung ano nangyari sa atin noong Grade 12 pa hehe. But after everything we've been through and all the things we experienced, we still chose each other, and I am very thankful for that.

I never thought I would meet someone like you—someone as sweet, loving, and caring as you are. I'm very glad that I met someone who stays by my side, kahit sa mga misunderstandings and sa mga times na hindi tayo pareho ng iniisip. And yet, here we are, celebrating our **1st monthsary**. ❤️

I remember our first date noong **June 25** HAHAHAHAHA. I was so nervous kasi I'm not really a social person, more of the nonchalant type. I remember looking at you and thinking about how pretty and beautiful you are.

Pumunta pa tayo sa Greenwich where we ate, pero hindi mo inubos yung pagkain mo HAHAHAHA. Okay lang naman. Then we went to the photobooth to take pictures, which was actually my first time taking pictures with someone like that. Then pumunta tayo sa arcade, pero ako lang naglaro HAHAHAHAHA. Gusto pa kitang marinig kumanta pero ayaw mo. Okay langgg.

Then pumunta tayo sa Jollibee and you met Alee. Kahit wala akong idea kung ano pinag-uusapan niyo that time, I couldn't stop looking at you and holding your hand. HAHAHAHA, nakakahiya nga eh.

And nung pauwi na tayo, I remember feeling like I didn't want the day to end. I had a lot of things going on at that time na hindi ko ata nasabi sa'yo, but being with you made everything feel lighter. It was really nice to be with someone who could make my day better. I really love spending time with you.

Then came the days when things became complicated between us. We stopped talking for a while, and honestly, losing someone I cared about so much really hurt. I kept thinking about what happened and regretting the things I did wrong. I'm truly sorry for the things that hurt you, even the things I didn't realize at the time.

Then we talked again. I honestly wasn't expecting it, especially since everything had just happened. It was a little awkward at first, especially since you were with Alee, but I'm still thankful because somehow, she became part of the reason why we found our way back to each other. HAHAHAHAHA, pero tanga din siya, sorryyyy. 😭

After a few weeks, we saw each other again, and we went back to the things we always do—photobooth, food trips, and spending time together. Then after a few more weeks, we did it all over again, except this time, I started giving you little kisses on the cheek hehe. Sorry, I just couldn't help myself. ❤️

Then came **September 8**. I remember that it was just the two of us outside while everyone else was inside. We were just hugging and looking at each other HAHAHAHAHA, and then we kissed.

That moment became one of the most special memories I've ever had. It made me realize even more how much you mean to me. Since that day, I couldn't stop thinking about it. Parang tanga talaga ako HAHAHAHAHA.

Parang naging kwento na talaga itong letter ko HAHAHAHAHA, pero I guess that's what happens when I'm talking about someone who means so much to me.

You are one of the greatest loves I've ever known, and I don't want to waste any of the moments and memories we've shared these past few months. I want to keep choosing you, while also giving us the time and space to grow together and become better for each other.

**Life without you is like a song without a melody**, and my heart would feel empty without the person who makes ordinary moments feel special.

Ikaw yung taong lagi kong kinakantahan whenever I learn a new song or whenever nagpapayabang ako HAHAHAHA. I love singing songs for you, even if minsan pangit naman talaga boses ko. 😭❤️

I loveee you so muchhh. Sobra-sobra, mahal na mahal kitaaa. This is what it feels like to love someone who genuinely cares about you.

I may not know what the future holds, but I have **FAITH in us**. As long as we have each other, I'll always believe in our love and in everything we can become together.

**Happy 1st Monthsary to my bb Faith labs in the whole worlddd. ❤️**

**My engineer,**
**My Genrel Faith Alda Jasa,**
**And my love.**

I love you always. ❤️

**From your chef, bb, and makulit na bf,**
**Gian**`,
  letterSignature: "From your chef, bb, and makulit na bf,",

  // ── Photo Album ─────────────────────────────────────────────────────────
  albumHeading: "Our Moments",
  albumIntro:
    "A few frames from the story we're still writing together — every one of them a favourite.",
  photos: [
    {
      src: "/assets/images/graduation.jpg",
      caption: "Our graduation day at LPU",
      alt: "Gian and Faith hugging on stage in maroon graduation gowns at Lyceum of the Philippines University, holding their diplomas in front of the LPU Hymn screen",
    },
    {
      src: "/assets/images/gong-cha.jpg",
      caption: "Milk tea dates with you",
      alt: "Selfie of Gian and Faith in front of the red Gong Cha bubble tea menu board, Faith in a beige cap resting her chin on her hand",
    },
    {
      src: "/assets/images/wooden-ceiling.jpg",
      caption: "Just us, being us",
      alt: "Indoor selfie of Gian and Faith under a wooden ceiling with red beams, Faith in a light pink Calvin Klein shirt and Gian in a black shirt with a silver pendant",
    },
    {
      src: "/assets/images/cafe-selfie.jpg",
      caption: "Laughing until it hurt",
      alt: "Playful cafe selfie of Gian and Faith cheek to cheek, Faith in a striped top, both making funny faces in a bright modern restaurant",
    },
  ],

  // ── Our Song ────────────────────────────────────────────────────────────
  songHeading: "Our Song",
  songIntro: "Press play and let this one carry us back to the beginning.",
  song: {
    title: "Janice",
    artist: "Dilaw",
    src: "/assets/audio/janice-dilaw.mp3",
  },

  // ── Why I Love Our Story ────────────────────────────────────────────────
  storyHeading: "Why I Love Our Story",
  storyIntro:
    "Five of the countless reasons this chapter keeps getting better.",
  storyCards: [
    {
      title: "Our first memory",
      body: "The moment it all began — a spark I still feel every time I think of it.",
    },
    {
      title: "My favorite moment with you",
      body: "Some of my favourite memories are the simplest ones — no plans, no noise, just you beside me.",
    },
    {
      title: "Something I appreciate about you",
      body: "The gentleness you carry into the world inspires me to be a better person every single day.",
    },
    {
      title: "A funny memory",
      body: "You turn ordinary days into something lighter, and I never get tired of that smile.",
    },
    {
      title: "A message for our future",
      body: "With you, the future feels less like a question and more like a promise I can't wait to keep.",
    },
  ],

  // ── Finale ──────────────────────────────────────────────────────────────
  closingMessage:
    "Thank you for being part of my life. Here's to more memories, more laughter, and more monthsaries together. ❤️",
  finaleButtonLabel: "I Love You ❤️",
};

export default content;
