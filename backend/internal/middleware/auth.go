package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"backend/internal/config"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")

		token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			return config.JWTSecret, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// 🔥 AMBIL CLAIMS
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Invalid claims", http.StatusUnauthorized)
			return
		}

		// 🔥 AMBIL ROLE
		role, ok := claims["role"].(string)
		if !ok {
			http.Error(w, "Role not found", http.StatusForbidden)
			return
		}

		// 🔥 SIMPAN ROLE KE CONTEXT
		ctx := context.WithValue(r.Context(), "role", role)
		next(w, r.WithContext(ctx))
	}
}
