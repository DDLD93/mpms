package utils

import (
	// "log"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	// "github.com/joho/godotenv"
)

type Config struct {
	AppPort      string
	MongoURI     string
}

func LoadEvn() *Config {
	if err := godotenv.Load("../.env"); err != nil {
		fmt.Printf("error loading env file >> %s", err.Error())
	}
	cfg := &Config{
		AppPort:      os.Getenv("APP_PORT"),
		MongoURI:     os.Getenv("APP_MONGO_URI"),
	}
	return cfg
}
