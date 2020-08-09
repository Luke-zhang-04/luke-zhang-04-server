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
import * as admin from "firebase-admin"
import {Octokit} from "@octokit/core"
import serviceAccount from "../admin-sdk.json"
import {token} from "../github.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://luke-zhang.firebaseio.com"
})

const db = admin.firestore(),
    octokit = new Octokit({auth: token});

(async (): Promise<void> => {
    const {repository} = await octokit.graphql(
        `
        {
            repository(owner: "Luke-zhang-04", name: "DeStagnate") {
                name
                languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                        node {
                            name
                            color
                        }
                    }
                }
            }
        }
        `,
    )

    console.log(JSON.stringify(repository))
})()
