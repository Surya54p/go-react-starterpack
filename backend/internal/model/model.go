package main

import "time"

type User struct {
	ID           int
	Name         string
	Email        string
	PasswordHash string
	CreatedAt    time.Time
	role         string
}

type Message struct {
	ID        int
	UserID    int
	Message   string
	CreatedAt time.Time
}
