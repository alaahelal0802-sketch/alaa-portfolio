// ============================================================
//  content.js — كل كلام الموقع وإعداداته في الملف ده
//  عشان تغيّر أي كلمة في الموقع، غيّرها هنا بس.
//  الفيديوهات نفسها بتيجي من قوايم التشغيل على يوتيوب.
// ============================================================

import siteData from './content/site.json'
import toolsData from './content/tools.json'

// الكلام بتاع الموقع (الاسم، الصورة، الإيميل، السوشيال، العملاء)
// بيتعدّل من لوحة التحكم (Pages CMS) أو من ملف src/content/site.json
export const site = siteData

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
//  صفحة AI Tools: بتتعدّل من لوحة التحكم أو من src/content/tools.json
// ============================================================
export const tools = toolsData.tools
