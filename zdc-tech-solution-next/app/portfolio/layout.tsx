import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Portfolio | Best IT Company Projects",
  description:
    "Explore the portfolio of the best IT company. See our recent success stories in website development, mobile apps, custom software, and digital marketing.",
  openGraph: {
    title: "Our Portfolio | Best IT Company Projects",
    description:
      "Explore the portfolio of the best IT company. See our recent success stories in website development, mobile apps, custom software, and digital marketing.",
    url: "https://zdctechglobalsolutions.com/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
