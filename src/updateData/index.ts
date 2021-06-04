/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2021 Luke Zhang
 */

import * as admin from "firebase-admin"
import getRepoData, {ProjectQuery} from "./github"
import niceTry from "nice-try"
import parseUrl from "url-parse"
import {snapshotToArray} from "../utils/firebase"

type AdminSDK = typeof import("../../admin-sdk.json").default

/* eslint-disable global-require, @typescript-eslint/no-var-requires */
let serviceAccount = niceTry<AdminSDK>(
    () => require("../../admin-sdk.json") as AdminSDK,
) /* eslint-enable global-require, @typescript-eslint/no-var-requires */

if (serviceAccount === undefined && process.env.ADMIN_SDK) {
    serviceAccount = JSON.parse(process.env.ADMIN_SDK) as AdminSDK
}

if (serviceAccount === undefined) {
    console.error(
        "Invalid Firebase credentials. An attempt to update the database or read from it will fail",
    )
    serviceAccount = {
        type: "service_account",
        projectId: "luke-zhang",
        privateKeyId: "string",
        privateKey: "string",
        clientEmail: "string",
        clientId: "string",
        authUri: "https://accounts.google.com/o/oauth2/auth",
        tokenUri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "string",
    }
}

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://luke-zhang.firebaseio.com",
    })
} catch (error) {
    console.error(
        "Invalid Firebase credentials. An attempt to update the database or read from it will fail",
    )
}

const db = niceTry(() => admin.firestore())

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Structur of project data initially given from Firestore
 */
interface InitialProjectData {
    date: number
    description: string
    file: string
    links: {
        GitHub: string
        PyPi?: string
        NPM?: string
        live?: string
    }
    tags: string[]
    lang: {
        name: string
        colour: string
    }
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Project data with additional information used throughout the project
 */
export interface ProjectData extends InitialProjectData {
    name: string
    collection: string
}

/**
 * Gets project data from Firestroe
 *
 * @param collection - Name of collection to pull data from
 * @returns Promise of an array of project data
 */
export const getProjectData = async (collection: string): Promise<ProjectData[]> => {
    if (!db) {
        throw new Error("db is undefined")
    }

    return snapshotToArray(await db.collection(collection).get()).map((doc) => ({
        ...(doc.data() as InitialProjectData),
        name: doc.id,
        collection,
    }))
}
/**
 * Asynchronous gets projects from both the collections and projects collections
 *
 * @returns All projects
 */
export const getProjects = async (): Promise<ProjectData[]> => {
    const documents = ["projects"]

    return await Promise.all(documents.map((document) => getProjectData(document))).then(
        (projects) => projects.flat(),
    )
}
/**
 * Updates a project which has outdated information
 *
 * @param repo - Language data from GitHub GQL API
 * @param project - Project data from Firestore
 * @returns New project data and a boolean if data is changed
 */
export const getUpdatedProjectValues = (
    repo: ProjectQuery,
    project: ProjectData,
): [data: ProjectData, didChange: boolean] => {
    const pushedAt = new Date(repo.pushedAt).getTime()

    if (repo.languages.edges[0].node.name === project.lang.name && pushedAt === project.date) {
        return [project, false]
    }

    const _lang = repo.languages.edges[0].node
    const newProject = {...project}

    newProject.lang = {
        name: _lang.name,
        colour: _lang.color,
    }

    newProject.date = pushedAt

    const dateMessage =
        project.date === pushedAt
            ? `Date not changed, staying constant at ${pushedAt}`
            : `Date changed from ${project.date} to ${pushedAt}`
    const langMessage =
        project.lang.name === newProject.lang.name
            ? `Langauge not changed, staying constant at ${project.lang.name}`
            : `Language changed from ${project.lang.name} to ${newProject.lang.name}`

    console.table([newProject.name, dateMessage, langMessage])

    return [newProject, true]
}

/**
 * Update project values to Firestore
 *
 * @param project - Project to change
 * @returns Void proise
 */
export const updateProjectValue = async (project: ProjectData): Promise<void> => {
    if (!db) {
        throw new Error("db is undefined")
    }

    await db
        .collection(project.collection)
        .doc(project.name)
        .set(
            {
                lang: {
                    name: project.lang.name,
                    colour: project.lang.colour,
                },
                date: project.date,
            },
            {merge: true},
        )

    console.log(`Changed data in project ${project.name} in Firestore`)
}

/**
 * Updates project values that have outdated information in Firestore
 *
 * @returns Void promise
 */
export const updateProjectValues = async (): Promise<void> => {
    const repoData: Promise<[ProjectQuery, ProjectData]>[] = []

    for (const project of await getProjects()) {
        // Get projects
        console.log(`Reading "${project.name}"`)

        const parsed = parseUrl(project.links.GitHub)
        const projectName = parsed.pathname.split("/")[2]

        repoData.push(getRepoData(projectName, project))
    }

    ;(await Promise.all(repoData)).map(([val, project]) => {
        console.log(`Looking for changes in ${project.name}`)
        const [updatedValues, didChange] = getUpdatedProjectValues(val, project)

        if (didChange) {
            console.log(`Changes found in ${project.name}, updating values`)
            updateProjectValue(updatedValues)
        }
    })
}

export default updateProjectValues
