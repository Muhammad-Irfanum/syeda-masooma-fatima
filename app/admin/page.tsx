import type { Metadata } from "next";
import AdminStudio from "@/components/admin-studio";

export const metadata: Metadata = { title: "Portfolio Studio", robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminStudio />; }
