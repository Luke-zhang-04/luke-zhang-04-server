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

import * as admin from "firebase-admin"
import getRepoData from "./github"
import parseUrl from "url-parse"
import serviceAccount from "../../admin-sdk.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://luke-zhang.firebaseio.com"
})

const db = admin.firestore()

/* eslint-disable @typescript-eslint/naming-convention */
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

interface ProjectData extends InitialProjectData {
    name: string,
}

const getProjectData = (collection: string): Promise<ProjectData[]> => db
        .collection(collection)
        .get()
        .then((snapshot) => {
            const data: ProjectData[] = []

            snapshot.forEach((doc) => {
                data.push({
                    ...doc.data() as InitialProjectData,
                    name: doc.id,
                })
            })

            return data
        }),
    getProjects = (): Promise<ProjectData[]> => Promise.all([
        getProjectData("projects"),
        getProjectData("collections")
    ]).then((val) => [...val[0], ...val[1]])

export const updateProjectValues = async (): Promise<void> => {
    const data: ProjectData[] = await getProjects()

    for (const project of data) {
        const parsed = parseUrl(project.links.GitHub), // eslint-disable-next-line
            projectName = parsed.pathname.split("/")[2],
            repoData = getRepoData(projectName)

        Promise.resolve(repoData).then((val) => console.log(val))
    }
}
