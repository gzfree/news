import React from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AppBarProps {
  title?: string;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  onBack?: () => void;
}

export function AppBar({
  title = "新闻",
  showSearch = false,
  onSearch,
  onBack,
}: AppBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="flex h-14 items-center px-4">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={onBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </Button>
        )}
        {showSearch ? (
          <div className="flex-1 flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索新闻..."
                className="pl-9"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <h1 className="text-lg font-semibold">{title}</h1>
        )}
      </div>
    </div>
  );
} 