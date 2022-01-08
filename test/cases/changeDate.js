/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2022 Luke Zhang
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const {getUpdatedProjectValues} = require("../../lib/updateData")
const assert = require("assert")
const {repo, project} = require("./changeDate.json")

repo.pushedAt = new Date(3).toISOString()

const changeLang = () => {
    context("Change last commit date", () => {
        const [updatedValues, didchange] = getUpdatedProjectValues(repo, project)

        it("Should be true", () => {
            assert.strictEqual(didchange, true)
        })

        it("Should be TypeScript", () => {
            assert.strictEqual(updatedValues.lang.name, "TypeScript")
        })

        it("Should be 3", () => {
            assert.strictEqual(updatedValues.date, 3)
        })
    })
}

exports.default = changeLang
