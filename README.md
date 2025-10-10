# Job Application Tracker Extension

A simple Chrome extension to quickly save job application links directly to a Google Sheet. Never lose track of a job posting again.

## Features

-   **One-Click Saving:** Save job application details without leaving the browser tab.
-   **Essential Data:** Records the Company Name, Job URL, Status ('Applied' or 'Need to Apply'), and a timestamp.
-   **Google Sheets Backend:** Uses a personal Google Sheet as a free and easy-to-manage database.
-   **Simple Interface:** A clean and straightforward UI for quick data entry.

## Tech Stack

-   **Frontend:** Chrome Extension (HTML, CSS, JavaScript)
-   **Backend:** Google Apps Script
-   **Database:** Google Sheets

## Setup Instructions

To get this project running for yourself, you'll need to set up both the Google Sheet backend and the Chrome Extension frontend.

### 1. Google Sheet & Apps Script Setup

1.  **Create a Google Sheet:** Make a new, blank sheet in your Google Drive. You can name the columns if you like (e.g., `Link`, `Status`, `Timestamp`, `Company Name`).
2.  **Open Apps Script:** In your new sheet, go to `Extensions` > `Apps Script`.
3.  **Paste the Script:** Copy the contents of `Code.gs` from this project and paste it into the script editor, replacing any boilerplate code.
4.  **Deploy:**
    -   Click **Deploy** > **New deployment**.
    -   For "Select type," choose **Web app**.
    -   Under "Who has access," select **Anyone** (this is for the script, not your sheet).
    -   Click **Deploy**.
5.  **Copy the URL:** Copy the **Web app URL** provided. You will need it for the next step.

### 2. Chrome Extension Setup

1.  **Add Your URL:** Open the `popup.js` file and paste your Web app URL into the `WEB_APP_URL` constant:
    ```javascript
    const WEB_APP_URL = "[INSTERT_YOUR_WEB_APP_URL_HERE]";
    ```
2.  **Load the Extension:**
    -   Open Chrome and navigate to `chrome://extensions`.
    -   Enable **Developer mode** in the top-right corner.
    -   Click **Load unpacked**.
    -   Select the folder containing your extension files (`popup.html`, `popup.js`, etc.).
3.  **Pin the Extension:** Find the extension in your toolbar and pin it for easy access.

## How to Use

1.  Navigate to a job posting you want to save.
2.  Click the extension icon in your Chrome toolbar.
3.  Enter the company name.
4.  Select the application status ("Applied" is the default).
5.  Click **Save Job** or press **Enter**.
6.  The details will instantly appear as a new row in your Google Sheet!
