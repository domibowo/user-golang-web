package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID string `json:"id"`
	Name string `gorm:"not null" json:"name"`
	BirthDate string `gorm:"not null" json:"birth_date"`
	IdentityNumber string `gorm:"not null size:16 unique" json:"identity_number"`
	Job string `json:"job" gorm:"not null"`
	Education string `json:"education" gorm:"not null"`
}

func (u User) TableName() string {
	return "user"
}

func (c *User) BeforeCreate(db *gorm.DB) (err error) {
	c.ID = uuid.New().String()
	return err
}