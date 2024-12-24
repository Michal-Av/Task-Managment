import React, { Suspense } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n"; // Import your i18n instance
import App from "./App"; // Your root component

// Dynamically set the dir attribute of the HTML tag based on the language direction
const setLanguageDirection = (lang: string) => {
  document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
};

// Render the app
const renderApp = () => {
  const container = document.getElementById("root"); // Get the root element
  if (!container) {
    console.error("Root element not found");
    return;
  }
  const root = createRoot(container); // Use createRoot

  root.render(
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
  );
};

// Initial render
renderApp();

// Listen for language change events and update direction accordingly
i18n.on("languageChanged", (lang: string) => {
  setLanguageDirection(lang);
});
