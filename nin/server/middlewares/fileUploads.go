package middlewares

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

func FileUpload(fileKey string, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost && r.Header.Get("Content-Type") != "multipart/form-data" {
			file, header, err := r.FormFile(fileKey)
			if err != nil {
				http.Error(w, "File upload is required", http.StatusBadRequest)
				return
			}
			defer file.Close()
			extension := filepath.Ext(header.Filename)
			fileName := uuid.New().String() + extension
            fileName = strings.ReplaceAll(fileName, "-", "");
			filePath := filepath.Join("./uploads", fileName);


			outFile, err := os.Create(filePath)
			if err != nil {
                fmt.Println(err)
				http.Error(w, "Failed to create file on server", http.StatusInternalServerError)
				return
			}
			defer outFile.Close()

			_, err = io.Copy(outFile, file)
			if err != nil {
				http.Error(w, "Failed to save file on server", http.StatusInternalServerError)
				return
			}

			r = r.WithContext(context.WithValue(r.Context(), "filePath", filePath));
		}

		next.ServeHTTP(w, r)
	}
}
