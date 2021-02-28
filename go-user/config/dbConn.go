package config

import (
	"fmt"
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"log"
	"gorm.io/gorm"
)

type DataSource struct {
	User string
	Pass string
	Host string
	Name string
	Port string
}

func Connect() *gorm.DB {
	DB := DataSource{
		User: viper.GetString("DB_USER"),
		Pass: viper.GetString("DB_PASSWORD"),
		Host: viper.GetString("DB_HOST"),
		Name: viper.GetString("DB_NAME"),
		Port: viper.GetString("DB_PORT"),
	}

	conn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=true&loc=Local", DB.User, DB.Pass, DB.Host, DB.Port, DB.Name)

	db,err := gorm.Open(mysql.Open(conn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	return db
}