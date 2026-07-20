import { motion } from 'framer-motion';
import Reveal from './Reveal';
import pathwayImg from '../assets/brand/pathway-infographic.png';

export default function OneStopApproach() {
  return (
    <section className="section one-stop-v2">
      <div className="container">
        <div className="pathway-infographic-wrap">
          <Reveal>
            <motion.div
              className="pathway-infographic-frame"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={pathwayImg}
                alt="Your pathway to a Germany nursing career — Assessment, German Language, Documentation, Job Placement, Visa Processing, Fly to Germany"
                className="pathway-infographic-img"
              />
              {/* Subtle glow overlay to make it feel more "alive" */}
              <div className="pathway-infographic-glow" />
            </motion.div>
          </Reveal>

          {/* Floating badge — adds life without cluttering the image */}
          <motion.div
            className="pathway-floating-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <span className="pfb-icon">✈️</span>
            <div>
              <strong>Jan → December</strong>
              <span>Start to Germany</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
