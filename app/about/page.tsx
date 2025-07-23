import { Metadata } from "next";
import AboutPageClient from "../../components/pages/AboutPageClient";

const siteUrl = "https://yourdomain.com"; // update to your real domain

export const metadata: Metadata = {
  title: "About | Joshua Biong - Business Analyst",
  description:
    "Learn more about Joshua Biong, a business analyst specializing in DevOps, cybersecurity, and data-driven solutions.",
  keywords: [
    "Joshua Biong",
    "Business Analyst",
    "DevOps",
    "Cybersecurity",
    "Process Improvement",
    "Project Management",
    "Data Analysis",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About | Joshua Biong - Business Analyst",
    description:
      "Learn more about Joshua Biong, a business analyst specializing in DevOps, cybersecurity, and data-driven solutions.",
    url: `${siteUrl}/about`,
    siteName: "Joshua Biong Portfolio",
    type: "profile",
    images: [
      {
        url: `${siteUrl}/og/about.jpg`, // replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "About Joshua Biong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter", // replace
    creator: "@your_twitter", // replace
    title: "About | Joshua Biong - Business Analyst",
    description:
      "Learn more about Joshua Biong, a business analyst specializing in DevOps, cybersecurity, and data-driven solutions.",
    images: [`${siteUrl}/og/about.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  category: "Business",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
