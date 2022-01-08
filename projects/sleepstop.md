---
name: SleepStop
links:
  github: https://github.com/EmreCenk/car-safety
shortDescription: A hackathon project that detects when a driver is sleeping at the wheel and attempts to wake them up.
tags:
  - Python
  - Hackathon
  - OpenCV
---

# Sleepstop

[Devpost](https://devpost.com/software/car-safety-for-now-placeholder?ref_content=my-projects-tab&ref_feature=my_projects)

A project that detects when a driver is sleeping at the wheel and attempts to wake them up.

## Prizes

Hack the Valley V

- 3rd Place Overall
- Best Hardware Hack

## Getting Started

### Requirements

- A webcam connected to your computer
- Python 3.9 or greater
- If you are on Linux: ffmpeg

### Steps

1. Clone the repository

```
git clone https://github.com/EmreCenk/car-safety.git
```

2. Install the dependencies

```
pip install -r requirements.txt
```

3. Run the project

```
python cli.py
```

NOTE: “CarSafety” is the placeholder name that I am using throughout

## Inspiration

According to the National Sleep Foundation, about half of U.S. adult drivers admit to consistently getting behind the wheel while feeling drowsy. About 20% admit to falling asleep behind the wheel at some point in the past year – with more than 40% admitting this has happened at least once in their driving careers. And a study by the AAA Foundation for Traffic Safety estimated that 328,000 drowsy driving crashes occur annually.

Being drowsy behind the wheel makes a person 3x more likely to be involved in a motor vehicle accident, and driving after going more than 20 hours without sleep is the equivalent of driving with a blood-alcohol concentration of 0.08% - the legal limit.

Seeing all of this, we wanted to create a solution that would save lives, and make roads safer.

## What it does

CarSafety is a system that alerts drivers when they are falling asleep, and contacts emergency services in case of accidents.

The first system we developed is an artificial intelligence procedure that detects when a driver is falling asleep. When it detects that the driver has closed their eyes for a prolonged period, it plays a sound that prompts the driver to wake up, and pull over. The warning sounds are inspired by airplane warning sounds, which are specially designed and chosen for emergency situations. We believe the sudden loud sounds are enough to wake a driver up for long enough to allow them to pull over safely.

The second system we developed is a crash detection system. When an accident is detected, authorities are immediately contacted with the location of the crash.

## How we built it

For the sleep detection system, we used opencv to create an artificial intelligence that looks at the driver’s eyes, and times how long the driver’s eyes have been closed for. When the eyes have been closed for long enough to trigger our system, a sound is played to wake the driver up.

For the crash system, by recognizing when airbags are opened, and/or when the driver has closed their eyes for an elongated period of time, we can determine when a crash has occurred. When a crash is detected, emergency services are contacted via Twilio.

## Challenges we ran into

One of the major problems with this project was that the code ran on a raspberry pi, but almost none of our development environments had Linux installed. As a result, we had to be very careful when testing to make sure everything was cross compatible.

We ran into a challenge when creating an executable. We didn’t make it through.

We tried interacting with smart watches in order to send a vibration to the driver on top of the loud sound. Unfortunately, we had to scrap this idea as making custom interactions with a FitBit proved far too challenging.

## Accomplishments that we're proud of

We are proud that our prototype has such advanced functionality, and that we were able to produce it in a small time-frame.

We are also proud to have a working eye detection system, car crash system, sms alerting, and alarm sounding.

The thing we are most proud of is the potential of this hack to save lives.

## What we learned

While working on Sleep Stop, we learned a lot about working as a team. We had to communicate well to make sure that we weren’t writing conflicting code.

We also learned about how to structure large Python projects, using some of Python’s more advanced features.

Another thing that we had to learn to make this project was cross-platform compatibility in Python. Initially, our project would work on Linux but break on Windows.

We learned how to reliably detect facial features such as closed eyes in Python using OpenCV.

## What's next for Sleep Stop

Right now we have a prototype but in the future it would be beneficial to create a highly-integrated product.

We can also envision working with car manufacturers to make sleep-detection a built-in safety feature.

Finally, we believe stimuli other than loud sounds, such as vibrations, are desirable to ensure the driver wakes up.
