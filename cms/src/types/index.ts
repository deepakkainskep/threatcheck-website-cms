export type Role = "SUPERADMIN" | "ADMIN";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  disabled?: boolean;
  lastLoginAt?: string;
  createdAt?: string;
}

export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface ContentBlock {
  type: "heading" | "paragraph" | "list" | "image" | "quote" | "link" | "callout";
  title?: string;
  level?: number;
  text?: string;
  items?: string[];
  url?: string;
  altText?: string;
}

export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface ContentItem {
  _id?: string;
  slug?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  excerpt?: string;
  description?: string;
  category?: string;
  author?: string;
  role?: string;
  date?: string;
  readingTime?: string;
  image?: string;
  logo?: string;
  content?: ContentBlock[];
  tags?: string[];
  status?: ContentStatus;
  displayOrder?: number;
  websiteUrl?: string;
  company?: string;
  industry?: string;
  size?: string;
  challenge?: string;
  solution?: string;
  implementation?: string;
  results?: Array<{ metric?: string; label?: string }>;
  businessImpact?: string;
  downloadSize?: string;
  fileType?: string;
  fileUrl?: string;
  highlights?: string[];
  seo?: SeoMetadata;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaItem {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  bucket: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
