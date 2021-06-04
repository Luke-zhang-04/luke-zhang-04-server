/**
 * Luke Zhang's developer portfolio
 *
 * @license BSD-3-Clause
 * @author Luke Zhang Luke-zhang-04.github.io
 * @copyright Copyright (c) 2020 - 2021 Luke Zhang
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const {updateProjectValues} = require("../lib")

if (require.main === module) {
    ;(async () => {
        console.log("Starting function")

        await updateProjectValues()

        console.log("Process complete. Waiting for Promises to resolve.")
    })()
}
