import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "~/lib/site";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read the privacy policy of ${siteConfig.name} to understand how we collect, use, and protect your personal data.`,
};

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: April 15, 2025
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Introduction</h2>
          <p>
            At {siteConfig.name} ("we", "our", or "us"), we respect your privacy
            and are committed to protecting your personal data. This privacy
            policy explains how we collect, use, and safeguard your information
            when you use our document and image editing platform ("Service").
          </p>
          <p>
            By using {siteConfig.name}, you agree to the collection and use of
            information in accordance with this policy. We will not use or share
            your information with anyone except as described in this Privacy
            Policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Information We Collect
          </h2>
          <p>
            We collect several types of information for various purposes to
            provide and improve our Service to you:
          </p>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Personal Data</h3>
            <p>
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you ("Personal Data"). This may include, but is not
              limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Usage data</li>
              <li>
                Payment information (processed securely through our payment
                processors)
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Usage Data</h3>
            <p>
              We may also collect information on how the Service is accessed and
              used ("Usage Data"). This may include information such as your
              computer's Internet Protocol address (IP address), browser type,
              browser version, the pages of our Service that you visit, the time
              and date of your visit, the time spent on those pages, unique
              device identifiers, and other diagnostic data.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">User-Generated Content</h3>
            <p>
              When you use our editing features, we collect and process the
              content you provide to edit and manage. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Documents you upload for editing</li>
              <li>Images you upload for processing</li>
              <li>PDF files you create or modify using our tools</li>
              <li>Project data and settings</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            How We Use Your Information
          </h2>
          <p>We use the collected data for various purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our Service
            </li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To process payments and prevent fraud</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Data Retention
          </h2>
          <p>
            We will retain your Personal Data only for as long as is necessary
            for the purposes set out in this Privacy Policy. We will retain and
            use your Personal Data to the extent necessary to comply with our
            legal obligations, resolve disputes, and enforce our legal
            agreements and policies.
          </p>
          <p>
            We will also retain Usage Data for internal analysis purposes. Usage
            Data is generally retained for a shorter period, except when this
            data is used to strengthen the security or to improve the
            functionality of our Service, or we are legally obligated to retain
            this data for longer periods.
          </p>
          <p>
            User-generated content may be retained to provide the Service. You
            can request deletion of your content by contacting us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar tracking technologies to track the
            activity on our Service and hold certain information.
          </p>
          <p>
            Cookies are files with a small amount of data which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            website and stored on your device. Tracking technologies also used
            are beacons, tags, and scripts to collect and track information and
            to improve and analyze our Service.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our Service.
          </p>
          <p>Examples of Cookies we use:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <span className="font-medium">Session Cookies:</span> We use
              Session Cookies to operate our Service.
            </li>
            <li>
              <span className="font-medium">Preference Cookies:</span> We use
              Preference Cookies to remember your preferences and various
              settings.
            </li>
            <li>
              <span className="font-medium">Security Cookies:</span> We use
              Security Cookies for security purposes.
            </li>
            <li>
              <span className="font-medium">Analytics Cookies:</span> We use
              Analytics Cookies to track usage and performance of our Service.
            </li>
          </ul>
          <p>
            Under the GDPR, we will ensure that your consent is obtained before
            placing non-essential cookies on your device, and that you are
            provided with clear and comprehensive information about the cookies
            being used.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Your Data Protection Rights Under GDPR
          </h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you have
            certain data protection rights.
            {siteConfig.name} aims to take reasonable steps to allow you to
            correct, amend, delete, or limit the use of your Personal Data.
          </p>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Your Rights</h3>
            <p>Under the GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">The right to access</span> – You
                have the right to request copies of your personal data. We may
                charge you a small fee for this service.
              </li>
              <li>
                <span className="font-medium">The right to rectification</span>{" "}
                – You have the right to request that we correct any information
                you believe is inaccurate. You also have the right to request
                that we complete information you believe is incomplete.
              </li>
              <li>
                <span className="font-medium">The right to erasure</span> – You
                have the right to request that we erase your personal data,
                under certain conditions.
              </li>
              <li>
                <span className="font-medium">
                  The right to restrict processing
                </span>{" "}
                – You have the right to request that we restrict the processing
                of your personal data, under certain conditions.
              </li>
              <li>
                <span className="font-medium">
                  The right to object to processing
                </span>{" "}
                – You have the right to object to our processing of your
                personal data, under certain conditions.
              </li>
              <li>
                <span className="font-medium">
                  The right to data portability
                </span>{" "}
                – You have the right to request that we transfer the data that
                we have collected to another organization, or directly to you,
                under certain conditions.
              </li>
              <li>
                <span className="font-medium">
                  The right not to be subject to automated decision-making
                </span>{" "}
                – You have the right not to be subject to a decision based
                solely on automated processing, including profiling, which
                produces legal effects concerning you or similarly significantly
                affects you.
              </li>
            </ul>
            <p>
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us at
              our email: privacy@doceditor.com.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Legal Basis for Processing Under GDPR
          </h2>
          <p>
            We will only collect and process your personal data where we have a
            legal basis to do so. Our legal basis for processing your personal
            data will depend on the personal data concerned and the specific
            context in which we collect it.
          </p>
          <p>We will normally collect personal data from you only where:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              We need the personal data to perform a contract with you (e.g., to
              deliver the {siteConfig.name} services you have requested)
            </li>
            <li>
              The processing is in our legitimate interests and not overridden
              by your rights
            </li>
            <li>We have your consent to do so</li>
            <li>We need to comply with a legal obligation</li>
          </ul>
          <p>
            If we collect and use your personal data in reliance on our
            legitimate interests (or those of any third party), this interest
            will typically be to operate our platform, communicate with you, or
            for our legitimate commercial interest, for instance, when
            responding to your queries, improving our platform, undertaking
            marketing, or for the purposes of detecting or preventing illegal
            activities.
          </p>
          <p>
            If you have questions about or need further information concerning
            the legal basis on which we collect and use your personal data,
            please contact us using the contact details provided under the
            "Contact Us" section.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Data Protection Officer
          </h2>
          <p>
            We have appointed a Data Protection Officer (DPO) who is responsible
            for overseeing questions in relation to this privacy policy. If you
            have any questions about this privacy policy, including any requests
            to exercise your legal rights, please contact the DPO using the
            details set out below:
          </p>
          <div className="bg-muted p-4 rounded-md">
            <p>Data Protection Officer</p>
            <p>{siteConfig.name}</p>
            <p>Email: dpo@doceditor.com</p>
            <p>Address: 123 Tech Street, San Francisco, CA 94105, USA</p>
          </div>
          <p>
            You have the right to make a complaint at any time to the
            supervisory authority for data protection issues in your country. We
            would, however, appreciate the chance to deal with your concerns
            before you approach the supervisory authority, so please contact us
            in the first instance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            International Transfers
          </h2>
          <p>
            Your information, including Personal Data, may be transferred to —
            and maintained on — computers located outside of your state,
            province, country, or other governmental jurisdiction where the data
            protection laws may differ from those of your jurisdiction.
          </p>
          <p>
            If you are located in the European Economic Area (EEA), please note
            that we transfer data, including Personal Data, to the United States
            and other countries that may not have the same data protection laws
            as the country in which you initially provided the information.
          </p>
          <p>
            When we transfer your data to countries outside the EEA, we ensure a
            similar degree of protection is afforded to it by implementing at
            least one of the following safeguards:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              We will only transfer your personal data to countries that have
              been deemed to provide an adequate level of protection for
              personal data by the European Commission.
            </li>
            <li>
              Where we use certain service providers, we may use specific
              contracts approved by the European Commission which give personal
              data the same protection it has in Europe (Standard Contractual
              Clauses).
            </li>
            <li>
              Where we use providers based in the US, we may transfer data to
              them if they are part of the Privacy Shield which requires them to
              provide similar protection to personal data shared between Europe
              and the US.
            </li>
          </ul>
          <p>
            Please contact us if you want further information on the specific
            mechanism used by us when transferring your personal data out of the
            EEA.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Data Breach Procedures
          </h2>
          <p>
            In the case of a personal data breach, we will notify you and any
            applicable regulator when we are legally required to do so. We will
            provide you with details of the data breach, the likely
            consequences, and the measures we have taken or propose to take to
            address the breach, including measures to mitigate possible adverse
            effects.
          </p>
          <p>
            We will notify you without undue delay, and not later than 72 hours
            after becoming aware of a breach, where the breach is likely to
            result in a high risk to your rights and freedoms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Automated Decision Making and Profiling
          </h2>
          <p>
            We do not use automated decision-making processes, including
            profiling, in a way that produces legal effects concerning you or
            significantly affects you. If we do use such processes in the
            future, we will provide you with information about the logic
            involved, as well as the significance and the envisaged consequences
            of such processing for you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Children's Privacy
          </h2>
          <p>
            Our Service does not address anyone under the age of 18
            ("Children"). We do not knowingly collect personally identifiable
            information from anyone under the age of 18. If you are a parent or
            guardian and you are aware that your Child has provided us with
            Personal Data, please contact us. If we become aware that we have
            collected Personal Data from children without verification of
            parental consent, we take steps to remove that information from our
            servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date at the top of this Privacy
            Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <p>By email: privacy@doceditor.com</p>
        </section>
      </div>
    </div>
  );
}
