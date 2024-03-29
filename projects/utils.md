---
name: Utilities
links:
  github: https://github.com/Luke-zhang-04/utils
shortDescription: My own TS/JS utilities library
tags:
  - TypeScript
  - NodeJS
---

# Utilities

[![Test Coverage](https://api.codeclimate.com/v1/badges/fcd61de6806fd794213c/test_coverage)](https://codeclimate.com/github/Luke-zhang-04/utils/test_coverage)
[![Tests](https://img.shields.io/github/workflow/status/luke-zhang-04/utils/Node.js%20CI?label=tests&logo=github)](https://github.com/Luke-zhang-04/utils/actions/workflows/CI.yml)

Useful utility functions without the bloat of Lodash. Lodash contains many unecessary functions, and have functions which rely on eachother, creating massive bundles even if you only used one function. These utilities are tree-shakeable, independent (some exceptions), pure functions and are built with performance in mind. I use these functions in my own projects.

Even though most of these functions are trivial to write, it becomes annoying to have to write them over and over again, so I put them into a repo that can be installed with a package manager.

Included are also wrappers around existing APIs. For example, the Node Crypto API is hard to use, and requires many steps. The functions in `node/crypto` allow for easy hashing and encryption.
