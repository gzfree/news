import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface AppBarProps {
  title?: string
  showSearch?: boolean
  onSearch?: (value: string) => void
  onBack?: () => void
}

export function AppBar({ title, showSearch, onSearch, onBack }: AppBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-primary text-primary-foreground flex items-center px-4 shadow-sm z-50">
      {onBack && (
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
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
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Button>
      )}
      
      {showSearch ? (
        <div className="flex-1 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="搜索"
              className="pl-9 bg-background/20 border-0 focus-visible:ring-0"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <h1 className="text-lg font-semibold">{title}</h1>
      )}
    </div>
  )
} 