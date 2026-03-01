# Speech Emotion Recognition (SER) – Demo UI

A simple web UI for a Speech Emotion Recognition mini project: **login page** and **demo page** with a mock emotion predictor.

## What it does

1. **Login** (`index.html`) – Enter any username and password to continue.
2. **Redirect** – After login, you are sent to the demo page.
3. **Demo** (`demo.html`) – Upload an audio file, click **Analyze Emotion** to see a simulated emotion (Neutral, Happy, Sad, etc.) and a small timeline. **Log out** returns to the login page.

## How to run

1. Open `index.html` in your browser (double-click or drag into Chrome/Edge).
2. Log in with any non-empty username and password.
3. Use the demo: select audio → Analyze Emotion → see result.

No server or install needed; it’s static HTML, CSS, and JavaScript.

## Project files

- **index.html** – Login form; redirects to demo after login.
- **demo.html** – Demo UI (upload, analyze, emotion display, timeline).
- **styles.css** – Shared styling for both pages.
- **demo.js** – Demo logic (logout, file input, mock prediction, badges, timeline).

## Note

The “Analyze Emotion” result is **mock** (random). In a full app you would send the audio to a backend that runs a real SER model.
