package middlewares

import (
	"net/http"
)

func JsonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		// log.Println("[ Json Middleware Called ]")
		next.ServeHTTP(w, r)
	})
}
