"use client";

import * as React from "react";
import { Search, Bell, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b border-transparent px-8 py-4 backdrop-blur-md flex items-center justify-between",
        isScrolled ? "bg-background/80 border-white/5 py-3 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="flex items-center w-max max-w-lg px-4 py-2 rounded-xl bg-white/5 border border-white/5 group focus-within:border-primary/30 transition-all">
        <Search className="w-5 h-5 text-muted-foreground mr-3" />
        <input
          type="text"
          placeholder="Search models, keys, or logs..."
          className="bg-transparent border-none outline-none text-sm w-64 text-foreground placeholder-muted-foreground focus:ring-0"
        />
        <div className="ml-4 px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-white/5">
          cmd + k
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Moon className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-semibold">Alex Rivera</span>
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Premium Plan</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent/50 p-[1px] shadow-[0_0_15px_rgba(201,168,78,0.2)]">
            <div className="w-full h-full rounded-[10px] bg-secondary flex items-center justify-center overflow-hidden">
               <User className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
