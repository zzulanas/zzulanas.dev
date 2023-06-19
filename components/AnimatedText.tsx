import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

interface TitleProps {
  title: string;
  className?: string;
}

export default function AnimatedText(props: TitleProps) {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={sentence}
      initial="hidden"
      animate="visible"
      aria-label={props.title}
      className={props.className}
    >
      {props.title.split("").map((char: string, index: number) => {
        return (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
