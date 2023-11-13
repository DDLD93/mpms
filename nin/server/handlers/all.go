package handlers

import (
	"github.com/ddld93/nin-mock-server/server/middlewares"
	"github.com/gorilla/mux"
)

func GetRouter() *mux.Router {
	api := mux.NewRouter()
	api.Use(middlewares.JsonMiddleware)


	api.HandleFunc("/api/v1/nin/fetch", GetNIN).Methods("POST")
	api.HandleFunc("/api/v1/nin", AddNIN).Methods("POST")
	return api
}
