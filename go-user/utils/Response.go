package utils

import (
	"net/http"
	"encoding/json"
	"log"
)

type Response struct {
	Status bool `json:"status"`
	Message string `json:"message"`
	Data interface{} `json:"data"`
}

func HandleSuccessResponse(resp http.ResponseWriter, status int, data interface{}){
	responseData := Response{
		Status:true,
		Message:"Success",
		Data: data,
	}
	resp.Header().Set("Content-Type", "application/json")
	resp.WriteHeader(status)

	err := json.NewEncoder(resp).Encode(responseData)
	if err != nil {
		log.Fatal(err)
	}
}

func HandleErrorResponse(resp http.ResponseWriter, status int, message string){
	responseData := Response{
		Status: false,
		Message: message,
		Data: nil,
	}
	err := json.NewEncoder(resp).Encode(responseData)
	if err != nil {
		log.Fatal(err)
	}
}