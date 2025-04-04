import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "首页" },
    { path: "/search", icon: Search, label: "搜索" },
    { path: "/profile", icon: User, label: "我的" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 