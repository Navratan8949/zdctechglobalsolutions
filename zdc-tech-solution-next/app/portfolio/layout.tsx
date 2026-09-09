import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Portfolio',
  description: 'Explore our recent projects and see how we have helped businesses transform their digital presence.',
  openGraph: {
    title: 'Our Portfolio | ZDC Tech Global Solutions',
    description: 'Explore our recent projects and see how we have helped businesses transform their digital presence.',
    url: 'https://zdctechglobalsolutions.com/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
