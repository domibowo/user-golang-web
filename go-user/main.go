package main

import (
	"user/config"
	"github.com/spf13/viper"
	"log"
	"github.com/gin-gonic/gin"
	"net/http"
	"github.com/gorilla/mux"
	"user/repositories"
	"user/services"
	"user/controller"
)

func main() {
	viper.AutomaticEnv()
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal(err)
	}

	db := config.Connect()

	config.Migration(db)
	gin.SetMode(gin.ReleaseMode)

	router := mux.NewRouter().StrictSlash(true)
	port := viper.GetString("port")

	userRepo := repositories.CreateUserRepository(db)
	userService := services.CreateUserService(userRepo)
	controller.CreateUserController(router,userService)

	err = http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Fatal(err)
	}
	
}