import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'The terms and conditions for using ZDC Tech Global Solutions services and website.',
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms and Conditions"
        description="Last updated: October 15, 2024"
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:text-white prose-a:text-primary">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the website and services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
            </p>

            <h2>3. User Representations</h2>
            <p>
              By using the website, you represent and warrant that:
            </p>
            <ul>
              <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            </ul>

            <h2>4. Prohibited Activities</h2>
            <p>
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>

            <h2>5. Modifications and Interruptions</h2>
            <p>
              We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Services without notice at any time.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of the jurisdiction in which our company is registered. ZDC Tech Global Solutions and yourself irrevocably consent that the courts of that jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>

            <h2>7. Contact Information</h2>
            <p>
              For any questions or concerns regarding these terms, please contact us at legal@zdctechglobalsolutions.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
