"use client";

import { useState, useCallback } from "react";
import {
  Info,
  MoreVertical,
  Search,
  KeyRound,
  X,
  Pencil,
  Trash2,
  Ban,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────
interface ApiKey {
  id: string;
  name: string;
  key: string;
  fullKey: string;
  expires: string;
  lastUsed: string;
  usage: string;
  limit: string;
  disabled: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────
function generateKeyId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function generateFullKey(): string {
  const chars = "abcdef0123456789";
  let key = "sk-or-v1-";
  for (let i = 0; i < 48; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

function maskKey(fullKey: string): string {
  return fullKey.slice(0, 12) + "..." + fullKey.slice(-3);
}

function computeExpiry(option: string): string {
  if (option === "no-expiration") return "Never";
  const now = new Date();
  const durations: Record<string, number> = {
    "1-hour": 60 * 60 * 1000,
    "1-day": 24 * 60 * 60 * 1000,
    "7-days": 7 * 24 * 60 * 60 * 1000,
    "30-days": 30 * 24 * 60 * 60 * 1000,
    "90-days": 90 * 24 * 60 * 60 * 1000,
    "180-days": 180 * 24 * 60 * 60 * 1000,
    "1-year": 365 * 24 * 60 * 60 * 1000,
  };
  const ms = durations[option];
  if (!ms) return "Never";
  const expiry = new Date(now.getTime() + ms);
  return expiry.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Initial seed data ───────────────────────────────────────────────
const seedKeys: ApiKey[] = [
  {
    id: "1",
    name: "key2",
    fullKey: "sk-or-v1-8c7a3f1b2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b94",
    key: "sk-or-v1-8c7...b94",
    expires: "Never",
    lastUsed: "Never",
    usage: "$0.000",
    limit: "unlimited",
    disabled: false,
  },
  {
    id: "2",
    name: "key2",
    fullKey: "sk-or-v1-fab9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5822",
    key: "sk-or-v1-fab...822",
    expires: "Never",
    lastUsed: "Never",
    usage: "$0.000",
    limit: "unlimited",
    disabled: false,
  },
  {
    id: "3",
    name: "chatbot key",
    fullKey: "sk-or-v1-732e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e96e",
    key: "sk-or-v1-732...96e",
    expires: "Never",
    lastUsed: "Never",
    usage: "$0.000",
    limit: "unlimited",
    disabled: false,
  },
];

// ─── Tooltip wrapper for Info icons in the form ──────────────────────
function FieldInfo({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button type="button" className="outline-none">
            <Info className="h-3.5 w-3.5 text-muted-foreground opacity-70 hover:opacity-100 transition-opacity cursor-help" />
          </button>
        }
      />
      <TooltipContent
        side="top"
        className="max-w-[260px] text-xs leading-relaxed"
      >
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

// ─── New Key Reveal Dialog ───────────────────────────────────────────
function KeyRevealDialog({
  open,
  onClose,
  fullKey,
}: {
  open: boolean;
  onClose: () => void;
  fullKey: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [fullKey]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border shadow-2xl p-0 gap-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/20">
          <DialogTitle className="text-base font-medium">
            API Key Created
          </DialogTitle>
        </div>
        <div className="px-5 py-6 space-y-4">
          <p className="text-[13px] text-muted-foreground">
            Copy this key now. You won&apos;t be able to see it again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-[12px] font-mono text-foreground break-all select-all">
              {fullKey}
            </code>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border flex justify-end">
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-5 text-[13px] font-medium"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit Key Dialog ─────────────────────────────────────────────────
function EditKeyDialog({
  open,
  onClose,
  apiKey,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  apiKey: ApiKey | null;
  onSave: (id: string, name: string, limit: string) => void;
}) {
  const [editName, setEditName] = useState("");
  const [editLimit, setEditLimit] = useState("");

  // Sync state when apiKey changes
  useState(() => {
    if (apiKey) {
      setEditName(apiKey.name);
      setEditLimit(apiKey.limit === "unlimited" ? "" : apiKey.limit);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-2xl p-0 gap-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/20">
          <DialogTitle className="text-base font-medium">
            Edit API Key
          </DialogTitle>
        </div>
        <div className="px-5 py-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-[13px] text-muted-foreground font-medium">
              Name
            </Label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="h-9 text-[13px] bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-muted-foreground font-medium">
              Credit limit (optional)
            </Label>
            <Input
              value={editLimit}
              onChange={(e) => setEditLimit(e.target.value)}
              placeholder="Leave blank for unlimited"
              className="h-9 text-[13px] bg-background border-border"
            />
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="h-8 px-4 text-[13px]">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (apiKey) {
                onSave(apiKey.id, editName, editLimit || "unlimited");
              }
              onClose();
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-5 text-[13px] font-medium"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Details Dialog ──────────────────────────────────────────────────
function DetailsDialog({
  open,
  onClose,
  apiKey,
}: {
  open: boolean;
  onClose: () => void;
  apiKey: ApiKey | null;
}) {
  if (!apiKey) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-2xl p-0 gap-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/20">
          <DialogTitle className="text-base font-medium">
            Key Details
          </DialogTitle>
        </div>
        <div className="px-5 py-6 space-y-4">
          {[
            { label: "Name", value: apiKey.name },
            { label: "Key", value: apiKey.key },
            { label: "Expires", value: apiKey.expires },
            { label: "Last Used", value: apiKey.lastUsed },
            { label: "Usage", value: apiKey.usage },
            { label: "Limit", value: apiKey.limit },
            {
              label: "Status",
              value: apiKey.disabled ? "Disabled" : "Active",
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">
                {row.label}
              </span>
              <span className="text-[13px] text-foreground font-medium">
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-border flex justify-end">
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-5 text-[13px] font-medium"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirmation Dialog ──────────────────────────────────────
function DeleteDialog({
  open,
  onClose,
  onConfirm,
  keyName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  keyName: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border shadow-2xl p-0 gap-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/20">
          <DialogTitle className="text-base font-medium">
            Delete API Key
          </DialogTitle>
        </div>
        <div className="px-5 py-6">
          <p className="text-[13px] text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="text-foreground font-medium">
              &quot;{keyName}&quot;
            </span>
            ? This action cannot be undone.
          </p>
        </div>
        <div className="px-5 py-4 border-t border-border flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="h-8 px-4 text-[13px]">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="h-8 px-5 text-[13px] font-medium"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────
export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(seedKeys);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Create dialog state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createLimit, setCreateLimit] = useState("");
  const [createReset, setCreateReset] = useState("na");
  const [createExpiry, setCreateExpiry] = useState("no-expiration");

  // Key reveal dialog
  const [revealKey, setRevealKey] = useState<string | null>(null);

  // Edit dialog state
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);

  // Details dialog state
  const [detailsKey, setDetailsKey] = useState<ApiKey | null>(null);

  // Delete dialog state
  const [deletingKey, setDeletingKey] = useState<ApiKey | null>(null);

  // ── Filtered keys ─────────────────────────────────────────────────
  const filteredKeys = keys.filter((k) =>
    k.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Selection helpers ─────────────────────────────────────────────
  const allSelected =
    filteredKeys.length > 0 &&
    filteredKeys.every((k) => selectedIds.has(k.id));
  const someSelected = selectedIds.size > 0;

  const toggleSelectAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredKeys.map((k) => k.id)));
    }
  }, [allSelected, filteredKeys]);

  const toggleSelectOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────
  const handleCreate = useCallback(() => {
    const fullKey = generateFullKey();
    const newKey: ApiKey = {
      id: generateKeyId(),
      name: createName || "Untitled Key",
      fullKey,
      key: maskKey(fullKey),
      expires: computeExpiry(createExpiry),
      lastUsed: "Never",
      usage: "$0.000",
      limit: createLimit ? `$${createLimit}` : "unlimited",
      disabled: false,
    };
    setKeys((prev) => [newKey, ...prev]);
    setIsCreateOpen(false);
    setRevealKey(fullKey);
    // Reset form
    setCreateName("");
    setCreateLimit("");
    setCreateReset("na");
    setCreateExpiry("no-expiration");
  }, [createName, createLimit, createExpiry]);

  const handleDelete = useCallback((id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const handleToggleDisable = useCallback((id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, disabled: !k.disabled } : k))
    );
  }, []);

  const handleEditSave = useCallback(
    (id: string, name: string, limit: string) => {
      setKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, name, limit } : k))
      );
    },
    []
  );

  // ── Bulk helpers ───────────────────────────────────────────────────
  const allSelectedDisabled =
    someSelected &&
    keys
      .filter((k) => selectedIds.has(k.id))
      .every((k) => k.disabled);

  // ── Bulk handlers ─────────────────────────────────────────────────
  const handleBulkDelete = useCallback(() => {
    setKeys((prev) => prev.filter((k) => !selectedIds.has(k.id)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleBulkToggleDisable = useCallback(() => {
    const shouldEnable = allSelectedDisabled;
    setKeys((prev) =>
      prev.map((k) =>
        selectedIds.has(k.id)
          ? { ...k, disabled: !shouldEnable }
          : k
      )
    );
    setSelectedIds(new Set());
  }, [selectedIds, allSelectedDisabled]);

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-5xl space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="pb-4 border-b border-border mb-6">
          <h1 className="text-xl font-medium tracking-tight text-foreground">
            API Keys
          </h1>
          <p className="text-muted-foreground mt-1 text-[13px]">
            Create and manage your API keys.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center text-[13px] text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-md border border-white/5">
            <KeyRound className="mr-2 h-3.5 w-3.5" />
            <span>Manage your keys to access all models</span>
            <HoverCard>
              <HoverCardTrigger
                render={
                  <button type="button" className="outline-none">
                    <Info className="ml-2 h-3.5 w-3.5 opacity-70 hover:opacity-100 transition-opacity cursor-help" />
                  </button>
                }
              />
              <HoverCardContent
                side="bottom"
                align="start"
                sideOffset={8}
                className="w-[280px] p-3.5 text-[13px] leading-relaxed bg-popover border-border shadow-xl rounded-lg"
              >
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Apps can{" "}
                    <span className="text-primary font-medium">
                      create keys for you
                    </span>
                    , or you can create them yourself.
                  </p>
                  <p>
                    &quot;Limit&quot; tells you how many credits the key is
                    allowed to use.
                  </p>
                  <p>
                    To add credits to your account, go to{" "}
                    <Link
                      href="/workspace/credits"
                      className="text-primary font-medium hover:underline underline-offset-2"
                    >
                      the credits page
                    </Link>
                    .
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-2.5">
            {/* Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-8 h-8 w-full bg-background border-border text-[13px] rounded-md shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Create button */}
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-8 px-4 bg-primary hover:bg-primary/90 text-[13px] text-primary-foreground font-medium rounded-md shadow-sm"
            >
              Create
            </Button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {someSelected && (
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="text-[13px] text-muted-foreground">
              {selectedIds.size} key{selectedIds.size !== 1 ? "s" : ""} selected
            </span>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-[12px]"
                onClick={handleBulkToggleDisable}
              >
                <Ban className="mr-1.5 h-3 w-3" />
                {allSelectedDisabled ? "Enable" : "Disable"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-7 px-3 text-[12px]"
                onClick={handleBulkDelete}
              >
                <Trash2 className="mr-1.5 h-3 w-3" />
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[12px] text-muted-foreground"
                onClick={() => setSelectedIds(new Set())}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <Card className="border-border shadow-sm bg-card rounded-lg overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="w-10 text-center">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={() => toggleSelectAll()}
                      className="mx-auto border-white/20"
                    />
                  </TableHead>
                  <TableHead className="text-[12px] font-medium text-muted-foreground">
                    Key
                  </TableHead>
                  <TableHead className="text-[12px] font-medium text-muted-foreground w-32">
                    Expires
                  </TableHead>
                  <TableHead className="text-[12px] font-medium text-muted-foreground w-32">
                    Last Used
                  </TableHead>
                  <TableHead className="text-[12px] font-medium text-muted-foreground w-32">
                    Usage
                  </TableHead>
                  <TableHead className="text-[12px] font-medium text-muted-foreground w-32">
                    Limit
                  </TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeys.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-[13px] text-muted-foreground"
                    >
                      {searchQuery
                        ? "No keys matching your search."
                        : "No API keys yet. Create one to get started."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredKeys.map((item) => (
                    <TableRow
                      key={item.id}
                      className={`group border-border hover:bg-muted/30 ${
                        item.disabled ? "opacity-50" : ""
                      } ${selectedIds.has(item.id) ? "bg-muted/20" : ""}`}
                    >
                      <TableCell className="w-10 text-center py-2.5">
                        <Checkbox
                          checked={selectedIds.has(item.id)}
                          onCheckedChange={() => toggleSelectOne(item.id)}
                          className="mx-auto border-white/20 cursor-pointer"
                        />
                      </TableCell>
                      <TableCell className="py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[13px] text-foreground">
                            {item.name}
                          </span>
                          {item.disabled && (
                            <Badge
                              variant="outline"
                              className="text-[10px] text-yellow-500 border-yellow-500/30 bg-yellow-500/10 py-0 h-4 rounded-sm"
                            >
                              Disabled
                            </Badge>
                          )}
                        </div>
                        <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                          {item.key}
                        </div>
                      </TableCell>
                      <TableCell className="text-[13px] text-muted-foreground py-2.5">
                        {item.expires}
                      </TableCell>
                      <TableCell className="text-[13px] text-muted-foreground py-2.5">
                        {item.lastUsed}
                      </TableCell>
                      <TableCell className="text-[13px] font-medium text-foreground py-2.5">
                        {item.usage}
                      </TableCell>
                      <TableCell className="text-[13px] text-muted-foreground py-2.5">
                        <div className="flex items-center gap-2">
                          {item.limit}
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase font-semibold text-muted-foreground py-0 h-4 border-white/10 rounded-sm bg-muted/40"
                          >
                            Total
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-2.5">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className="inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground outline-none cursor-pointer"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">Open menu</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="min-w-[160px]"
                          >
                            <DropdownMenuItem
                              onClick={() => setDetailsKey(item)}
                              className="text-[13px] cursor-pointer"
                            >
                              <FileText className="mr-2 h-3.5 w-3.5" />
                              Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingKey(item);
                              }}
                              className="text-[13px] cursor-pointer"
                            >
                              <Pencil className="mr-2 h-3.5 w-3.5" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleDisable(item.id)}
                              className="text-[13px] cursor-pointer"
                            >
                              <Ban className="mr-2 h-3.5 w-3.5" />
                              {item.disabled ? "Enable" : "Disable"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => setDeletingKey(item)}
                              className="text-[13px] cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-3.5 w-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ── Create Key Dialog ──────────────────────────────────────── */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-2xl p-0 gap-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <DialogTitle className="text-base font-medium">
                Create API Key
              </DialogTitle>
            </div>
            <div className="px-5 py-6 space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label className="text-[13px] text-muted-foreground font-medium">
                    Name
                  </Label>
                  <FieldInfo text="Choose a clear and descriptive name." />
                </div>
                <Input
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder='e.g. "Chatbot Key"'
                  className="h-9 text-[13px] bg-background border-border"
                />
              </div>

              {/* Credit limit */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label className="text-[13px] text-muted-foreground font-medium">
                    Credit limit (optional)
                  </Label>
                  <FieldInfo text="Once the credits (in $USD) consumed by this API key sum to this amount or more, it will no longer work. Leave blank for no limit." />
                </div>
                <Input
                  value={createLimit}
                  onChange={(e) => setCreateLimit(e.target.value)}
                  placeholder="Leave blank for unlimited"
                  className="h-9 text-[13px] bg-background border-border"
                />
              </div>

              {/* Reset limit */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label className="text-[13px] text-muted-foreground font-medium">
                    Reset limit every...
                  </Label>
                  <FieldInfo text="Once the credits (in $USD) consumed by this API key sum to this amount or more, it will no longer work. Leave blank for no limit." />
                </div>
                <Select value={createReset} onValueChange={(v) => setCreateReset(v ?? "na")}>
                  <SelectTrigger className="h-9 text-[13px] bg-background border-border">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">N/A</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Expiration */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label className="text-[13px] text-muted-foreground font-medium">
                    Expiration
                  </Label>
                  <FieldInfo text='Choose when this API key should expire. Select "No expiration" for a key that never expires.' />
                </div>
                <Select value={createExpiry} onValueChange={(v) => setCreateExpiry(v ?? "no-expiration")}>
                  <SelectTrigger className="h-9 text-[13px] bg-background border-border">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-expiration">No expiration</SelectItem>
                    <SelectItem value="1-hour">1 hour</SelectItem>
                    <SelectItem value="1-day">1 day</SelectItem>
                    <SelectItem value="7-days">7 days</SelectItem>
                    <SelectItem value="30-days">30 days</SelectItem>
                    <SelectItem value="90-days">90 days</SelectItem>
                    <SelectItem value="180-days">180 days</SelectItem>
                    <SelectItem value="1-year">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-border flex justify-end">
              <Button
                onClick={handleCreate}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-5 text-[13px] font-medium"
              >
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Key Reveal Dialog ──────────────────────────────────────── */}
        <KeyRevealDialog
          open={!!revealKey}
          onClose={() => setRevealKey(null)}
          fullKey={revealKey || ""}
        />

        {/* ── Edit Dialog ────────────────────────────────────────────── */}
        <EditKeyDialog
          open={!!editingKey}
          onClose={() => setEditingKey(null)}
          apiKey={editingKey}
          onSave={handleEditSave}
        />

        {/* ── Details Dialog ─────────────────────────────────────────── */}
        <DetailsDialog
          open={!!detailsKey}
          onClose={() => setDetailsKey(null)}
          apiKey={detailsKey}
        />

        {/* ── Delete Confirmation Dialog ──────────────────────────────── */}
        <DeleteDialog
          open={!!deletingKey}
          onClose={() => setDeletingKey(null)}
          onConfirm={() => {
            if (deletingKey) handleDelete(deletingKey.id);
          }}
          keyName={deletingKey?.name || ""}
        />
      </div>
    </TooltipProvider>
  );
}
