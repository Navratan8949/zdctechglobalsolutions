"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

// A curated list of common icons for better performance instead of loading 5000+ icons
const commonIcons = [
  "Globe", "Smartphone", "Code2", "Palette", "ShoppingCart", "Megaphone", "Search",
  "Cloud", "Lightbulb", "HeartPulse", "GraduationCap", "Landmark", "Building2",
  "Factory", "Truck", "Home", "Cpu", "Layout", "Server", "Database", "ClipboardList",
  "ShieldCheck", "Rocket", "LifeBuoy", "Award", "Users", "Heart", "BookOpen",
  "BadgeCheck", "Clock", "MessageSquare", "TrendingUp", "CheckCircle2", "Star",
  "Settings", "User", "Mail", "Phone", "MapPin", "Camera", "Video", "Music",
  "Monitor", "Laptop", "Wifi", "Battery", "Activity", "Zap", "Key", "Lock",
  "Unlock", "Eye", "EyeOff", "ThumbsUp", "Briefcase", "Coffee", "Compass",
  "CreditCard", "DollarSign", "FileText", "Folder", "Gift", "Headphones", "Image",
  "Inbox", "Link", "List", "Menu", "MoreHorizontal", "MoreVertical", "Paperclip",
  "PenTool", "PieChart", "Play", "Plus", "Minus", "X", "Check", "ChevronDown",
  "ChevronUp", "ChevronLeft", "ChevronRight", "ArrowRight", "ArrowLeft"
];

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Handle custom typed values that might not be in the common list
  const displayIcons = search
    ? Object.keys(Icons).filter(
        (key) => key.toLowerCase().includes(search.toLowerCase()) && key !== "createLucideIcon" && key !== "default"
      ).slice(0, 50) // Limit to 50 results to prevent lag
    : commonIcons;

  const SelectedIcon = (Icons as any)[value] || Icons.Circle;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-start border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-normal"
        >
          <SelectedIcon className="mr-2 h-4 w-4" />
          {value || "Select an icon..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2 bg-slate-900 border-white/10 text-white" align="start">
        <div className="flex items-center border-b border-white/10 pb-2 mb-2 px-1">
          <Search className="mr-2 h-4 w-4 opacity-50" />
          <input
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/50"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="h-64">
          <div className="grid grid-cols-5 gap-2 p-1">
            {displayIcons.map((iconName) => {
              const IconComp = (Icons as any)[iconName];
              if (!IconComp) return null;
              
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => {
                    onChange(iconName);
                    setIsOpen(false);
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border hover:bg-white/10 transition-colors ${
                    value === iconName ? "border-primary bg-primary/20" : "border-transparent"
                  }`}
                  title={iconName}
                >
                  <IconComp className="h-5 w-5" />
                </button>
              );
            })}
          </div>
          {displayIcons.length === 0 && (
            <p className="text-center text-sm text-white/50 py-4">No icons found.</p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
