# StreamFlix - Setup Instructions

## 🚨 Masalah CORS Error

API `kiw-api.vercel.app` memblokir request dari localhost karena CORS policy.

## ✅ Solusi 1: Menggunakan Local Proxy Server (RECOMMENDED)

### Langkah-langkah:

1. **Install Node.js** (jika belum punya)
   - Download dari https://nodejs.org
   - Pilih versi LTS

2. **Buka Terminal/Command Prompt** di folder ini

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Jalankan server:**
   ```bash
   npm run dev
   ```

5. **Buka browser:**
   ```
   http://localhost:3000/streamflix-complete.html
   ```

6. **Selesai!** ✅ Semua fitur akan berfungsi:
   - List film/series muncul
   - Tombol "Tonton Sekarang" working
   - Episode list tampil sempurna

---

## ✅ Solusi 2: Deploy ke Hosting (GRATIS)

### Deploy ke Vercel (Paling Mudah):

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Ikuti instruksi** - file akan auto-deploy!

### Atau Deploy Manual:

1. Buat akun di https://vercel.com
2. Drag & drop folder ini ke Vercel dashboard
3. Done! URL live akan muncul

---

## ✅ Solusi 3: Browser Extension

Install **"CORS Unblock"** atau **"Allow CORS"** extension di browser:
- Chrome: https://chrome.google.com/webstore
- Firefox: https://addons.mozilla.org

Setelah install, aktifkan extension dan refresh halaman.

---

## 📁 File Structure

```
streamflix/
├── server.js                  # Express proxy server
├── streamflix-complete.html   # Main HTML (butuh server)
├── package.json               # Node dependencies
└── README.md                  # This file
```

---

## 🔧 Troubleshooting

**Q: "npm: command not found"**
A: Install Node.js terlebih dahulu dari nodejs.org

**Q: Port 3000 already in use**
A: Ubah PORT di server.js ke port lain (misal 3001)

**Q: Masih CORS error**
A: Pastikan server berjalan dulu sebelum buka HTML

---

## 🎯 Features

✅ Browse film, series, anime, drakor
✅ Search functionality
✅ Detail lengkap dengan deskripsi & genre
✅ Video player fullscreen
✅ Episode list untuk series
✅ Responsive design

---

## 📝 Notes

- API: kiw-api.vercel.app
- Server berfungsi sebagai proxy untuk bypass CORS
- Semua data dari API, real-time dan up-to-date
- Gratis, no ads, no tracking

---

**Happy Streaming! 🎬**
