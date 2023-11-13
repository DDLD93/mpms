package middlewares

import (
	"context"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"github.com/google/uuid"
)


func FileUploadMiddleware(next http.Handler, fileKey string) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodPost && r.Header.Get("Content-Type") == "multipart/form-data" {

			file, header, err := r.FormFile(fileKey)
            if err != nil {
                http.Error(w, "File upload is required", http.StatusBadRequest)
                return
            }
            defer file.Close()


			extension := filepath.Ext(header.Filename)
            uuidFileName := uuid.New().String() + extension
            fileName := filepath.Join("./uploads", uuidFileName)


			outFile, err := os.Create(fileName)
            if err != nil {
                http.Error(w, "Failed to create file on server", http.StatusInternalServerError)
                return
            }
            defer outFile.Close()

            _, err = io.Copy(outFile, file)
            if err != nil {
                http.Error(w, "Failed to save file on server", http.StatusInternalServerError)
                return
            }

            r = r.WithContext(context.WithValue(r.Context(), "filePath", fileName))
        }

        next.ServeHTTP(w, r)
    })
}
