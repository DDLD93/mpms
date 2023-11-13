# Stage 1: Build the application
FROM golang:1.21 AS builder

WORKDIR /go/src/app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o main
# Stage 2: Create a smaller final image
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /go/src/app/main ./main

EXPOSE 3000

CMD ["./main"]