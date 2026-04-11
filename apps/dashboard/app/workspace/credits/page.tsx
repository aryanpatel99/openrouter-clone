"use client";

import { Info, RefreshCw, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between pb-4 border-b border-border mb-6">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-foreground">Credits</h1>
          <p className="text-muted-foreground mt-1 text-[13px]">
            Personal Account: aryanpatel6215@gmail.com
          </p>
        </div>
        <Button variant="outline" size="icon" className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-card">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-light text-muted-foreground">$</span>
            <span className="text-4xl font-semibold tracking-tight">0.00</span>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Info className="h-5 w-5" />
            <span className="sr-only">Credits info</span>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Buy Credits Card */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Buy Credits</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="crypto-switch" className="text-sm text-muted-foreground cursor-pointer">
                Use crypto
              </Label>
              <Switch id="crypto-switch" />
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium mb-6">
              Add Credits
            </Button>
            
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="flex items-center text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
                View Usage <ExternalLink className="ml-1.5 h-3 w-3" />
              </a>
              <a href="#" className="text-primary/80 hover:text-primary transition-colors underline-offset-4 hover:underline">
                Redeem Promo Code
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Auto Top-Up Card */}
        <Card className="flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Auto Top-Up</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Button variant="outline" className="w-full h-10 font-medium mb-4">
              Add a Payment Method
            </Button>
            <p className="text-sm text-muted-foreground mt-auto">
              To activate auto-top-up, you'll need a payment method that supports offline charging.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Need invoicing? <a href="#" className="text-primary/80 hover:text-primary underline-offset-4 hover:underline">Contact sales</a>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="bg-card">
          <CardContent className="flex h-24 items-center justify-center p-6 text-sm text-muted-foreground">
            No results
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
