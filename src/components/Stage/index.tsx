import StageCard from "components/Stage/StageCard";
import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import update from "immutability-helper";
import { Stage, Task } from "interfaces/common";

import "./styles.scss";
import { Obj } from "interfaces/common";

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
      title: "Prepare",
      tasks: [
        {
          clientId: uuid(),
          title: "Write a cool JS library",
        },
        {
          clientId: uuid(),
          title: "Make it generic enough",
        },
      ],
    },
    {
      clientId: uuid(),
      id: 2,
      title: "In Progress",
      tasks: [
        {
          clientId: uuid(),
          title: "Write README",
        },
        {
          clientId: uuid(),
          title: "Create some examples",
        },
      ],
    },
    {
      clientId: uuid(),
      id: 3,
      title: "Finish",
      tasks: [
        {
          clientId: uuid(),
          title:
            "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
        },
        {
          clientId: uuid(),
          title: "???",
          stageId: 3,
        },
        {
          clientId: uuid(),
          title: "PROFIT",
        },
      ],
    },
    {
      clientId: uuid(),
      id: 4,
      title: "Finish",
      type: "add",
      tasks: [],
      disableMove: true,
    },
    {
      clientId: uuid(),
      id: 5,
      title: "Done",
      disableMove: true,
      tasks: [
        {
          clientId: uuid(),
          title:
            "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
        },
        {
          clientId: uuid(),
          title: "???",
        },
        {
          clientId: uuid(),
          title: "PROFIT",
        },
      ],
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
      console.log(stage);
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
        <div className="StageContent">
          {stageList.map((stage, i) => renderStage(stage, i))}
        </div>
      </div>
    </StageContext.Provider>
  );
};

export default StatusContainer;