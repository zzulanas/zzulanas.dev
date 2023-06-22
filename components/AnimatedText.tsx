import { motion } from "framer-motion";

interface TitleProps {
  title: string;
  className?: string;
}

export default function AnimatedText(props: TitleProps) {
  const sentenceIn = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  const letterIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 50,
    },
  };

  return (
    <motion.div
      variants={sentenceIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label={props.title}
      className={props.className}
    >
      {props.title.split("").map((char: string, index: number) => {
        return (
          <motion.span key={char + "-" + index} variants={letterIn}>
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
