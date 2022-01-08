/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2022 Luke Zhang
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const changeLang = require("./cases/changeLang").default
const changeDate = require("./cases/changeDate").default
const changeNone = require("./cases/changeNone").default
const changeBoth = require("./cases/changeBoth").default

describe("Change repo data", () => {
    changeLang()
    changeDate()
    changeNone()
    changeBoth()
})
