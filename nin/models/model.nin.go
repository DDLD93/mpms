package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type NIN struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	FirstName string             `json:"firstName" bson:"firstName"`
	LastName  string             `json:"lastName" bson:"lastName"`
	OtherName string             `json:"otherName" bson:"otherName"`
	Email     string             `json:"email" bson:"email"`
	Gender    string             `json:"gender" bson:"gender"`
	NIN       string             `json:"nin" bson:"nin"`
	Phone     string             `json:"phone" bson:"phone"`
	DOB       string             `json:"dob" bson:"dob"`
	Address   string             `json:"address" bson:"address"`
	City      string             `json:"city" bson:"city"`
	State     string             `json:"state" bson:"state"`
	Pic       string             `json:"pic" bson:"pic"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt"`
}

type customResponse struct {
	Ok      bool        `json:"ok"`
	Data    interface{} `json:"data,omitempty"`
	Message string      `json:"message,omitempty"`
}

func FormatResponse(ok bool, data interface{}, message string) *customResponse {
	return &customResponse{
		Ok:      ok,
		Data:    data,
		Message: message,
	}
}
