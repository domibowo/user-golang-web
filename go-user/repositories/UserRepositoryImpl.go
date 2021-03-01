package repositories

import (
	"user/models"
	"gorm.io/gorm"
	"log"
)

type UserRepositoryImpl struct {
	db *gorm.DB
}

func CreateUserRepository(db *gorm.DB) UserRepository {
	return &UserRepositoryImpl{db}
}

func (u UserRepositoryImpl) InsertNewUser(user *models.User) (*models.User, error) {
	err := u.db.Create(&user).Error
	if err != nil {
		log.Fatal(err)
	}
	return user, err
}

func (u UserRepositoryImpl) GetAllUsers()(*[]models.User, error) {
	var users []models.User
	err := u.db.Find(&users).Error
	if err != nil {
		log.Fatal(err)
	}
	return &users, err
}

func (u UserRepositoryImpl) UpdateUser(id string,user *models.User) (*models.User,error){
	err := u.db.Model(&user).Where("id = ?",id).Updates(user).Error
	if err!=nil {
		log.Fatal(err)
	}
	return user,err
}

func (u UserRepositoryImpl) GetUserByID(id string) (*models.User,error){
	var user models.User
	err := u.db.First(&user, "id = ?", id).Error

	if err!=nil {
		log.Fatal(err)
	}
	return &user,err
}