import { motion } from "framer-motion";

interface DragProps {
  className?: string;
  text: string;
  parentRef: any;
}

export default function DraggableText(props: DragProps) {
  return (
    <div>
      {props.text.split("").map((char, idx) => (
        <motion.span
          key={char + "-" + idx}
          drag
          dragElastic={0.9}
          dragConstraints={props.parentRef}
          dragSnapToOrigin={true}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
