import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "~/lib/site";

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mt-2">
            Last updated: April 15, 2025
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Introduction</h2>
          <p>
            Welcome to {siteConfig.name} ("we," "our," or "us"). By accessing or
            using our document and image editing platform (the "Service"), you
            agree to be bound by these Terms of Service ("Terms"). If you
            disagree with any part of the Terms, you may not access the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Accounts</h2>
          <p>
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password. You agree not to disclose your password to any third
            party. You must notify us immediately upon becoming aware of any
            breach of security or unauthorized use of your account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Subscription and Billing
          </h2>
          <p>
            Some parts of the Service are billed on a subscription basis. You
            will be billed in advance on a recurring and periodic basis
            ("Billing Cycle"). Billing cycles are set on a monthly or annual
            basis, depending on the type of subscription plan you select when
            purchasing a subscription.
          </p>
          <p>
            At the end of each Billing Cycle, your subscription will
            automatically renew under the exact same conditions unless you
            cancel it or we cancel it. You may cancel your subscription renewal
            either through your online account management page or by contacting
            our customer support team.
          </p>
          <p>
            A valid payment method, including credit card, is required to
            process the payment for your subscription. You shall provide us with
            accurate and complete billing information including full name,
            address, state, zip code, telephone number, and valid payment method
            information. By submitting such payment information, you
            automatically authorize us to charge all subscription fees incurred
            through your account to any such payment instruments.
          </p>
          <p>
            Should automatic billing fail to occur for any reason, we will issue
            an electronic invoice indicating that you must proceed manually,
            within a certain deadline date, with the full payment corresponding
            to the billing period as indicated on the invoice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Free Trial</h2>
          <p>
            We may, at our sole discretion, offer a subscription with a free
            trial for a limited period of time.
          </p>
          <p>
            You may be required to enter your billing information in order to
            sign up for the free trial. If you do enter your billing information
            when signing up for a free trial, you will not be charged by us
            until the free trial has expired. On the last day of the free trial
            period, unless you cancelled your subscription, you will be
            automatically charged the applicable subscription fee for the type
            of subscription you have selected.
          </p>
          <p>
            At any time and without notice, we reserve the right to (i) modify
            the terms and conditions of the free trial offer, or (ii) cancel
            such free trial offer.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Intellectual Property
          </h2>
          <p>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of {siteConfig.name} and
            its licensors. The Service is protected by copyright, trademark, and
            other laws of both the United States and foreign countries. Our
            trademarks and trade dress may not be used in connection with any
            product or service without the prior written consent of{" "}
            {siteConfig.name}.
          </p>
          <p>
            You retain all rights to your content. By uploading content to our
            Service, you grant us a worldwide, non-exclusive, royalty-free
            license to use, reproduce, adapt, publish, and distribute such
            content solely for the purpose of providing the Service to you. This
            license ends when you delete your content or your account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">User Content</h2>
          <p>
            Our Service allows you to upload, edit, store, share, and otherwise
            make available certain information, text, graphics, videos, or other
            material ("User Content"). You are responsible for the User Content
            that you post on or through the Service, including its legality,
            reliability, and appropriateness.
          </p>
          <p>
            By posting User Content on or through the Service, you represent and
            warrant that: (i) the User Content is yours (you own it) or you have
            the right to use it and grant us the rights and license as provided
            in these Terms, and (ii) the posting of your User Content on or
            through the Service does not violate the privacy rights, publicity
            rights, copyrights, contract rights or any other rights of any
            person.
          </p>
          <p>
            We reserve the right to terminate the account of any user found to
            be infringing on a copyright.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Limitation of Liability
          </h2>
          <p>
            In no event shall {siteConfig.name}, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from (i) your access to or use
            of or inability to access or use the Service; (ii) any conduct or
            content of any third party on the Service; (iii) any content
            obtained from the Service; and (iv) unauthorized access, use or
            alteration of your transmissions or content, whether based on
            warranty, contract, tort (including negligence) or any other legal
            theory, whether or not we have been informed of the possibility of
            such damage, and even if a remedy set forth herein is found to have
            failed of its essential purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is
            provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
            provided without warranties of any kind, whether express or implied,
            including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement
            or course of performance.
          </p>
          <p>
            {siteConfig.name}, its subsidiaries, affiliates, and its licensors
            do not warrant that a) the Service will function uninterrupted,
            secure or available at any particular time or location; b) any
            errors or defects will be corrected; c) the Service is free of
            viruses or other harmful components; or d) the results of using the
            Service will meet your requirements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Governing Law
          </h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of the United States, without regard to its conflict of law
            provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            Service, and supersede and replace any prior agreements we might
            have between us regarding the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <p>By email: legal@doceditor.com</p>
        </section>
      </div>
    </div>
  );
}
