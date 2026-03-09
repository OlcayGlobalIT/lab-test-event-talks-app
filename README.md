# Lab Test Event Talks App

This repository hosts a static website for a 1-day event filled with technical talks, created as part of a lab test.

## Features
- Displays a schedule of technical talks.
- Each talk includes a title, speakers, category, and description.
- Includes a lunch break in the schedule.
- Allows users to search talks by category.

## Technologies
- HTML
- CSS
- JavaScript
- Node.js (for website generation)

## Setup and Running

To view the website locally, ensure you have Node.js and Python installed.

1.  **Generate the `index.html` file:**
    ```bash
    node generate-website.js
    ```
2.  **Serve the `index.html` using a Python HTTP server:**
    ```bash
    python3 -m http.server
    ```
    Then open your browser to `http://localhost:8000`.
