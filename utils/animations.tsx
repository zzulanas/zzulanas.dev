export const riseWithFade = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

export const staggerChildren = {
  animate: {
    transition: {
      delay: 0.2,
      staggerChildren: 0.03,
    },
  },
};
