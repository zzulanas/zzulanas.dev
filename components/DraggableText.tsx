import { DragControls, motion, useDragControls } from "framer-motion";

interface DragProps {
  className?: string;
  text: string;
  parentRef: any;
  controls?: DragControls; //TODO; gravity implementation
  dragEnabled?: boolean;
}

export default function DraggableText(props: DragProps) {
  return (
    <div>
      {props.dragEnabled &&
        props.text.split(" ").map((word, idx) => {
          return (
            <div key={word + idx} className="inline-block" aria-label={word}>
              {word.split("").map((char, idx) => (
                <motion.span
                  key={char + "-" + idx}
                  drag={props.dragEnabled}
                  dragElastic={0.9}
                  className="inline-block cursor-pointer active:cursor-grabbing"
                  whileDrag={{ scale: 1.5 }}
                  dragConstraints={props.parentRef}
                >
                  {char}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </div>
          );
        })}
      {!props.dragEnabled && (
        <span className={props.className}>{props.text}</span>
      )}
    </div>
  );
}
