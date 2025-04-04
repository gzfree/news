import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/layout/AppBar";
import { BottomNav } from "../components/layout/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  time: string;
}

const mockNews: NewsItem[] = [
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

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppBar title="新闻" />
      <div className="pt-14 pb-16">
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索新闻..."
              className="pl-9"
              onClick={() => navigate("/search")}
              readOnly
            />
          </div>
        </div>
        <div className="space-y-4 px-4">
          {mockNews.map((news) => (
            <div
              key={news.id}
              className="bg-card rounded-lg p-4 shadow-sm"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <h2 className="text-lg font-semibold mb-2">{news.title}</h2>
              <p className="text-muted-foreground text-sm mb-2">
                {news.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{news.time}</span>
                <Button variant="ghost" size="sm">
                  阅读更多
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
} 