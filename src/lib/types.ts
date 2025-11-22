import type { LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: keyof typeof import('lucide-react');
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description:string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  videoUrl?: string;
};
