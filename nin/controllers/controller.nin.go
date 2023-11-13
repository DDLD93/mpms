package controllers

import (
	"context"
	"fmt"
	"time"

	"github.com/ddld93/nin-mock-server/db"
	"github.com/ddld93/nin-mock-server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

type ninController struct{}

var dbCollection *mongo.Collection

func init() {
	db := db.StartMongo().Database("mpms")
	dbCollection = db.Collection("nin")
}

func NewNINController() *ninController {
	return &ninController{}
}

func (*ninController) AddNIN(nin *models.NIN) (*models.NIN, error) {
	nin.CreatedAt = time.Now()
	result, err := dbCollection.InsertOne(context.Background(), nin)
	if err != nil {
		return nil, err
	}
	insertedID := result.InsertedID.(primitive.ObjectID)
	nin.ID = insertedID
	return nin, nil
}

func (*ninController) GetAllNINs() ([]*models.NIN, error) {
	cursor, err := dbCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var nins []*models.NIN
	if err := cursor.All(context.Background(), &nins); err != nil {
		return nil, err
	}
	return nins, nil
}

func (*ninController) GetNINByID(ninID string) (*models.NIN, error) {
	var nin models.NIN
	id, _ := primitive.ObjectIDFromHex(ninID)
	err := dbCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&nin)
	if err != nil {
		return nil, err
	}
	return &nin, nil
}

func (*ninController) GetByNINAndPhone(nin string, phone string) (*models.NIN, error) {
	var profile models.NIN
	filter := bson.M{
		"nin":   nin,
		"phone": phone,
	}
	err := dbCollection.FindOne(context.Background(), filter).Decode(&profile)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no record found")
		} else {
			return nil, err
		}
	}

	return &profile, nil
}
