package config

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var JWTSecret = []byte("SUPER_SECRET_JANGAN_COMMIT")

func GenerateToken(userID int, email string, role string) (string, error) {
	claims := jwt.MapClaims{
		"sub":   userID, // standard subject
		"email": email,
		"role":  role,  // 👈 SINGULAR & KONSISTEN
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWTSecret)
}
