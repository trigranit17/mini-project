package handler

import (
	"projek/model"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

func SetupRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.POST("/login", login)
		api.POST("/register", register)
		api.POST("/quiz", CreateQuiz)
		api.GET("/quiz/questions/:id", GetQuestionsByQuiz)
		api.POST("/quiz/submit", SubmitAnswers)
		// Tambahkan route lainnya di sini
	}
}

func register(c *gin.Context) {
	var newUser model.User
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
		return
	}
	newUser.Password = string(hashedPassword)

	if result := model.DB.Create(&newUser); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}

func login(c *gin.Context) {
	var loginUser model.User
	var foundUser model.User

	if err := c.BindJSON(&loginUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	if result := model.DB.Where("username = ?", loginUser.Nama).First(&foundUser); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Login failed"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(loginUser.Password)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Login failed"})
		return
	}

	token, err := GenerateToken(foundUser.Nama)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
