# 💰 Expense Report Generator

A professional, responsive **Expense Report Generator** built with **React**. Create, customize, and download beautiful expense reports as PNG images — works perfectly on mobile, tablet, and laptop.

---

## ✨ Features

- 📝 **Custom Report Title** — Set your own report name
- 🏷️ **Category Name** — Add a custom category label
- ➕ **Dynamic Items** — Add/remove expense items with live subtotal
- 📉 **Reductions / Deductions** — Add multiple deductions with custom labels
- 🧮 **Auto Calculation** — Subtotal, reductions, and Final Total calculated automatically
- 📥 **Download as PNG** — Clean, high-resolution (3x) image download
- 📱 **Fully Responsive** — Mobile, tablet, and laptop friendly
- 🎨 **Professional Design** — Dark gradient background with clean white cards

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# 1. Clone the repository or copy the project files
git clone https://github.com/your-username/expense-report-generator.git

# 2. Navigate into the project folder
cd expense-report-generator

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser and go to:
```
http://localhost:5173
```

---

## 🗂️ Project Structure

```
expense-report-generator/
│
├── src/
│   ├── App.jsx               # Root component
│   └── expense-report.jsx    # Main Expense Report component
│
├── public/
│   └── index.html
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| html2canvas | PNG download (loaded from CDN) |
| Vanilla CSS-in-JS | Styling (no external CSS library) |

---

## 📖 How to Use

1. **Enter Report Title** — Type your report name (e.g. "Monthly House Expenses")
2. **Enter Category Name** — e.g. "Category A (Fixed / House Related)"
3. **Add Items** — Click `+ Add Item`, enter item name and amount
4. **Add Reductions** — Click `+ Add Reduction`, enter label and deduction amount
5. **Generate Report** — Click `✦ Generate Report` button
6. **Download** — Click `Download PNG` to save the report as an image

---

## 📐 Responsive Breakpoints

| Screen | Layout |
|---|---|
| Mobile (< 600px) | Single column, compact |
| Tablet (600px–860px) | Two columns, centered |
| Laptop / Desktop (> 860px) | Two columns, max-width 860px, centered |

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

> `html2canvas` is loaded dynamically from CDN on first download click — no installation needed.

---

## 🖼️ PNG Download Notes

- The downloaded PNG uses **solid colors** (not CSS gradients) to ensure crisp, clean output
- Resolution is **3x scale** for sharp quality on all devices
- The Download button itself is **not included** in the downloaded image

---

## 📄 License

This project is open source and free to use.

---

## 🙌 Credits

Built with ❤️ using React + Vite