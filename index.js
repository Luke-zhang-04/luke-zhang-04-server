/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2022 Luke Zhang
 */

const {updateProjectValues} = require("./lib")

exports.handler = async () => {
    console.log("Starting function")

    await updateProjectValues()

    console.log("Process complete. Waiting for Promises to resolve.")

    return 0
}

exports.handler()
