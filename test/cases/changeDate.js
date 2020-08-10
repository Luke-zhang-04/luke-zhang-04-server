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
    assert = require("assert"),
    {repo, project} = require("./changeDate.json")

repo.pushedAt = new Date(3).toISOString()

const changeLang = () => {
    context("Change last commit date", () => {
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

        it("Should be TypeScript", () => {
            assert.strictEqual(
                updatedValues.lang.name,
                "TypeScript",
            )
        })

        it("Should be 3", () => {
            assert.strictEqual(
                updatedValues.date,
                3,
            )
        })
    })
}

exports.default = changeLang
