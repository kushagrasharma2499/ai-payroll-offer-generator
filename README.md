# AI Payroll Offer Letter Generator

A Node.js based automation tool that generates an **Offer Letter Annexure PDF** with salary breakdown and emails it directly to the employee.

This tool calculates payroll components automatically, generates a professional PDF using Puppeteer, and sends it via email using Nodemailer.

---

## Features

* Automatic payroll calculation from CTC
* Generates professional Offer Annexure PDF
* Includes salary structure table
* Company stamp and HR signature in PDF
* Sends the offer letter directly to employee email
* Simple web UI for HR input
* Built using Node.js, Express, Puppeteer, and Nodemailer

---

## Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express.js

**Libraries**

* Puppeteer (PDF generation)
* Nodemailer (Email service)
* Dotenv (Environment variables)
* CORS

---

## Project Structure

```
project
│
├── backend
│   ├── assets
│   │   ├── stamp.png
│   │   └── hr.jpg
│   │
│   ├── emailService.js
│   ├── pdfService.js
│   ├── payrollEngine.js
│   └── server.js
│
├── frontend
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── .env
├── .gitignore
└── README.md
```

---

## Payroll Calculation Logic

The payroll engine calculates the following components from CTC:

| Component         | Formula          |
| ----------------- | ---------------- |
| Basic Salary      | 40% of CTC       |
| HRA               | 50% of Basic     |
| Conveyance        | ₹1600 × 12       |
| Bonus             | 10% of CTC       |
| Special Allowance | Remaining Amount |
| PF                | 12% of Basic     |
| ESI               | 0.75% of Gross   |
| Professional Tax  | ₹2400 yearly     |

Net Take Home = **Gross Salary − Deductions**

---

## Installation

### 1. Clone the Repository

```
git clone https://github.com/yourusername/ai-payroll-offer-generator.git
```

### 2. Install Dependencies

```
npm install
```

### 3. Create Environment File

Create a `.env` file in the project root.

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
```

Note: Use **Google App Password** instead of your real Gmail password.

---

## Running the Project

Start the server:

```
node backend/server.js
```

Open in browser:

```
http://localhost:3000
```

