// ============================================================
//  content.js — كل كلام الموقع وإعداداته في الملف ده
//  عشان تغيّر أي كلمة في الموقع، غيّرها هنا بس.
//  الفيديوهات نفسها بتيجي من قوايم التشغيل على يوتيوب.
// ============================================================

export const site = {
  name: 'Alaa Helal',
  role: 'Motion designer & video editor',
  status: 'Open for projects',

  hero: {
    eyebrow: 'Video editing · Motion · SaaS · AI video',
    titleLines: ['I make', 'ideas'],
    titleAccent: 'move.',
    text: "Hi, I'm Alaa. I edit short-form videos, design motion graphics and animate software products. 6+ years in video production.",
    primaryButton: 'Start a project',
    secondaryButton: 'See my work',
  },

  // الشوريل: حط هنا ID الفيديو من يوتيوب (الجزء اللي بعد v= في اللينك)
  showreel: {
    videoId: 'AWOY8uthlOo',
    title: 'My best work in one video.',
  },

  about: {
    title: ['Clean motion.', 'Clear stories.'],
    titleAccent: 'Fast workflows.',
    text: "I'm Alaa, a video editor and motion designer with 6+ years in video production. I work across short-form editing, motion graphics, SaaS and UI animation, and AI video.",
    tools: ['After Effects', 'Premiere Pro', 'Cartoon Animator', 'Photoshop', 'Illustrator', 'ElevenLabs'],
  },

  contact: {
    title: ['Have a project', 'in mind?'],
    // حط إيميلك هنا، مثال: 'hello@alaahelal.com'
    email: '',
    // حط لينك كل حساب. اللي ملوش لينك هيفضل باهت ومش بيتداس.
    socials: [
      { label: 'YouTube', url: 'https://www.youtube.com/@alaahelal96' },
      { label: 'Instagram', url: 'https://www.instagram.com/3laahelal' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@alaahelal9' },
      { label: 'Facebook', url: 'https://www.facebook.com/alaa.helal.503' },
      { label: 'WhatsApp', url: 'https://api.whatsapp.com/send?phone=201559254443' },
    ],
  },

  // أسماء العملاء (بعدين نبدّلها باللوجوهات)
  clients: ['Yafta Media', 'Appweba', 'Engix', 'Tawreed X', 'Coffeekies', 'Resalty', 'Jam3ty', 'Al Khaleejia', 'Ja3aN', 'MediWeb'],
}

// ============================================================
//  أقسام الشغل — كل قسم مربوط بقايمة أو أكتر على يوتيوب
//  format: 'vertical' للريلز الطولي، 'wide' للفيديو العريض
//  showTitles: لو false الكروت بتظهر صورة بس من غير اسم
//  limit: كام فيديو يظهر في الأول قبل زرار "Show all"
// ============================================================

export const sections = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    text: 'Short-form reels for social media.',
    format: 'vertical',
    showTitles: false,
    mix: true, // يخلط القوايم مع بعض عشان ما يبانش مين العميل
    limit: 12,
    playlists: [
      'PLGsBqB3JFZXM', // Yafta
      'PLXI2naR6X-X8', // Appweba
      'PLLcARe012Agc', // Real Estate Edit
    ],
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    text: 'Explainers, app promos, characters, intros and logo animation.',
    format: 'wide',
    showTitles: true,
    limit: 9,
    playlists: [
      'PLLopgL6Pi-56FPgLPourOhQir9uZkujAZ', // Motion Graphic
      'PLLopgL6Pi-55SzBJ6e9mC7RqoLcXudin0', // Intro & Logo animation
    ],
  },
  {
    id: 'saas-ui',
    title: 'SaaS & UI Animation',
    text: 'Product launches and UI walkthroughs for software.',
    format: 'wide',
    showTitles: true,
    limit: 6,
    playlists: ['PLSpWHOhGt600'], // Saas and Ui Animation
  },
  {
    id: 'ai-videos',
    title: 'AI Videos',
    text: 'AI-generated scenes, characters and voice-over.',
    format: 'vertical',
    showTitles: false,
    limit: 8,
    playlists: [], // حط ID قايمة الـ AI هنا لما تعملها
    emptyText: 'New AI videos are coming soon.',
  },
]

// فيديوهات موجودة في القوايم بس مش عايزها تظهر في الموقع
export const hiddenVideos = [
  'AWOY8uthlOo', // Showreel (بيظهر فوق لوحده)
  '1QgH3PuIY6Q', // PayPal logo (unofficial)
  'AVdTQggJef4', // Google logo (unofficial)
  'CrTboWOXEso', // Ja3an logo
  'SLpoHQlviUI', // Private
  '2s0e3JMZzlk', // مدن الشمال: الثامنيل لسه القديم
]

// أسماء أنضف من أسامي يوتيوب. أي فيديو مش هنا هياخد اسمه من يوتيوب.
export const titles = {
  KjwmQhobNWg: 'Tawreed X',
  VccaelewgHs: 'Coffeekies',
  WBiafT8Qeg8: 'Al Khaleejia Real Estate',
  UWeN4siUcWg: 'Resalty',
  '0EuMS29dnHQ': 'Kayank',
  '8J-hzzEmkmY': 'Granny Egypt',
  'CNB-6Wblxug': 'Engix',
  'mSxoHvUG-Xo': 'Mqdak',
  dppUgrEXuC8: 'Rapimix',
  KrTZDfKujdQ: 'Jam3ty App',
  '2s0e3JMZzlk': 'Northern Cities',
  nfLCAsPhfeE: 'Engix',
  '9xcPQktto8E': 'Mr. Hatem',
  CeLfP44DlcY: 'Alaa Helal',
  lf4lLEo4w9E: 'Travel Bag',
  vYQjP9hFgnw: 'Lahset Mokh',
  '1hVTpXPEDzc': 'Ja3aN',
  fwcF3W9cgkk: 'MediWeb',
}

// كلمة صغيرة تحت كل فيديو (اختياري)
export const tags = {
  KjwmQhobNWg: 'Explainer',
  VccaelewgHs: 'Brand promo',
  WBiafT8Qeg8: 'Real estate',
  UWeN4siUcWg: 'App promo',
  '0EuMS29dnHQ': 'Character',
  '8J-hzzEmkmY': 'Character',
  'CNB-6Wblxug': 'Explainer',
  'mSxoHvUG-Xo': 'App promo',
  dppUgrEXuC8: 'Character',
  KrTZDfKujdQ: 'App promo',
  nfLCAsPhfeE: 'Logo animation',
  '9xcPQktto8E': 'Logo animation',
  CeLfP44DlcY: 'Logo animation',
  lf4lLEo4w9E: 'Intro',
  vYQjP9hFgnw: 'Intro',
  '1hVTpXPEDzc': 'UI animation',
  fwcF3W9cgkk: 'Teaser',
}

// ============================================================
//  صفحة AI Tools
// ============================================================
export const tools = [
  {
    name: 'Helal Captions',
    hosts: ['After Effects', 'Premiere Pro'],
    text: 'Turn speech into styled captions inside your editor. Fast, accurate and editor friendly.',
    features: [
      ['AI powered', 'transcription to captions'],
      ['Multiple providers', 'Groq (Whisper Turbo) free, ElevenLabs optional'],
      ['Full control', 'over caption style'],
    ],
    images: ['/images/helal-captions-ae.jpg', '/images/helal-captions-pr.jpg'],
    downloadUrl: '', // حط لينك التحميل أو صفحة البيع هنا
    price: '', // مثال: 'Free' أو '$19'
  },
]
