"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import {
  CircleUser,
  User,
  Settings,
  LogOut,
  Shield,
  Palette,
  Bell,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { signOut, useSession } from "~/lib/auth-client";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

interface UserDropdownProps {
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export default function UserDropdown({
  className,
  align = "end",
  side = "bottom",
}: UserDropdownProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Get user initials for avatar fallback
  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error("Failed to logout: " + ctx.error.message);
          },
        },
      });
    } catch (error) {
      toast.error("An error occurred during logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Show loading state
  if (isPending) {
    return (
      <div className={cn("flex items-center", className)}>
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  // Don't render if no session
  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative h-10 w-auto rounded-full px-2 hover:bg-muted/50 transition-colors",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 ring-2 ring-background shadow-sm">
              <AvatarImage
                src={user.image || ""}
                alt={user.name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            {/* User info - hidden on mobile */}
            <div className="hidden sm:flex flex-col items-start min-w-0">
              <span className="text-sm font-medium truncate max-w-[120px]">
                {user.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {user.email}
              </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align={align} side={side}>
        {/* User Info Header */}
        <div className="px-4 py-3 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-background">
              <AvatarImage
                src={user.image || ""}
                alt={user.name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleNavigation("/dashboard/profile")}
        >
          <User className="mr-3 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleNavigation("/dashboard/settings")}
        >
          <Settings className="mr-3 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleNavigation("/dashboard/billing")}
        >
          <CreditCard className="mr-3 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleNavigation("/customize")}
        >
          <Palette className="mr-3 h-4 w-4" />
          <span>Customizer</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleNavigation("/dashboard/notifications")}
        >
          <Bell className="mr-3 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleNavigation("/help")}
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          className="cursor-pointer focus:bg-destructive/10 text-destructive focus:text-destructive"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
