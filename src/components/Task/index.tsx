import { StageContext } from "components/Stage";
import CustomButton from "element/Button";
import DateTimePicker from "element/DateTimePicker";
import TextBox from "element/TextBox";
import { ITEM_TYPES } from "global";
import { DragTaskItem, Obj, Task } from "interfaces/common";
import { useContext, useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { Icon, Modal } from "semantic-ui-react";
import "./styles.scss";
import TaskCard from "./TaskCard";

interface TaskContainerProps {
  tasks: Task[];
  stageIndex: number;
  stageId: string | number;
}

interface TaskContainerState {
  title: {
    value: string;
    errorMessage: string;
    showError: boolean;
  };
  description: {
    value: string;
    errorMessage: string;
    showError: boolean;
  };

  dueDate: string;
}

const TaskContainer = (props: TaskContainerProps) => {
  const [, moveTask, addTask] = useContext(StageContext);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<TaskContainerState>({
    title: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    description: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    dueDate: "",
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPES.TASK,
    hover(item: DragTaskItem, monitor: DropTargetMonitor) {
      if (props.tasks.length === 0) {
        moveTask(item.stageIndex, item.index, props.stageIndex, 0);
      }
    },
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

  const onDateChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: any,
    name: string
  ) => {
    setState((prev) => ({
      ...prev,
      [name]: data.value as string,
    }));
  };

  const submit = () => {
    const task = {
      title: state.title.value,
      description: state.description.value,
      dueDate: state.dueDate,
    };

    addTask(task, props.stageIndex);
  };

  return (
    <div className="TaskContainer">
      {props.tasks.map((task, index) => (
        <TaskCard
          {...task}
          id={task.clientId as string}
          index={index}
          key={task.clientId as string}
          stageIndex={props.stageIndex}
          clientStageId={props.stageId}
        />
      ))}

      <Modal
        dimmer
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <div className="AddTask">
            <Icon name="add" /> Thêm thẻ mới
          </div>
        }
        className="AddTaskModal"
      >
        <Modal.Header>Thêm thẻ mới</Modal.Header>
        <Modal.Content className="AddModal">
          <TextBox
            label="Tên đầu việc"
            name="title"
            value={state.title.value}
            placeholder=""
            onChange={onChange}
          />
          <TextBox
            label="Miêu tả"
            name="description"
            value={state.description.value}
            placeholder=""
            onChange={onChange}
          />
          <DateTimePicker
            label="Ngày hết hạn"
            onChange={(e, data) => {
              onDateChange(e, data, "dueDate");
            }}
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
                submit();
                setOpen(false);
              }}
            />
          </div>
        </Modal.Content>
      </Modal>
      <div
        className="TaskDropZone"
        ref={drop}
        style={{ height: props.tasks.length > 0 ? "100px" : "200px" }}
      ></div>
    </div>
  );
};

export default TaskContainer;
