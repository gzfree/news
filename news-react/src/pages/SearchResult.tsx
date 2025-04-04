import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppBar } from "../components/layout/AppBar";
import { BottomNav } from "../components/layout/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  time: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "OpenAI 发布 GPT-4 Turbo",
    description: "OpenAI 发布了 GPT-4 Turbo 模型，相比 GPT-4 有显著提升...",
    time: "10分钟前",
  },
  {
    id: "2",
    title: "Google 发布 Gemini Pro",
    description: "Google 发布了 Gemini Pro 模型，支持多模态输入...",
    time: "30分钟前",
  },
  {
    id: "3",
    title: "Meta 发布 Llama 2",
    description: "Meta 发布了 Llama 2 模型，支持商业使用...",
    time: "1小时前",
  },
];

const tabs = [
  { id: "all", label: "全部" },
  { id: "news", label: "新闻" },
  { id: "tech", label: "科技" },
  { id: "ai", label: "AI" },
];

export function SearchResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar showSearch onSearch={handleSearch} onBack={() => navigate(-1)} />
      <div className="pt-14 pb-16">
        <div className="sticky top-14 z-40 bg-background border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-4">
          {searchValue ? (
            <div className="space-y-4">
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-card rounded-lg p-4 shadow-sm"
                  onClick={() => navigate(`/news/${result.id}`)}
                >
                  <h2 className="text-lg font-semibold mb-2">{result.title}</h2>
                  <p className="text-muted-foreground text-sm mb-2">
                    {result.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {result.time}
                    </span>
                    <Button variant="ghost" size="sm">
                      阅读更多
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              请输入搜索关键词
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
} 