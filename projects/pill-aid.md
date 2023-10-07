---
name: Pill-Aid
links:
  github: https://github.com/Luke-zhang-04/Pill-aid
shortDescription: A pill dispenser that simplifies routine medicine-taking
tags:
  - Typescript
  - React
  - Firebase
  - Arduino
  - Raspberry Pi
  - Python
---

# Pill-Aid

Our idea is to create a pill dispenser that simplifies routine medicine-taking. Using our complimentary interface, the user can input the types of medicine they need to take, the dosage, and the time(s) at which they need to take them. Then, at the specified time(s), the dispenser will notify the user using an alarm. After confirming the user’s identity through facial recognition, it will release all of the pills as needed.

## Architecture

Using GPIO serial communication over a few wires attached to some pins soldered onto the Raspberry PI, we were able to relay information from a remote database to the Arduino microcontroller. The Arduino was responsible for running all motors, LCD display, and speaker, and a frontend made with IBM Carbon Design interacted with a database. All that was hooked together with a polling CRON job on the Raspberry PI.

![arch](https://github.com/Luke-zhang-04/Pill-aid/raw/master/media/arch.jpg)
