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
 * @file usage of the GitHub API to get GitHub repo data
 * @exports getRepoData - gets repository data
 */

import {Octokit} from "@octokit/core"
import type {ProjectData} from "."
import fs from "fs"
import niceTry from "nice-try"

declare type Token = typeof import("../../github.json").default

/* eslint-disable global-require, @typescript-eslint/no-unsafe-return, no-sync, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires */
let token = niceTry<string>(() => (require("../../github.json") as Token).token)
const projectQuery = niceTry(() => fs.readFileSync("./gql/project.gql", "utf-8"))

if (projectQuery === undefined) {
    throw new Error("File ./gql/project.gql returned undefined")
}

if (token === undefined && process.env.GITHUB_TOKEN) {
    /* eslint-disable prefer-destructuring */
    token = (JSON.parse(process.env.GITHUB_TOKEN) as Token).token /* eslint-enable prefer-destructuring */
}

if (token === undefined) {
    console.error("Invalid GitHub credentials. An attempt to make a query with the GitHub API will fail.")
}

/* eslint-enable global-require, @typescript-eslint/no-unsafe-return, no-sync, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

export interface ProjectQuery {
    name: string,
    languages: {
        edges: {
            node: {
                name: string,
                color: string,
            },
        }[],
    },
    pushedAt: string,
}

interface PreQuery {
    repository: ProjectQuery,
}

const octokit = new Octokit({auth: token}),
    getRepoData = async (
        name: string,
        project: ProjectData,
    ): Promise<[ProjectQuery, ProjectData]> => {
        if (projectQuery === undefined) {
            throw new Error("File ./gql/project.gql returned undefined")
        }
        
        const {repository} = await octokit.graphql(projectQuery, {
            name,
        }) as PreQuery

        return [repository, project]
    }

export default getRepoData
