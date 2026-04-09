# 🍔 ByteMeal

ByteMeal is a modern, high-performance food delivery web application built with **React 19** and **Vite**. It offers a seamless user experience for browsing restaurants, viewing menus, managing a shopping cart, and mock-processing orders, heavily optimized for speed and resilience.

## ✨ Key Features

* **Hybrid API Fallback System**: Integrates with live restaurant APIs using a Vercel Serverless proxy to bypass CORS. If the external API fails or blocks the request, the app instantly and silently falls back to local high-quality mock data, ensuring **100% simulated uptime**.
* **Modern Authentication**: Fully integrated with **Firebase Auth** for secure user Sign Up, Log In, and Profile management. Order history and cart details are tied to the authenticated session.
* **Global State Management**: Uses **Redux Toolkit** to efficiently manage the shopping cart, location data, and user sessions.
* **Smart Data Caching**: Uses **TanStack React Query** to handle API queries, preventing redundant network requests and drastically speeding up navigation.
* **Supercharged Performance**: 
  * Powered by the cutting-edge **React 19 Compiler** for automatic component memoization.
  * Employs smart **Code Splitting (`React.lazy`)** so users only download the JavaScript they need for the current page.
  * Implements **Image Lazy Loading** to improve Largest Contentful Paint (LCP) speeds.
* **Responsive & Beautiful Design**: Styled completely from scratch with **Tailwind CSS v4**, featuring an elegant dark mode and beautiful micro-animations.
* **Contact Support Form**: Fully functioning forms integrated with **Formspree**.

## 💻 Tech Stack

* **Frontend**: React 19, Vite
* **Styling**: Tailwind CSS, Lucide React, React Icons
* **State Management**: Redux Toolkit, React Query
* **Backend Services**: Firebase (Auth), Vercel Serverless Functions
* **Form Handling**: Formspree

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ByteMeals.git
   cd ByteMeals
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file and fill in your Firebase and Formspree credentials:
   ```bash
   cp .env.example .env
   ```
   *Make sure to configure your `VITE_FIREBASE_*` keys and `VITE_FORMSPREE_CONTACT_ID`.*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🌍 Production Deployment (Vercel)

This project is perfectly configured to be deployed on **Vercel**. 
The repository includes a `vercel.json` config and an `api/swiggy.js` serverless function. When deployed to Vercel, this serverless function safely proxies your external requests, completely bypassing browser CORS restrictions.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. **Important:** Go to your Vercel Project Settings > Environment Variables, and add all your `.env` variables there.
4. Deploy!

## 📜 License

This project is open-source and ready for anyone to explore, fork, and build upon.
