#!/bin/bash

if [ ! -f ./github.json ]; then
    printf "{\n\t\"token\": \"TOKEN\"\n}\n" > github.json
else
    echo "File exists"
fi

if [ ! -f ./admin-sdk.json ]; then
    printf "{\n    \"type\": \"service_account\",\n    \"projectId\": \"luke-zhang\",\n    \"privateKeyId\": \"string\",\n    \"privateKey\": \"string\",\n    \"clientEmail\": \"string\",\n    \"clientId\": \"string\",\n    \"authUri\": \"https://accounts.google.com/o/oauth2/auth\",\n    \"tokenUri\": \"https://oauth2.googleapis.com/token\",\n    \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n    \"client_x509_cert_url\": \"string\"\n}\n" > admin-sdk.json
else
    echo "File exists"
fi
