package config

import (
	"user/models"
	"gorm.io/gorm"
)

func Migration(db *gorm.DB) {
	
	db.AutoMigrate(
		&models.User{},
	)
}