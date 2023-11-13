package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ddld93/nin-mock-server/controllers"
	"github.com/ddld93/nin-mock-server/models"
)

func GetNIN(w http.ResponseWriter, r *http.Request) {
	nin := models.NIN{}
	
	json.NewDecoder(r.Body).Decode(&nin)

	if nin.NIN == "" || nin.Phone == "" {
		response := models.FormatResponse(false, nil, "NIN and phone parameters are required")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	profile, err := controllers.NewNINController().GetByNINAndPhone(nin.NIN, nin.Phone)
	if err != nil {
		response := models.FormatResponse(false, nil, err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := models.FormatResponse(true, profile, "")
	json.NewEncoder(w).Encode(response)
}
