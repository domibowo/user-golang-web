package services

import (
	"user/models"
)

type UserService interface {
	InsertNewUser(user *models.User)(*models.User, error)
	UpdateUser(id string, user *models.User)(*models.User, error)
	GetAllUsers()(*[]models.User, error)
	GetUserByID(id string)(*models.User, error)
}