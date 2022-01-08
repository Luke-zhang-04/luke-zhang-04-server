/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2022 Luke Zhang
 */

interface ServiceAccount {
    projectId?: string
    clientEmail?: string
    privateKey?: string
}

interface Content {
    type: "service_account"
    projectId: "luke-zhang"
    privateKeyId: string
    privateKey: string
    clientEmail: string
    clientId: string
    authUri: "https://accounts.google.com/o/oauth2/auth"
    tokenUri: "https://oauth2.googleapis.com/token"
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
    client_x509_cert_url: string
}

declare const content: Content

export default content
