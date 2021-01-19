import React, { useCallback, useState } from "react";
import update from "immutability-helper";
import { v4 as uuid } from "uuid";
import ProgressBar from "components/ProgressBar";
import StageCard from "components/Stage/StageCard";
import { Stage, Task, Obj } from "interfaces/common";
import "./styles.scss";

export interface Item {
  id: number;
  text: string;
}

export const StageContext = React.createContext<any>(undefined);

const StatusContainer = () => {
  const [stageList, setState] = useState<Stage[]>([
    {
      clientId: uuid(),
      id: 1,
      title: "To do",
      tasks: [{ title: "Write this and write that", clientId: uuid() }],
    },
    {
      clientId: uuid(),
      id: 2,
      title: "In Progress",
      tasks: [],
    },
    {
      clientId: uuid(),
      id: 4,
      title: "add",
      type: "add",
      tasks: [],
      disableMove: true,
    },
    {
      clientId: uuid(),
      id: 5,
      title: "Done",
      disableMove: true,
      tasks: [],
    },
  ]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = stageList[dragIndex];
      if (dragCard.disableMove) {
        return;
      }
      if (hoverIndex >= stageList.length - 2) {
        return;
      }
      setState(
        update(stageList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [stageList]
  );

  const moveTask = useCallback(
    (
      stageIndex: number,
      dragTaskIndex: number,
      hoverStageIndex: number,
      hoverTaskIndex: number
    ) => {
      const dragTask = stageList[stageIndex].tasks![dragTaskIndex];
      // if (dragTask == null) {
      //   return;
      // }
      if (stageIndex === hoverStageIndex) {
        setState(
          update(stageList, {
            [stageIndex]: {
              tasks: {
                $splice: [
                  [dragTaskIndex, 1],
                  [hoverTaskIndex, 0, dragTask],
                ],
              },
            },
          })
        );
        // );
      } else {
        if (stageList[hoverStageIndex].tasks!.length > 0) {
          setState(
            update(stageList, {
              [stageIndex]: {
                tasks: {
                  $splice: [[dragTaskIndex, 1]],
                },
              },
              [hoverStageIndex]: {
                tasks: {
                  $splice: [[hoverTaskIndex, 0, dragTask]],
                },
              },
            })
          );
        } else {
          setState(
            update(stageList, {
              [stageIndex]: {
                tasks: {
                  $splice: [[dragTaskIndex, 1]],
                },
              },
              [hoverStageIndex]: {
                tasks: {
                  $push: [dragTask],
                },
              },
            })
          );
        }
      }
    },
    [stageList]
  );

  const addTask = useCallback(
    (task: Obj, stageIndex: string | number) => {
      setState(
        update(stageList, {
          [stageIndex]: {
            tasks: {
              $push: [task],
            },
          },
        })
      );
    },
    [stageList]
  );

  const addStage = useCallback(
    (stage) => {
      setState(
        update(stageList, {
          $splice: [[stageList.length - 2, 0, stage]],
        })
      );
    },
    [stageList]
  );

  const renderStage = (
    stage: {
      title: string;
      tasks: Task[];
      clientId: string | number;
      type?: string;
    },
    index: number
  ) => {
    return (
      <StageCard
        key={stage.clientId}
        index={index}
        clientId={stage.clientId}
        text={stage.title}
        tasks={stage.tasks}
        type={stage.type}
      />
    );
  };

  return (
    <StageContext.Provider value={[moveCard, moveTask, addTask, addStage]}>
      <div className="StatusContainer">
        <ProgressBar />
        <div className="StageContent">
          {stageList.map((stage, i) => renderStage(stage, i))}
        </div>
      </div>
    </StageContext.Provider>
  );
};

export default StatusContainer;
