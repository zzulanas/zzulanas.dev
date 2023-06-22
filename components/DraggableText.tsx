import { DragControls, motion, useDragControls } from "framer-motion";

interface DragProps {
  className?: string;
  text: string;
  parentRef: any;
  controls?: DragControls; //TODO; gravity implementation
}

export default function DraggableText(props: DragProps) {
  return (
    <div>
      {props.text.split(" ").map((word, idx) => {
        return (
          <div key={word + idx} className="inline-block">
            {word.split("").map((char, idx) => (
              <motion.span
                key={char + "-" + idx}
                drag
                dragElastic={0.9}
                dragSnapToOrigin={true}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </div>
        );
      })}
    </div>
  );
}
