import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SearchPage } from "./pages/Search";
import { SearchResultPage } from "./pages/SearchResult";
import { NewsDetailPage } from "./pages/NewsDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
