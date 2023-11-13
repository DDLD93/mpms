package handlers

import "net/http"

func RootHandler(w http.ResponseWriter, r *http.Request) {
	resp := []byte(`{
		"api":"USSD API Gateway",
		"version":"1.0.0",
		"writtenBy":"Khalil Mohammed Shams <shamskhalil@gmail.com>",
		"year":"2023",
	}`)
	w.Write(resp)
}
