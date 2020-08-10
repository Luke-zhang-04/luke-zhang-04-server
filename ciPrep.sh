#!/bin/bash
# Luke Zhang's developer portfolio
# Copyright Luke Zhang Luke-zhang-04.github.io
# AGPL-3.0 License
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
# 
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

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
