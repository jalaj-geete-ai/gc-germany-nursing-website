import { motion } from 'framer-motion';
import Reveal from './Reveal';
import pathwayImg from '../assets/brand/pathway-infographic.png';

export default function OneStopApproach() {
  return (
    <section className="pathway-section-v2">
      {/* Background blends with the infographic's own light blue */}
      <div className="pathway-bg-gradient" />

      <div className="container">
        <Reveal>
          <motion.div
            className="pathway-img-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={pathwayImg}
              alt="Your pathway to a Germany nursing career — Assessment, German Language, Documentation, Job Placement, Visa & Processing, Fly to Germany"
              className="pathway-img"
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
