/**
 * Luke Zhang's developer portfolio
 * @copyright Copyright (C) 2020 Luke Zhang
 * @author Luke Zhang Luke-zhang-04.github.io
 * @license AGPL-3.0
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * @file main function for updating project values in database
 * @exports updateProjectValues - function for updating project values
 */
import * as admin from "firebase-admin" /* eslint-disable no-duplicate-imports */
import type {ProjectQuery} from "./github"
import getRepoData from "./github" /* eslint-enable no-duplicate-imports*/
import parseUrl from "url-parse"
import serviceAccount from "../../admin-sdk.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://luke-zhang.firebaseio.com"
})

const db = admin.firestore()

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Structur of project data initially given from Firestore
 */
interface InitialProjectData {
    date: number,
    description: string,
    file: string,
    links: {
        GitHub: string,
        PyPi?: string,
        NPM?: string,
        live?: string,
    },
    tags: string[],
    lang: {
        name: string,
        colour: string,
    },
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Project data with additional information used throughout the project
 */
interface ProjectData extends InitialProjectData {
    name: string,
    collection: string,
}

/**
 * Gets project data from Firestroe
 * @param {string} collection - name of collection to pull data from
 * @returns {Promise.<Array.<ProjectData>>} promise of an array of project data
 */
export const getProjectData = (collection: string): Promise<ProjectData[]> => db
        .collection(collection)
        .get()
        .then((snapshot) => {
            const data: ProjectData[] = []

            snapshot.forEach((doc) => {
                data.push({
                    ...doc.data() as InitialProjectData,
                    name: doc.id,
                    collection,
                })
            })

            return data
        })
        .catch((err: Error) => {
            throw new Error(err.message)
        }),

    /**
     * Asynchronous gets projects from both the collections and projects collections
     * @returns {Promise.<Array.<ProjectData>>} all projects
     */
    getProjects = (): Promise<ProjectData[]> => Promise.all([
        getProjectData("projects"),
        getProjectData("collections")
    ]).then((val) => [...val[0], ...val[1]])
        .catch((err: Error) => {
            throw new Error(err.message)
        }),

    /**
     * Updates a project which has outdated information
     * @param {ProjectQuery} lang - language data from GitHub GQL API
     * @param {ProjectData} project - project data from Firestore
     * @returns {Array.<ProjectData | boolean>} new project data and a boolean if data is changed
     */
    getUpdatedProjectValues = (
        lang: ProjectQuery,
        project: ProjectData,
    ): [ProjectData, boolean] => {
        if (lang.languages.edges[0].node.name === project.lang.name) {
            return [project, false]
        }

        const _lang = lang.languages.edges[0].node,
            newProject = {...project}

        newProject.lang = {
            name: _lang.name,
            colour: _lang.color,
        }

        return [newProject, true]
    },

    /**
     * Update project values to Firestore
     * @param {ProjectData} project - project to change
     * @returns {Promise.<void>} void proise
     */
    updateProjectValue = async (project: ProjectData): Promise<void> => {
        await db.collection(project.collection)
            .doc(project.name)
            .set({
                lang: {
                    name: project.lang.name,
                    colour: project.lang.colour,
                }
            }, {merge: true})

        console.log(`Changed language in project ${project.name} to ${project.lang.name}`)
    }

/**
 * Updates project values that have outdated information in Firestore
 * @returns {Promise.<void>} void promise
 */
const updateProjectValues = async (): Promise<void> => {
    console.log("UPDATING PROJECT VALUES")

    for (const project of await getProjects()) { // Get projects
        const parsed = parseUrl(project.links.GitHub), // eslint-disable-next-line
            projectName = parsed.pathname.split("/")[2],
            repoData = getRepoData(projectName)

        // Update project values after Promise resolution
        Promise.resolve(repoData)
            .then((val) => {
                const [
                    updatedValues,
                    didchange,
                ] = getUpdatedProjectValues(val, project)

                if (didchange) {
                    updateProjectValue(updatedValues)
                }
            })
            .catch((err: Error) => {
                throw new Error(err.message)
            })
    }
}

export default updateProjectValues
