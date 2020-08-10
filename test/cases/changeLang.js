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
/* eslint-disable @typescript-eslint/no-var-requires */
const {getUpdatedProjectValues} = require("../../lib/updateData"),
    assert = require("assert")

const repo = {
        name: "my-repo-1",
        languages: {
            edges: [
                {
                    node: {
                        name: "Python",
                        color: "#3572A5",
                    },
                },
            ],
        },
        pushedAt: new Date(0).toISOString()
    },
    project = {
        date: 0,
        description: "My repo 1",
        file: "myRepo.svg",
        links: {
            GitHub: "https://github.com/"
        },
        tags: [],
        lang: {
            name: "TypeScript",
            colour: "#2b7489",
        },
        name: "my-repo-1",
        collection: "projects",
    },

    changeLang = () => {
        context("Change repository language", () => {
            const [
                updatedValues,
                didchange,
            ] = getUpdatedProjectValues(repo, project)

            it("Should be true", () => {
                assert.strictEqual(
                    didchange,
                    true,
                )
            })

            it("Should be Python", () => {
                assert.strictEqual(
                    updatedValues.lang.name,
                    "Python",
                )
            })

            it("Should be 0", () => {
                assert.strictEqual(
                    updatedValues.date,
                    0,
                )
            })
        })
    }

exports.default = changeLang
