"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { Separator } from "~/components/ui/separator";
import {
  SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "Users | Admin Dashboard",
  description: "Manage users in the admin dashboard",
};
export default function AdminUsers() {
  return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6"></div>;
}
