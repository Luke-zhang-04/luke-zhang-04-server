/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2021 Luke Zhang
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const {getUpdatedProjectValues} = require("../../lib/updateData")
const assert = require("assert")
const {repo, project} = require("./changeBoth.json")

repo.pushedAt = new Date(3).toISOString()

const changeNone = () => {
    context("Change repository language and last commit date", () => {
        const [updatedValues, didchange] = getUpdatedProjectValues(repo, project)

        it("Should be false", () => {
            assert.strictEqual(didchange, true)
        })

        it("Should be Python", () => {
            assert.strictEqual(updatedValues.lang.name, "TypeScript")
        })

        it("Should be 0", () => {
            assert.strictEqual(updatedValues.date, 3)
        })
    })
}

exports.default = changeNone
