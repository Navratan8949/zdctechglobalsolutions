import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Our refund policy for services provided by ZDC Tech Global Solutions.',
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Refund Policy"
        description="Last updated: October 15, 2024"
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:text-white prose-a:text-primary">
            <h2>1. General Policy</h2>
            <p>
              At ZDC Tech Global Solutions, we strive to ensure our clients are completely satisfied with the digital solutions and services we provide. Due to the custom nature of software development, web design, and digital marketing services, our refund policy is structured to be fair to both our clients and our team's time and effort.
            </p>

            <h2>2. Development Services</h2>
            <p>
              For custom software, mobile app, and web development projects, we typically work on a milestone-based payment schedule.
            </p>
            <ul>
              <li><strong>Initial Deposit:</strong> The upfront deposit required to begin a project is generally non-refundable once work has commenced and resources have been allocated.</li>
              <li><strong>Milestone Payments:</strong> Once a milestone is completed and approved by the client, the payment for that milestone is non-refundable.</li>
              <li><strong>Project Cancellation:</strong> If a project is cancelled by the client before completion, the client is responsible for paying for all work completed up to the date of cancellation. Any unearned portion of a deposit may be refunded at our discretion.</li>
            </ul>

            <h2>3. Digital Marketing and SEO Services</h2>
            <p>
              Digital marketing and SEO services are billed on a monthly retainer basis.
            </p>
            <ul>
              <li>Monthly retainers are non-refundable once the month's work has commenced.</li>
              <li>Clients may cancel their retainer agreement with a 30-day written notice, as outlined in their specific service agreement.</li>
            </ul>

            <h2>4. Consulting Services</h2>
            <p>
              Fees paid for IT consulting, strategy sessions, and discovery workshops are non-refundable once the service has been delivered or the session has occurred.
            </p>

            <h2>5. Exceptional Circumstances</h2>
            <p>
              We understand that exceptional circumstances can occur. We review refund requests on a case-by-case basis and reserve the right to issue a refund or credit at our sole discretion if we determine it is warranted.
            </p>

            <h2>6. How to Request a Refund</h2>
            <p>
              To request a refund or discuss a billing issue, please contact your project manager directly or email our billing department at billing@zdctechglobalsolutions.com. Please include your project details and the reason for your request.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
