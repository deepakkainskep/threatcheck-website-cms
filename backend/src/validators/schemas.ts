import { z } from "zod";
const status = z.enum(["DRAFT", "PUBLISHED"]).optional();
const seo = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();
export const contentBlock = z.object({
  type: z.enum([
    "heading",
    "paragraph",
    "list",
    "image",
    "quote",
    "link",
    "callout",
  ]),
  title: z.string().optional(),
  level: z.number().optional(),
  text: z.string().optional(),
  items: z.array(z.string()).optional(),
  url: z.string().optional(),
  altText: z.string().optional(),
});
export const blogLike = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  role: z.string().optional(),
  date: z.string().optional(),
  readingTime: z.string().optional(),
  image: z.string().optional(),
  content: z.array(contentBlock).optional(),
  tags: z.array(z.string()).optional(),
  status,
  seo,
});
export const caseStudy = z.object({
  title: z.string().min(1),
  company: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  implementation: z.string().optional(),
  results: z
    .array(
      z.object({ metric: z.string().optional(), label: z.string().optional() }),
    )
    .optional(),
  businessImpact: z.string().optional(),
  image: z.string().optional(),
  status,
  seo,
});
export const resource = z.object({
  type: z.string().optional(),
  typeName: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  downloadSize: z.string().optional(),
  fileType: z.string().optional(),
  image: z.string().optional(),
  fileUrl: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  content: z.string().optional(),
  status,
  seo,
});
export const taxonomy = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  logo: z.string().optional(),
  category: z.string().optional(),
  websiteUrl: z.string().optional(),
  status,
  displayOrder: z.number().optional(),
  seo,
});
export const demoRequest = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  size: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().optional(),
  selectedDate: z.string().optional(),
  selectedTime: z.string().optional(),
});
export const contactSubmission = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});
export const login = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(8) }),
});
export const userCreate = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["ADMIN", "SUPERADMIN"]).default("ADMIN"),
    disabled: z.boolean().optional(),
  }),
});
