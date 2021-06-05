#!/bin/node --experimental-json-modules
// WARN: requires Node 14+

/**
 * @typedef {import("../src/updateData").InitialProjectData} ProjectData
 */

import admin from "firebase-admin"
import adminSDK from "../admin-sdk.json"
import {fileURLToPath} from "url"
import path from "path"
import {promises as fs} from "fs"
import yaml from "yaml"

admin.initializeApp({
    credential: admin.credential.cert(adminSDK),
    databaseURL: "https://luke-zhang.firebaseio.com",
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @type {typeof import("../src/utils/firebase").snapshotToArray}
 */
export const snapshotToArray = (snapshot) => {
    const arr = []

    snapshot.forEach((doc) => arr.push(doc))

    return arr
}

const projectDescriptions = await Promise.all(
    (
        await fs.readdir(path.join(__dirname, "../projects"))
    ).map((dir) => fs.readFile(path.join(__dirname, "../projects", dir), "utf-8")),
)

const db = admin.firestore()

for (const description of projectDescriptions) {
    const [yamlData, markdown] = description.split("---").slice(1, 3)

    /**
     * @type {{
     *     name: string
     *     data: Pick<ProjectData, "links" | "shortDescription" | "tags">
     * }}
     */
    const {name, ...data} = yaml.parse(yamlData)

    console.log(`Writing data to document ${name}`)

    await db
        .collection("projects")
        .doc(name)
        .set({...data, description: markdown}, {merge: true})

    console.log(`Wrote data to document ${name}`)
}
