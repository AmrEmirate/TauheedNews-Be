# Tauheed News - Backend (API)

Backend / API Server untuk Tauheed News. Dibangun menggunakan Express.js, TypeScript, dan Prisma ORM dengan database PostgreSQL.

## Fitur Utama
- REST API untuk Artikel, Kategori, Jadwal Kajian, dan Multimedia.
- Prisma ORM terintegrasi.
- Database PostgreSQL.

## Cara Menjalankan (Lokal)

1. Pastikan Node.js terinstall.
2. Buka terminal di folder `backend`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Setup konfigurasi environment:
   Pastikan file `.env` sudah diatur dengan `DATABASE_URL` yang benar (saat ini terhubung ke PostgreSQL eksternal).
5. Inisialisasi Database (Push Schema & Seeding Data):
   ```bash
   npm run db:init
   ```
6. Jalankan development server:
   ```bash
   npm run dev
   ```
7. Server berjalan di `http://localhost:5000`.

*(Backend ini terintegrasi langsung dengan Frontend Tauheed News pada port 3000).*
