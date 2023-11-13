package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ddld93/nin-mock-server/controllers"
	"github.com/ddld93/nin-mock-server/models"
)

func AddNIN(w http.ResponseWriter, r *http.Request) {

	var nin models.NIN
	err := json.NewDecoder(r.Body).Decode(&nin)
	if err != nil {
		response := models.FormatResponse(false, nil, err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
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
