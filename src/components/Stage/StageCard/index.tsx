import React, { useContext, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { v4 as uuid } from "uuid";
import { ITEM_TYPES } from "global";
import { Icon, Modal } from "semantic-ui-react";
import TaskContainer from "components/Task";
import TextBox from "element/TextBox";
import CustomButton from "element/Button";
import { StageContext } from "..";
import { DragStageItem, Task } from "interfaces/common";
import "./styles.scss";

export interface StageCardProps {
  clientId: any;
  text: string;
  index: number;
  type?: string;
  tasks: Task[];
  // moveCard: (dragIndex: number, hoverIndex: number, item?: DragItem) => void;
  // moveTask: (
  //   stageIndex: number,
  //   dragTaskIndex: number,
  //   hoverStageIndex: number,
  //   hoverTaskIndex: number
  // ) => void;
}

interface StageContainerState {
  title: {
    value: string;
    errorMessage: string;
    showError: boolean;
  };
}

const StageCard: React.FC<StageCardProps> = ({
  clientId,
  text,
  index,
  tasks,
  type,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<StageContainerState>({
    title: {
      value: "",
      errorMessage: "",
      showError: false,
    },
  });
  const [moveCard, , , addStage] = useContext(StageContext);
  const [, drop] = useDrop({
    accept: ITEM_TYPES.CARD,
    hover(item: DragStageItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex, item);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPES.CARD, clientId, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        showError: false,
        errorMessage: "",
      },
    }));
  };

  const onSubmit = () => {
    const stage = {
      title: state.title.value,
      clientId: uuid(),
      tasks: [],
    };

    addStage(stage);
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return type !== "add" ? (
    <div className="StageCard" ref={ref}>
      <div className="StageCardContent" style={{ opacity }}>
        <div className="Title"> {text}</div>
        <TaskContainer tasks={tasks} stageIndex={index} stageId={clientId} />
      </div>
    </div>
  ) : (
    <div className="StageCard" ref={ref}>
      <Modal
        dimmer
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <div className="StageCardContent Add" style={{ opacity }}>
            <Icon name="add" />
          </div>
        }
      >
        <Modal.Header>Thêm thẻ mới</Modal.Header>
        <Modal.Content className="AddStage">
          <TextBox
            label="Tên thẻ"
            name="title"
            value={state.title.value}
            placeholder=""
            onChange={onChange}
          />
          <div className="Submit">
            <CustomButton
              text="Cancel"
              onClick={() => {
                setOpen(false);
              }}
            />
            <CustomButton
              text="Submit"
              onClick={() => {
                onSubmit();
                setOpen(false);
              }}
            />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default StageCard;
