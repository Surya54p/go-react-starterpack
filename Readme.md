# Go + React Starter Pack
Monorepo sederhana untuk belajar dan membangun aplikasi dengan:
- **Backend**: Golang
- **Frontend**: React + TypeScript
```md

Struktur project:
go-react-learn/
├── backend/
└── frontend/
````

---
## 🚀 Getting Started

Clone Repository:
```bash
git clone https://github.com/Surya54p/go-react-starterpack.git
cd go-react-starterpack
````

---
## 🔧 Backend Setup (Golang)

1. Masuk ke folder backend
```bash
cd backend
```

2. Copy file environment (jika tersedia)
```bash
cp .env.example .env
```

3. Jalankan backend
```bash
go run main.go
```

Backend akan berjalan di:
```
http://localhost:8080
```

---
## 🎨 Frontend Setup (React)

1. Masuk ke folder frontend
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Jalankan frontend
```bash
npm run dev
```

Frontend akan berjalan di:
```
http://localhost:5173
```

---
## 🔐 Authentication & Role Flow

* Login / Sign Up menghasilkan **JWT Token**
* Token disimpan di `localStorage`
* Role (`admin` / `user`) disimpan **di dalam JWT**
* Frontend membaca role dari JWT untuk:
* redirect halaman
* proteksi route
* Backend tetap memvalidasi token & role untuk keamanan

---
## 📁 Git Ignore Notes

Beberapa file dan folder tidak di-commit demi keamanan dan kebersihan repo:

* `node_modules/`
* `.env`
* `backend/internal/db/`

Gunakan file `.example` sebagai template konfigurasi.

---
## 🛠️ Tech Stack

* Golang
* React
* TypeScript
* Tailwind CSS
* JWT Authentication
* PostgreSQL (opsional)
---
## 📌 Notes

Project ini dibuat untuk tujuan pembelajaran meliputi:

* JWT Authentication
* Role-based access (Admin & User)
* SPA Routing dengan React Router
* Struktur backend & frontend yang rapi
