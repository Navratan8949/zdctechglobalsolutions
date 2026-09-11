import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Best IT Company for Software & Web Development',
  description: 'As the best IT company, ZDC Tech Global Solutions provides top-tier website development, mobile apps, software testing, and digital marketing services globally.',
  openGraph: {
    title: 'Our Services | Best IT Company',
    description: 'As the best IT company, ZDC Tech Global Solutions provides top-tier website development, mobile apps, software testing, and digital marketing services globally.',
    url: 'https://zdctechglobalsolutions.com/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
