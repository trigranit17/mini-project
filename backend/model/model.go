package model

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Nama     string `gorm:"size:255;not null"`
	Email    string `gorm:"size:255;not null;unique"`
	Password string `gorm:"size:255;not null"`
	Role     string `gorm:"size:50;not null"`
}

type Quiz struct {
	gorm.Model
	Judul        string    `gorm:"size:255;not null"`
	Deskripsi    string    `gorm:"type:text"`
	WaktuMulai   time.Time `gorm:"not null"`
	WaktuSelesai time.Time `gorm:"not null"`
	Pertanyaans  []Pertanyaan
}

type Pertanyaan struct {
	gorm.Model
	Pertanyaan   string `gorm:"type:text;not null"`
	OpsiJawaban  string `gorm:"type:text;not null"`
	JawabanBenar int    `gorm:"not null"`
	QuizID       uint
}

type JawabanPeserta struct {
	gorm.Model
	UserID        uint `gorm:"not null"`
	QuizID        uint `gorm:"not null"`
	PertanyaanID  uint `gorm:"not null"`
	JawabanPeserta int   `gorm:"not null"`
	Skor          int
}
