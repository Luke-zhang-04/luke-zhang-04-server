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

/**
 *
 * @param {unknown} data
 * @returns {data is Pick<ProjectData, "links" | "shortDescription" | "tags"> & {name: string, ignore?: boolean}}
 */
const isValidProject = (data) => {
    if (typeof data !== "object" || data === null) {
        throw new Error(`data must be an object, got ${typeof data}`)
    } else if (typeof data.name !== "string") {
        throw new Error(`data.name should be a string, got ${typeof data.name}`)
    } else if (typeof data.ignore !== "undefined" && typeof data.ignore !== "boolean") {
        throw new Error(`data.ignore should be a boolean or undefined, got ${typeof data.ignore}`)
    } else if (typeof data.links !== "object" || data.links === null) {
        throw new Error(`data.links should be an object, got ${typeof data.links}`)
    } else if (!(data.tags instanceof Array)) {
        throw new Error(`data.tags should be an array, got ${typeof data.tas}`)
    }

    return true
}

const db = admin.firestore()

for (const description of projectDescriptions) {
    const [rawYamlData, markdown] = description.split("---").slice(1, 3)

    const yamlData = yaml.parse(rawYamlData)

    if (isValidProject(yamlData)) {
        const {name, ignore: shouldIgnore, ...data} = yamlData

        if (shouldIgnore) {
            console.log(`Ignoring project ${name}`)
        } else {
            console.log(`Writing data to document ${name}`)

            await db
                .collection("projects")
                .doc(name)
                .set({...data, description: markdown}, {merge: true})

            console.log(`Wrote data to document ${name}`)
        }
    }
}
