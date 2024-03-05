package main

import (
	"projek/internal/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Setup route
	handler.SetupRoutes(r)

	r.Run() // listen and serve on 0.0.0.0:8080
}
