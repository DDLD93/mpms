package handlers

import "net/http"

func SecretHandler(w http.ResponseWriter, r *http.Request) {
	resp := []byte(`{
		"payload":"Secret"
	}`)
	w.Write(resp)
}
