# موقع Alaa Helal

## إزاي تضيف شغل جديد
مش محتاج تفتح الكود. يوتيوب هو لوحة التحكم:

1. ارفع الفيديو على يوتيوب (Public أو Unlisted، مش Private).
2. ضيفه للقايمة الصح:
   - **Video Editing** ← قوايم Yafta و Appweba و Real Estate Edit
   - **Motion Graphics** ← قايمة Motion Graphic و Intro & Logo animation
   - **SaaS & UI Animation** ← قايمة Saas and Ui Animation
3. الموقع هيتحدّث لوحده في خلال ساعة.

## إزاي تغيّر الكلام
كل الكلام والإعدادات في ملف واحد: `src/content.js`
(الاسم، الإيميل، لينكات السوشيال، العملاء، أسماء الفيديوهات، الفيديوهات المخفية، صفحة AI Tools).

## الصور
`public/images/` (صورتك وصور Helal Captions).

## للتشغيل على الكمبيوتر (اختياري)
```
npm install
npm run dev
```

## ملاحظة تقنية
- `api/playlist.js` بيقرا قوايم يوتيوب. على Vercel ممكن تحط متغيّر `YOUTUBE_API_KEY` عشان يستخدم API يوتيوب الرسمي (أثبت).
- لو يوتيوب مش متاح، الموقع بيستخدم نسخة احتياطية من `src/data/snapshot.json`.
