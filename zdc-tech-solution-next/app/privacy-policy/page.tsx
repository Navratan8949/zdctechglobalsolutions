import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy outlines how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: October 15, 2024"
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:text-white prose-a:text-primary">
            <h2>1. Introduction</h2>
            <p>
              At ZDC Tech Global Solutions, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you 
              visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2>2. The Data We Collect About You</h2>
            <p>
              Personal data, or personal information, means any information about an individual from 
              which that person can be identified. We may collect, use, store and transfer different 
              kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>

            <h2>3. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2>5. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@zdctechglobalsolutions.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
