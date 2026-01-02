package handler

import (
	"encoding/json"
	"net/http"

	"backend/internal/config"
	"backend/internal/db"
	"backend/internal/helper"
	"golang.org/x/crypto/bcrypt"
)

/* =======================
   REQUEST / RESPONSE
======================= */

type SignUpRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

/* =======================
   SIGN UP
======================= */

func SignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SignUpRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid body", http.StatusBadRequest)
		return
	}

	if req.Name == "" || req.Email == "" || req.Password == "" {
		http.Error(w, "name, email, password wajib", http.StatusBadRequest)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	var userID int
	role := "user"
	err = db.DB.QueryRow(
		`INSERT INTO users (name, email, password_hash, created_at)
		 VALUES ($1, $2, $3, NOW())
		 RETURNING id`,
		req.Name,
		req.Email,
		string(hash),
		role,
	).Scan(&userID)

	if err != nil {
		http.Error(w, "Email sudah terdaftar", http.StatusConflict)
		return
	}
	token, err := config.GenerateToken(userID, req.Email, role)
	if err != nil {
		helper.JSON(w, http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"message": "Gagal generate token",
		})
		return
	}

	helper.JSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data": map[string]string{
			"token": token,
		},
	})
}

/* =======================
   LOGIN
======================= */

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req LoginRequest
	// cara baca:
	// Data JSON yang dikirim dari frontend melalui r.Body akan dibaca,
	// lalu dicocokkan dengan field pada struct req,
	// dan jika cocok, nilainya akan disimpan ke dalam variabel req.
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid body", http.StatusBadRequest)
		return
	}

	var userID int
	var hash string
	var role string

	// ambil data berdasarkan email dari req dikirim user
	err := db.DB.QueryRow(
		"SELECT id, password_hash, role FROM users WHERE email=$1",
		req.Email,
	).Scan(&userID, &hash, &role)

	if err != nil || bcrypt.CompareHashAndPassword([]byte(hash), []byte(req.Password)) != nil {
		helper.JSON(w, http.StatusUnauthorized, map[string]interface{}{
			"success": false,
			"message": "Email atau password salah",
		})
		return
	}

	token, err := config.GenerateToken(userID, req.Email, role)
	if err != nil {
		helper.JSON(w, http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"message": "Terjadi kesalahan server",
		})
		return
	}

	helper.JSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data": map[string]string{
			"token": token,
		},
	})

}

func AdminHandler(w http.ResponseWriter, r *http.Request) {
	role := r.Context().Value("role").(string)

	if role != "admin" {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	w.Write([]byte("Welcome Admin"))
}
