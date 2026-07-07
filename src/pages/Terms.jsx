import Reveal from '../components/Reveal';
import CTABanner from '../components/CTABanner';
import GermanyBackdrop from '../components/GermanyBackdrop';

const EFFECTIVE_DATE = '1 July 2025';
const COMPANY = 'Global Careers by Testbook (operated by Testbook Edu Solutions Pvt. Ltd.)';
const EMAIL = 'germany@testbook.com';
const PHONE = '+91 85277 12345';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    body: `By accessing this website, submitting an inquiry form, or enrolling in any program offered by ${COMPANY}, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website or our services.`,
  },
  {
    id: 'services',
    title: '2. Description of Services',
    body: `Global Careers by Testbook provides the following services to eligible nursing professionals:

• German language training (A1–B2 level)
• Nursing adaptation and finishing-school programs
• Guidance on documentation and credential recognition
• Assistance with visa application preparation
• Relocation support (accommodation coordination, pre-departure briefing)
• Post-landing and recognition-exam support

We do not act as a recruitment agency and do not guarantee job placement, visa approval, or specific salary outcomes. All training, support and guidance is provided on a best-effort basis.`,
  },
  {
    id: 'eligibility',
    title: '3. Eligibility',
    body: `To be considered for the program, applicants must:

• Hold a recognised nursing qualification (GNM diploma, B.Sc Nursing, Post Basic B.Sc, or M.Sc Nursing)
• Be registered as a Registered Nurse (RN) with their State Nursing Council in India
• Meet any additional eligibility criteria communicated during the screening process

Submission of an inquiry form does not guarantee admission. Final admission is subject to assessment and counsellor review.`,
  },
  {
    id: 'fees',
    title: '4. Program Fees & Payments',
    body: `4.1  Program fees are communicated individually during the counselling process and may vary based on the specific services availed.

4.2  A non-refundable registration fee may be applicable upon enrolment.

4.3  Payment plans (including EMI options) may be available — terms are outlined in your individual enrolment agreement.

4.4  All fees are subject to applicable taxes (GST) as per Indian tax law.

4.5  Testbook Edu Solutions Pvt. Ltd. reserves the right to revise fees for future batches. Enrolled participants are protected at the fee agreed at enrolment.`,
  },
  {
    id: 'refunds',
    title: '5. Refund Policy',
    body: `5.1  Registration fees are non-refundable once paid.

5.2  Program fees may be partially refunded if a written cancellation request is submitted within 7 days of enrolment and before access to any training material has been granted.

5.3  No refund is applicable after training has commenced, visa processing has begun, or accommodation arrangements have been made on the applicant's behalf.

5.4  If a visa application is rejected for reasons outside the applicant's control and Global Careers has fulfilled all its obligations (documentation, translation, submission support), no refund applies to the service fee. Where Global Careers is found to have been negligent in its responsibilities, a partial refund may be considered on a case-by-case basis.

To initiate a refund request, contact us at ${EMAIL}.`,
  },
  {
    id: 'no-guarantees',
    title: '6. No Guarantee of Outcomes',
    body: `We are transparent about what we can and cannot promise:

• We do not guarantee visa approval — visa decisions rest entirely with the German authorities.
• We do not guarantee job placement — hospital hiring decisions are made by partner hospitals independently.
• We do not guarantee specific salary figures — salary depends on employer, location, experience and recognition status.
• We do not guarantee a specific timeline — processing times vary based on regulatory and government procedures.

Indicative figures (salary ranges, success rates, visa timelines) provided on this website and in our communications are illustrative and based on historical data. They are not contractual commitments.`,
  },
  {
    id: 'conduct',
    title: '7. Applicant Responsibilities',
    body: `You agree to:

• Provide accurate, complete and truthful information during the application and training process
• Notify us promptly of any changes to your contact details, nursing registration status, or documentation
• Maintain consistent attendance and effort in the language training program
• Adhere to the ethical and professional standards expected of a registered nurse
• Not misrepresent your qualifications or experience to hospitals, authorities, or our team

Providing false information may result in immediate termination of your program, forfeiture of fees, and reporting to relevant authorities.`,
  },
  {
    id: 'data',
    title: '8. Privacy & Data Use',
    body: `By submitting your information through this website, you consent to:

• Our team contacting you via phone, WhatsApp, email or SMS regarding the Germany nursing program
• Your personal data being stored securely in our CRM systems and used solely for program administration, counselling and placement purposes
• Your data being shared with partner hospitals (only with your prior consent, at the interview stage)

We do not sell your personal data to third parties. For full details, see our Privacy Policy (available on request at ${EMAIL}).

Data is retained for the duration of your engagement with us and up to 3 years thereafter, in compliance with applicable data protection laws.`,
  },
  {
    id: 'ip',
    title: '9. Intellectual Property',
    body: `All content on this website — including text, graphics, logos, training materials and the GC Buddy platform — is the property of Testbook Edu Solutions Pvt. Ltd. and is protected under applicable Indian and international copyright laws.

You may not reproduce, distribute, modify, or create derivative works from any content without prior written permission.`,
  },
  {
    id: 'liability',
    title: '10. Limitation of Liability',
    body: `To the maximum extent permitted by law, Testbook Edu Solutions Pvt. Ltd. shall not be liable for:

• Any indirect, incidental, or consequential loss arising from your participation in the program
• Visa rejections, employer decisions, or outcomes beyond our reasonable control
• Delays caused by government processing, regulatory changes, or force majeure events
• Any reliance placed on indicative salary, timeline, or success-rate figures

Our total liability for any claim arising from these terms shall not exceed the fees paid by you for the specific service at issue.`,
  },
  {
    id: 'modifications',
    title: '11. Modifications to Terms',
    body: `We reserve the right to update these Terms and Conditions at any time. Changes will be published on this page with an updated effective date. Your continued use of our services after any changes constitutes your acceptance of the revised terms.

We recommend reviewing this page periodically.`,
  },
  {
    id: 'governing',
    title: '12. Governing Law & Disputes',
    body: `These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.

We encourage you to first reach out to us at ${EMAIL} to resolve any concerns amicably before initiating formal proceedings.`,
  },
  {
    id: 'contact',
    title: '13. Contact Us',
    body: `If you have questions about these Terms, please contact us:

Global Careers by Testbook
Testbook Edu Solutions Pvt. Ltd.

Email: ${EMAIL}
Phone: ${PHONE}
Hours: Mon–Sat, 9 AM – 8 PM IST`,
  },
];

export default function Terms() {
  return (
    <>
      <section className="page-hero">
        <GermanyBackdrop />
        <div className="container">
          <Reveal><span className="eyebrow">Legal</span></Reveal>
          <Reveal delay={0.06}><h1 className="page-hero-title">Terms &amp; Conditions</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-hero-sub">Effective date: {EFFECTIVE_DATE}</p>
          </Reveal>
        </div>
      </section>

      <section className="section terms-section">
        <div className="container terms-container">
          {/* Sticky table of contents */}
          <aside className="terms-toc">
            <p className="terms-toc-title">Contents</p>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="terms-body">
            <p className="terms-intro">
              These Terms and Conditions govern your use of the Global Careers by Testbook website and
              your participation in any of our programs. Please read them carefully.
            </p>

            {sections.map((s, i) => (
              <Reveal delay={0.04 * i} key={s.id}>
                <div id={s.id} className="terms-block">
                  <h2>{s.title}</h2>
                  {s.body.split('\n').map((line, j) =>
                    line.trim() === '' ? null : (
                      <p key={j} style={line.startsWith('•') ? { paddingLeft: '1.2rem' } : {}}>
                        {line}
                      </p>
                    )
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
