package main

import (
	"log"
	"net/http"

	"backend/internal/db"
	"backend/internal/handler"
	"backend/internal/middleware"
)

func main() {
	// 1️⃣ connect database
	db.Connect()

	// =====================
	// AUTH
	// =====================
	http.HandleFunc(
		"/api/signup",
		middleware.CORS(handler.SignUp),
	)

	http.HandleFunc(
		"/api/login",
		middleware.CORS(handler.Login),
	)

	http.HandleFunc(
		"/api/protected",
		middleware.CORS(
			middleware.AuthMiddleware(func(w http.ResponseWriter, r *http.Request) {
				w.Write([]byte("Kamu sudah login 🔐"))
			}),
		),
	)

	// =====================
	// MESSAGES
	// =====================
	http.HandleFunc(
		"/api/messages",
		middleware.CORS(
			middleware.AuthMiddleware(func(w http.ResponseWriter, r *http.Request) {
				if r.Method == http.MethodPost {
					handler.CreateMessage(w, r)
					return
				}
				if r.Method == http.MethodGet {
					handler.GetMessages(w, r)
					return
				}
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			}),
		),
	)

	log.Println("Server running at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
