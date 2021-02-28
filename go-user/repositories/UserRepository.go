package repositories

import (
	"user/models"
)

type UserRepository interface {
	InsertNewUser(user *models.User)(*models.User,error)
	UpdateUser(user *models.User)(*models.User,error)
	GetAllUsers()(*[]models.User, error)
	GetUserByID(id string) (*models.User, error)
}