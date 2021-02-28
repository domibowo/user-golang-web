package controller

import (
	"user/models"
	"user/services"
	"user/utils"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
)

type UserController struct {
	userService services.UserService
}

func CreateUserController(r *mux.Router, userService services.UserService){
	userController := UserController{userService}

	r.HandleFunc("/user", userController.getAllUsers).Methods(http.MethodGet)
	s := r.PathPrefix("/user").Subrouter()
	s.HandleFunc("/form", userController.insertNewUser).Methods(http.MethodPost)
	s.HandleFunc("/form", userController.updateUser).Methods(http.MethodPut)
	s.HandleFunc("/{id}", userController.getUserByID).Methods(http.MethodGet)

}

func (u UserController) insertNewUser(resp http.ResponseWriter, req *http.Request){
	var user models.User
	err := json.NewDecoder(req.Body).Decode(&user)
	if err != nil {
		log.Fatal(err)
	}
	response, err := u.userService.InsertNewUser(&user)
	if err != nil {
		log.Fatal(err)
	}
	utils.HandleSuccessResponse(resp,http.StatusOK,response)
}

func (u UserController) updateUser(resp http.ResponseWriter, req *http.Request){

	var user models.User
	err := json.NewDecoder(req.Body).Decode(&user)
	if err != nil {
		log.Fatal(err)
	}

	response,err := u.userService.UpdateUser(&user)
	if err != nil {
		log.Fatal(err)
	}

	utils.HandleSuccessResponse(resp, http.StatusOK, response)
}

func (u UserController) getAllUsers(resp http.ResponseWriter, req *http.Request){
	users,err := u.userService.GetAllUsers()
	if err != nil {
		log.Fatal(err)
	}
	utils.HandleSuccessResponse(resp, http.StatusOK, users)
}

func (u UserController) getUserByID(resp http.ResponseWriter, req *http.Request){
	params := mux.Vars(req)
	id := params["id"]

	user,err := u.userService.GetUserByID(id)
	if err != nil {
		log.Fatal(err)
	}

	utils.HandleSuccessResponse(resp, http.StatusOK, user)
}