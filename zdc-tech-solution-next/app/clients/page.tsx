import { PageHero } from '@/components/site/PageHero';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ClientsMarquee } from '@/components/site/ClientsMarquee';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clients | ZDC Tech Global Solutions',
  description: 'Our trusted partners and clients around the world.',
  openGraph: {
    title: 'Clients | ZDC Tech Global Solutions',
    description: 'Our trusted partners and clients around the world.',
    url: 'https://zdctechglobalsolutions.com/clients',
  },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Clients"
        title="Trusted by Innovative Companies"
        description="We partner with businesses of all sizes to deliver exceptional digital experiences."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Partnerships"
            title="Global Reach"
            description="We are proud to work with these amazing organizations across various industries."
          />
        </div>
        <ClientsMarquee />
      </section>
    </>
  );
}
