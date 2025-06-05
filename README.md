# 📋 Campaign Builder – React Multi-Step Form

This is a multi-step campaign creation wizard built using React, Tailwind CSS, and Context API. It supports light/dark theme toggle, state persistence with localStorage, toast notifications, and clean navigation using React Router.

---

## 🚀 How to Run the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/asbalate/proem_assignment.git
   cd campaign-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Visit the app**
   Open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 🛠 Tech Stack Decisions

| Technology          | Reason for Choosing                                   |
| ------------------- | ----------------------------------------------------- |
| **React**           | Efficient UI rendering with component reusability     |
| **Vite**            | Ultra-fast dev environment for React projects         |
| **Tailwind CSS**    | Utility-first CSS framework for responsive, clean UI  |
| **React Router**    | Enables step-wise routing and success page navigation |
| **Context API**     | Simple global state management across steps           |
| **LocalStorage**    | Persistence of form state across refreshes            |
| **react-hot-toast** | Lightweight toast notification system                 |

---

## 🌗 Features

- Dark/light theme toggle with persistence
- Step-by-step campaign wizard
- Context-based state handling
- Persistent form state via `localStorage`
- Toast/snackbar notifications for feedback
- Thank You confirmation screen

---

## ⚠️ Known Limitations / Trade-Offs

| Limitation                | Description                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| **No backend/API**        | Form submission is simulated; real API integration is not included                             |
| **Context-only state**    | For simplicity, Redux or form libraries like React Hook Form were not used                     |
| **No validation library** | Field validation is basic; no `yup` or `zod` schema used                                       |
| **URL manipulation**      | User can access step routes directly (e.g., `/step-3`) even if previous steps aren’t completed |

---

## 📁 Folder Structure (Simplified)

```
src/
├── components/       # Form steps and theme toggle
├── context/          # CampaignContext (global state)
├── pages/            # Thank You screen
├── styles/           # Tailwind index.css
├── App.jsx           # main header with steps function setup
└── main.jsx          # Entry point with providers and routing setup
```



---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.
