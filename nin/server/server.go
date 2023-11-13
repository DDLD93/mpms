package server

import (
	"log"
	"net/http"
	"time"

	"github.com/ddld93/nin-mock-server/server/handlers"
	"github.com/ddld93/nin-mock-server/utils"
)

var appPort string

func init() {
	cfg := utils.LoadEvn()
	appPort = cfg.AppPort
}

func Start() {
	srv := &http.Server{
		Handler:      handlers.GetRouter(),
		Addr:         "0.0.0.0:" + appPort,
		WriteTimeout: 5 * time.Second,
		ReadTimeout:  5 * time.Second,
	}

	log.Printf("Server Listening on port: %s", appPort);
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal("Error starting server!")
	}
}
