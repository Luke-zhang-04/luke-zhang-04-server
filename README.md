# Luke-zhang-04.github.io Server
Server side code for Luke-zhang-04.github.io

<p align="center">
    <a href="https://aws.amazon.com/"><img src="https://img.shields.io/badge/Deployed%20to-AWS Lambda-%23ec902d?logo=amazon-aws&style=for-the-badge&logoColor=%23ec902d" alt="deployed to AWS"/></a>
    <a href="https://graphql.org/"><img src="https://img.shields.io/badge/Uses-GraphQL-%23ff2fbb?style=for-the-badge&logo=graphql&logoColor=%23ff2fbb" alt="Uses GraphQL"/></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Made%20with-TypeScript-%233178c6?style=for-the-badge&logo=typescript&logoColor=%233178c6" alt="Made with TypeScript"/></a>
</p>

A scheduled function that updates database values in a Firebase Firestore database using version 4 of the GitHub GraphQL API.

[Front end website source](https://github.com/Luke-zhang-04/Luke-zhang-04.github.io)

[Site](https://luke-zhang-04.github.io/)

## updateProjectValues()
This function is executed on a schedule every day on AWS Lamdbda. It reads data from Firebase Firestore, and uses GraphQL and the GitHub API to read data from a GitHub Repository, and compares the certain values. If any values are different, they are writting to Firestore.
