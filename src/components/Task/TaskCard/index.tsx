import { useContext, useRef, useState } from "react";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
  XYCoord,
} from "react-dnd";
import { ITEM_TYPES } from "global";
import { StageContext } from "components/Stage";
import { DragTaskItem, Task as ITask } from "interfaces/common";
import "./styles.scss";

interface TaskProps extends ITask {
  id: number | string;
  index: number;
  stageIndex: number;
  clientStageId: number | string;
}

const TaskCard: React.FC<TaskProps> = (props: TaskProps) => {
  const [, moveTask] = useContext(StageContext);
  const [state, setState] = useState({
    name: {
      value: "",
      errorMessage: "",
      showError: false,
    },
  });
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPES.TASK,
    hover(item: DragTaskItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (item.stageIndex === props.stageIndex) {

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingReact = ref.current.getBoundingClientRect();

        const hoverMiddleY =
          (hoverBoundingReact.bottom - hoverBoundingReact.top) / 2;

        const clientOffset = monitor.getClientOffset() as XYCoord;

        const hoverClientY = clientOffset.y - hoverBoundingReact.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveTask(item.stageIndex, item.index, props.stageIndex, props.index);
        item.index = hoverIndex;
      } else {
        moveTask(item.stageIndex, item.index, props.stageIndex, props.index);
        item.index = hoverIndex;
        item.stageIndex = props.stageIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ITEM_TYPES.TASK,
      id: props.id,
      index: props.index,
      stageIndex: props.stageIndex,
    },
    collect: (monitor: DragSourceMonitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={ref}
      className="TaskCard"
      style={{
        opacity,
      }}
    >
      {props.title}
    </div>
  );
};

export default TaskCard;
