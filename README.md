# Appscrip Task – Product Listing Page (Next.js SSR)

This project is a **Server-Side Rendered (SSR)** product listing page built using **Next.js**.  
It demonstrates clean code structure, responsive design, SEO best practices, and minimal dependency usage, as required by the Appscrip frontend task.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** Pure CSS (No UI libraries)
- **Rendering:** Server Side Rendering (SSR)
- **API:** Fake Store API – https://fakestoreapi.com/
- **Hosting:** Netlify
- **Version Control:** GitHub (Public Repository)

---

## 📌 Features Implemented

### 1️⃣ Server Side Rendering (SSR)
- Products and categories are fetched on the server using async server components.
- Improves SEO and initial page load performance.

### 2️⃣ Responsive Design
- **Desktop:** Sidebar filter with hide/show toggle
- **Tablet & Mobile:** Filter drawer with overlay
- Fully responsive product grid (3 / 2 / 1 columns)

### 3️⃣ Filters & Sorting
- Search (title + description)
- Category filter
- Price range filter
- Minimum rating filter
- Sorting:
  - Recommended (rating + review count)
  - Price (Low → High / High → Low)
  - Rating (High → Low)
  - Most reviewed

### 4️⃣ SEO Optimization
- Page title & meta description
- Proper `H1` and `H2` structure
- JSON-LD Schema (`CollectionPage`)
- SEO-friendly image naming logic
- Alt text for all images
- Minimal DOM structure

### 5️⃣ Accessibility
- Semantic HTML
- Screen-reader friendly text (`sr-only`)
- ARIA labels on interactive elements

---
## 🖥️ Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Appscrip-task-Akabar_Ansari
cd Appscrip-task-Akabar_Ansari
```
### 2. Install dependencies
```bash
npm install
```
### 3. Run the development server
```
npm run dev
```

## Live Demo
[https://chic-puppy-0a9ea3.netlify.app/](https://chic-puppy-0a9ea3.netlify.app/)
