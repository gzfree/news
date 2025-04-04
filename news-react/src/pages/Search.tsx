import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/layout/AppBar";
import { BottomNav } from "../components/layout/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Clock } from "lucide-react";

interface SearchSuggestion {
  id: string;
  title: string;
  type: "recent" | "popular";
}

const mockSuggestions: SearchSuggestion[] = [
  { id: "1", title: "OpenAI", type: "recent" },
  { id: "2", title: "GPT-4", type: "recent" },
  { id: "3", title: "AI 新闻", type: "popular" },
  { id: "4", title: "科技动态", type: "popular" },
];

export function SearchPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchValue(suggestion.title);
    setShowSuggestions(false);
    navigate(`/search-result?q=${encodeURIComponent(suggestion.title)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar showSearch onSearch={handleSearch} />
      <div className="pt-14 pb-16">
        {showSuggestions && (
          <div className="px-4 py-2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                最近搜索
              </h3>
              <div className="space-y-2">
                {mockSuggestions
                  .filter((s) => s.type === "recent")
                  .map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {suggestion.title}
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                热门搜索
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockSuggestions
                  .filter((s) => s.type === "popular")
                  .map((suggestion) => (
                    <Button
                      key={suggestion.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.title}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
} 