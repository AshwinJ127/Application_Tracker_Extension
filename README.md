# Job Tracker Extension

A Chrome extension that saves job applications to a Google Sheet in one click. Captures the current tab URL automatically, stores the job description, and uploads your resume to Google Drive — deduplicating by file hash so the same resume is not uploaded twice.

## What gets saved

Each entry adds a row to your sheet with:

| Column | Source |
|---|---|
| Company | You type it |
| Link | Auto-captured from active tab |
| Status | Applied / Need to Apply |
| Job Description | Pasted into the popup |
| Resume Link | Google Drive URL of the uploaded file |
| Date | Auto-set at save time |

---

## Setup

### 1. Google Apps Script (backend)

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Go to **Extensions → Apps Script**.
3. Delete any existing code and paste the contents of `Code.gs`.
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and copy the web app URL.

### 2. Wire up the extension

Open `popup.js` and replace the placeholder at the top:

```js
const WEB_APP_URL = "YOUR_WEB_APP_URL_HERE";
```

Paste the URL you copied in step 5.

### 3. Load the extension in Chrome

1. Go to `chrome://extensions`.
2. Enable **Developer mode** (top right toggle).
3. Click **Load unpacked** and select the `job-tracker-extension` folder.

---

## Usage

1. Navigate to a job listing page.
2. Open the popup: **Cmd+Shift+J** (Mac) / **Ctrl+Shift+J** (Windows/Linux), or click the extension icon.
3. Fill in:
   - **Company Name** — required
   - **Status** — Applied or Need to Apply
   - **Job Description** — paste the full JD text (optional)
   - **Resume** — attach the PDF/file you are using for this application (optional)
4. Click **Save Job** or press **Enter**.

The row is written to your sheet instantly. If you attach a resume you have used before, the extension reuses the existing Drive link instead of uploading a duplicate.

---

## Resume deduplication

When a resume is attached, the extension computes a SHA-256 hash of the file content before uploading. On the Apps Script side, each uploaded file stores that hash in its Drive description field. Before uploading, it scans the `Job Tracker Resumes` folder for a file with a matching hash — if found, it links to that file instead of creating a new one.

---

## File structure

```
job-tracker-extension/
  manifest.json   — Chrome extension config (MV3), declares permissions and keyboard shortcut
  popup.html      — Extension UI
  popup.js        — Handles form input, file hashing, and POST to Apps Script
  Code.gs         — Apps Script web app: writes to Sheets, manages Drive uploads
```

