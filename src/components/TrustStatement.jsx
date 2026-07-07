import Reveal from './Reveal';

export default function TrustStatement() {
  return (
    <section className="trust-statement">
      <div className="container trust-statement-inner">
        <Reveal>
          <h3>Fair recruitment, by design</h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p>
            No candidate pays for a job. No hidden fees buried in a contract. Every step — training, hospital
            matching, visa filing — is laid out upfront, so you always know exactly where you stand.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
