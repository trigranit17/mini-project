package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"projek/model"
)

func CreateQuiz(c *gin.Context) {
	var newQuiz model.Quiz

	// Bind JSON dari request ke struct newQuiz
	if err := c.ShouldBindJSON(&newQuiz); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Simpan newQuiz ke database
	if err := model.DB.Create(&newQuiz).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Quiz created successfully!", "quiz": newQuiz})
}

func GetQuestionsByQuiz(c *gin.Context) {
	var questions []model.Pertanyaan
	quizID := c.Param("id")

	// Temukan pertanyaan berdasarkan id_quiz
	if err := model.DB.Where("quiz_id = ?", quizID).Find(&questions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"questions": questions})
}

func SubmitAnswers(c *gin.Context) {
	var submittedAnswers []model.JawabanPeserta
	var totalScore int

	// Bind JSON dari request ke slice submittedAnswers
	if err := c.ShouldBindJSON(&submittedAnswers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Iterasi melalui submittedAnswers untuk menyimpan dan menghitung skor
	for _, answer := range submittedAnswers {
		var correctAnswer model.Pertanyaan
		model.DB.First(&correctAnswer, answer.PertanyaanID)

		// Cek apakah jawaban benar
		if answer.JawabanPeserta == correctAnswer.JawabanBenar {
			// Misal skor untuk setiap jawaban benar adalah 10
			totalScore += 10
			answer.Skor = 10
		} else {
			answer.Skor = 0
		}

		// Simpan jawaban peserta
		if err := model.DB.Create(&answer).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Answers submitted successfully!", "total_score": totalScore})
}
