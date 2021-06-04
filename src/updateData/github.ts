/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2021 Luke Zhang
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
    token = (JSON.parse(process.env.GITHUB_TOKEN) as Token).token
    /* eslint-enable prefer-destructuring */
}

if (token === undefined) {
    console.error(
        "Invalid GitHub credentials. An attempt to make a query with the GitHub API will fail.",
    )
}

/* eslint-enable global-require, @typescript-eslint/no-unsafe-return, no-sync, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

export interface ProjectQuery {
    name: string
    languages: {
        edges: {
            node: {
                name: string
                color: string
            }
        }[]
    }
    pushedAt: string
}

interface PreQuery {
    repository: ProjectQuery
}

const octokit = new Octokit({auth: token}),
    getRepoData = async (
        name: string,
        project: ProjectData,
    ): Promise<[ProjectQuery, ProjectData]> => {
        if (projectQuery === undefined) {
            throw new Error("File ./gql/project.gql returned undefined")
        }

        const {repository} = (await octokit.graphql(projectQuery, {
            name,
        })) as PreQuery

        return [repository, project]
    }

export default getRepoData
