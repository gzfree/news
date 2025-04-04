import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/layout/AppBar";
import { BottomNav } from "../components/layout/BottomNav";
import { Button } from "../components/ui/button";
import { Share2, Bookmark } from "lucide-react";

interface NewsDetail {
  id: string;
  title: string;
  content: string;
  time: string;
  source: string;
  author: string;
}

const mockNewsDetail: NewsDetail = {
  id: "1",
  title: "OpenAI 发布 GPT-4 Turbo",
  content: `
    OpenAI 今日发布了 GPT-4 Turbo 模型，这是 GPT-4 的重大升级版本。新版本在多个方面都有显著提升：

    1. 性能提升
    - 响应速度更快
    - 上下文窗口更大
    - 推理能力更强

    2. 新特性
    - 支持多模态输入
    - 更好的代码生成能力
    - 更准确的数学计算

    3. 价格优化
    - 输入成本降低 50%
    - 输出成本降低 25%

    这些改进使得 GPT-4 Turbo 成为目前最强大的语言模型之一。
  `,
  time: "10分钟前",
  source: "科技日报",
  author: "张三",
};

export function NewsDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background">
      <AppBar onBack={() => navigate(-1)} />
      <div className="pt-14 pb-16">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">{mockNewsDetail.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <span>{mockNewsDetail.source}</span>
            <span className="mx-2">·</span>
            <span>{mockNewsDetail.author}</span>
            <span className="mx-2">·</span>
            <span>{mockNewsDetail.time}</span>
          </div>
          <div className="prose max-w-none">
            {mockNewsDetail.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
          <Button>阅读原文</Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
} 