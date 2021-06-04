/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2021 Luke Zhang
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const {getUpdatedProjectValues} = require("../../lib/updateData"),
    assert = require("assert"),
    {repo, project} = require("./changeNone.json")

repo.pushedAt = new Date(0).toISOString()

const changeNone = () => {
    context("Change nothing", () => {
        const [updatedValues, didchange] = getUpdatedProjectValues(repo, project)

        it("Should be false", () => {
            assert.strictEqual(didchange, false)
        })

        it("Should be Python", () => {
            assert.strictEqual(updatedValues.lang.name, "Python")
        })

        it("Should be 0", () => {
            assert.strictEqual(updatedValues.date, 0)
        })
    })
}

exports.default = changeNone
