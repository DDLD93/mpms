package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/ddld93/nin-mock-server/controllers"
	"github.com/ddld93/nin-mock-server/models"
	"github.com/gorilla/schema"
)

var decoder = schema.NewDecoder()

func AddNIN(w http.ResponseWriter, r *http.Request) {
	var nin models.NIN
	err := r.ParseForm()
	if err != nil {
		fmt.Println(err)
	}

	// r.PostForm is a map of our POST form values
	err = decoder.Decode(&nin, r.PostForm)
	if err != nil {
		// Handle error
	}

	res, err := controllers.NewNINController().AddNIN(&nin)
	if err != nil {
		response := models.FormatResponse(false, nil, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := models.FormatResponse(true, res, "")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}
