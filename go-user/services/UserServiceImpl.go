package services

import (
	"user/models"
	"user/repositories"
)

type UserServiceImpl struct {
	userRepositories repositories.UserRepository
}

func CreateUserService(userRepositories repositories.UserRepository) UserService {
	return &UserServiceImpl{userRepositories}
}

func (u UserServiceImpl) InsertNewUser(user *models.User)(*models.User, error){
	return (u.userRepositories.InsertNewUser(user))
}

func (u UserServiceImpl) UpdateUser(id string, user *models.User)(*models.User, error){
	return u.userRepositories.UpdateUser(id,user)
}

func (u UserServiceImpl) GetUserByID(id string)(*models.User, error){
	return u.userRepositories.GetUserByID(id)
}

func (u UserServiceImpl) GetAllUsers()(*[]models.User, error){
	return u.userRepositories.GetAllUsers()
}

