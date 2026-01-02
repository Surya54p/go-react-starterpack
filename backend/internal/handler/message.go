package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/db"
)

/* =======================
   CREATE MESSAGE
======================= */

type MessageRequest struct {
	UserID  int    `json:"user_id"`
	Message string `json:"message"`
}

func CreateMessage(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req MessageRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if req.UserID == 0 || req.Message == "" {
		http.Error(w, "user_id dan message wajib", http.StatusBadRequest)
		return
	}

	_, err := db.DB.Exec(
		`INSERT INTO messages (user_id, message, created_at)
		 VALUES ($1, $2, NOW())`,
		req.UserID,
		req.Message,
	)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Pesan berhasil dikirim",
	})
}

/* =======================
   GET MESSAGES
======================= */

func GetMessages(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	rows, err := db.DB.Query(`
		SELECT u.name, u.email, m.message, m.created_at
		FROM messages m
		JOIN users u ON u.id = m.user_id
		ORDER BY m.created_at DESC
	`)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type MessageResponse struct {
		Name      string    `json:"name"`
		Email     string    `json:"email"`
		Message   string    `json:"message"`
		CreatedAt time.Time `json:"created_at"`
	}

	var messages []MessageResponse

	for rows.Next() {
		var msg MessageResponse
		if err := rows.Scan(
			&msg.Name,
			&msg.Email,
			&msg.Message,
			&msg.CreatedAt,
		); err != nil {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		messages = append(messages, msg)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(messages)
}
