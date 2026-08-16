# Greenspires

> **Grow through your words.**

Greenspires is a mobile journaling and self-reflection application that represents personal progress through the growth of a virtual plant. Users choose and name a plant, record reflections, and earn growth points through continued engagement. The project is being developed as a real-world software application that demonstrates the complete software development life cycle.

## Project Overview

Many people want to journal or reflect on their lives but have difficulty remaining consistent. Traditional journals store entries, but they do not always make long-term progress easy to see.

Greenspires addresses this problem by connecting reflection to a visual growth system. Each submitted reflection contributes to the user's plant. As the user continues engaging with the application, the plant earns points and advances through growth stages. Future versions will add persistent journal history, visual plant development, personal milestones, and supportive AI-powered conversations.

Greenspires supports self-reflection and personal growth. It is not a replacement for professional mental health care, medical advice, diagnosis, or emergency assistance.

## Target Users

Greenspires is intended for:

- Students and young adults who want to develop a journaling habit
- People who prefer visual progress over a traditional list of journal entries
- Users who want a calm, private space for reflection
- People interested in tracking goals, milestones, and personal development

## Primary Use Cases

1. A new user selects a plant type and gives the plant a custom name.
2. A returning user opens the application and continues with the previously saved plant.
3. A user submits a reflection and receives a growth point.
4. The application calculates and displays the plant's current growth stage.
5. A user resets the plant and begins the experience again.
6. In a future version, a user reviews saved reflections and growth milestones on a timeline.
7. In a future version, a user receives a supportive AI response to a reflection.

## Current Features

The current prototype includes:

- Three plant choices: Succulent, Fern, and Flower
- Plant selection and custom naming
- Local persistence of the selected plant, name, and growth points
- Reflection entry during the current application session
- A points-based growth system
- Four growth stages: Just Planted, Taking Root, Growing Steadily, and Flourishing
- A settings screen with plant-reset confirmation
- Typed navigation between onboarding, home, and settings screens
- Screenshots and a demonstration recording

## Planned Features

The following features are part of the planned project scope but are not yet complete:

- Persistent storage for journal entries
- A journal-history and growth-timeline screen
- Different plant artwork for each growth stage
- Personal goals and milestone tracking
- Supportive AI-generated responses
- Error handling and recovery messages
- Accessibility improvements
- Automated unit, integration, and system tests

## Technology Stack

| Area | Technology |
| --- | --- |
| Programming language | TypeScript 5.9 |
| Mobile framework | React Native 0.81 |
| Development platform | Expo SDK 54 |
| User interface | React 19 |
| Navigation | React Navigation and Native Stack |
| Local data storage | React Native AsyncStorage |
| Secure device storage | Expo SecureStore |
| Version control | Git and GitHub |
| Package manager | npm |

External libraries and their exact versions are documented in `package.json` and `package-lock.json`.

## Architecture Overview

Greenspires currently uses a modular, layered structure:

- **Presentation layer:** React Native screens display the interface and handle user interactions.
- **Navigation layer:** React Navigation controls movement between onboarding, home, and settings.
- **Domain configuration:** Plant definitions and growth thresholds are stored separately from interface code.
- **Persistence layer:** Storage modules save, load, update, and clear local plant data.

### Current Data Flow

1. `App.tsx` checks local storage when the application starts.
2. A user without a saved plant is sent to onboarding.
3. Onboarding saves the selected plant, custom name, and initial point value.
4. The home screen loads the saved plant and displays its current stage.
5. Submitting a reflection adds one growth point and updates the saved plant.
6. Resetting the plant clears its saved data and returns the user to onboarding.

The current prototype does not use a remote database. Non-sensitive plant information is stored locally with AsyncStorage. Any future production AI integration should protect provider credentials through a server-side API rather than exposing a provider key inside the mobile application.

## Repository Structure

```text
Greenspires/
├── assets/             Application icons and visual assets
├── constants/          Plant definitions and growth-stage rules
├── screens/            Onboarding, home, and settings interfaces
├── screenshots/        Application screenshots and demo recording
├── storage/            Local and secure-storage modules
├── types/              Shared TypeScript navigation types
├── App.tsx             Root navigation and startup logic
├── app.json            Expo application configuration
├── package.json        Dependencies and npm commands
└── README.md           Project and developer documentation
```

## Installation

### Prerequisites

- A current Node.js LTS release
- npm
- Git
- Expo Go on a mobile device, or an Android/iOS simulator

### Setup

```bash
git clone https://github.com/JerrodBolton/Greenspires.git
cd Greenspires
npm install
```

## Running the Application

Start the Expo development server:

```bash
npm start
```

Other available commands:

```bash
npm run android
npm run ios
npm run web
```

After the Expo server starts, follow its instructions to open the application on a device or simulator.

## Testing Status and Plan

The prototype has been manually exercised through its primary onboarding, reflection, growth, settings, and reset flows. An automated test suite has not yet been added.

Testing required before the final submission includes:

- **Unit testing:** Growth-stage calculations and storage functions
- **Integration testing:** Onboarding-to-home data flow and reflection-to-growth updates
- **System testing:** Complete application workflows on supported devices
- **User acceptance testing:** Representative users complete defined tasks and record results
- **Performance testing:** Application startup, navigation, and local-storage behavior

Test cases, results, failures, corrections, and final outcomes will be documented in the software testing report.

## Development Process

The remaining development work will follow an Agile and Unified Process approach:

- Requirements and features will be tracked as backlog items.
- Work will be divided into short development iterations.
- Each iteration will include planning, implementation, testing, and review.
- Git commits will describe the completed change clearly.
- Feature branches and pull requests will be used when appropriate.
- Unified Process artifacts will document inception, elaboration, construction, and transition.

## Required Project Documentation

The final repository is expected to include:

- Project proposal
- System architecture overview
- UML use case diagram
- UML class diagram
- UML sequence diagram
- UML deployment diagram
- Data-storage schema or model
- Software testing report
- Code-review summary
- Agile and Unified Process records
- Final project report
- User manual
- Application screenshots and demonstration video

## Demonstration

Application screenshots and the current demonstration recording are available in the [`screenshots`](screenshots/) directory.,

Application UML Diagram and the current mapping for the project. [`UML Diagram`](screenshots/UML%20Diagram/2026-08-16_13-31-56.tiff)

## Project Status

Greenspires is currently an early working prototype. Plant creation, local plant persistence, reflection entry, growth points, stage calculation, and reset functionality are implemented. Journal persistence, timeline features, visual growth artwork, automated testing, and AI responses remain under development.

## AI Usage Policy

Course policy limits AI assistance to user and developer documentation. All remaining work should follow the instructor's academic-integrity requirements.

## Author

Created by Jerrod Bolton.

## License

This project is available under the [MIT License](LICENSE).
