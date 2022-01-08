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
const {repo, project} = require("./changeLang.json")

repo.pushedAt = new Date(0).toISOString()

const changeLang = () => {
    context("Change repository language", () => {
        const [updatedValues, didchange] = getUpdatedProjectValues(repo, project)

        it("Should be true", () => {
            assert.strictEqual(didchange, true)
        })

        it("Should be Python", () => {
            assert.strictEqual(updatedValues.lang.name, "Python")
        })

        it("Should be 0", () => {
            assert.strictEqual(updatedValues.date, 0)
        })
    })
}

exports.default = changeLang
