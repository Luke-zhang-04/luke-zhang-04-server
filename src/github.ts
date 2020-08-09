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
 */

import {Octokit} from "@octokit/core"
import fs from "fs"
import niceTry from "nice-try"
import {token} from "../github.json"

interface ProjectQuery {
    name: string,
    languages: {
        edges: {
            node: string,
            colour: string,
        }[],
    },
}

interface PreQuery {
    repository: ProjectQuery,
}

/* eslint-disable no-sync, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
let projectQuery = niceTry(() => fs.readFileSync("../gql/project.gql", "utf-8"))

if (projectQuery === undefined) {
    projectQuery = niceTry(() => fs.readFileSync("./gql/project.gql", "utf-8")) 
}
/* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

if (projectQuery === undefined) {
    throw new Error("File ./gql/project.gql returned undefined")
}

const octokit = new Octokit({auth: token}),
    getRepoData = async (name: string): Promise<ProjectQuery> => {
        if (projectQuery === undefined) {
            throw new Error("File ./gql/project.gql returned undefined")
        }
        
        const {repository} = await octokit.graphql(projectQuery, {
            name,
        }) as PreQuery

        return repository
    }

export default getRepoData
