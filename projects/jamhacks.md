---
name: JAMHacks
links:
  github: https://github.com/sjamcsclub/jamhacks-discord-verification
  live: https://jamhacks.ca/
shortDescription: Logistics organizer and developer for Waterloo's largest high school hackathon
tags:
  - TypeScript
  - Web App
  - AWS
  - Oracle Cloud
  - MySQL
  - NGINX
  - Docker
---

# JAMHacks 6

- Organized Waterloo's largest high school hackathon
  - Planned and handed out 6 meals for 200 people for JAMHack's first 36 hour hackathon
  - Dealt with power outage mid event
  - Assisted in many other facets of organizing a hackathon
- Developed Discord verification system which involves sending an email to the user, who recieves a link which they click to verify
  1. The user sends a command to the Discord bot with the email they claim to have used
  2. The bot uses AWS SES to send the email using Mustache templates and Juice to inline CSS
     - The email contains a link to `verify.jamhacks.ca/verify/:data`, where data is essentially a glorified JWT token encoded with `base64-url` and signed with HMAC SHA to ensure the integrity of the data
  3. The user clicks the link in their email
  4. The link data is verified and decoded, and using Mustache templates, a response is rendered from the server
  5. The user's Discord details are added to the database
  6. The Discord service also runs a simple HTTP server locally. A request is given to this server so roles and nickname of the user can be changed, and a DM is sent to the user
  - [github.com/sjamcsclub/jamhacks-discord-verification](https://github.com/sjamcsclub/jamhacks-discord-verification)
