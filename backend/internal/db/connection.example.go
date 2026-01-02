package db

// import (
// 	"database/sql"
// 	"log"

// 	_ "github.com/lib/pq"
// )

// var DB *sql.DB

// func Connect() {
// 	connStr := "postgres://postgres:gantipwdb@localhost:5432/go_react_learn?sslmode=disable"

// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		log.Fatal("sql.Open failed:", err)
// 	}

// 	if err := db.Ping(); err != nil {
// 		log.Fatal("db.Ping failed:", err)
// 	}

// 	DB = db
// 	log.Println("Database connected")
// }
