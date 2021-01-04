import React from "react";
import GanttChart from "components/GanttChart";
import "./styles.scss";
import { Obj } from "interfaces/common";

interface TimelineProps {
  data: Obj[];

  onChange?: (e: any) => void;
  onRemove?: (name: string) => void;
}

const Timeline = (props: TimelineProps) => {
  return (
    <div className="TimeLine">
      <GanttChart
        data={props.data}
        onChange={props.onChange}
        onRemove={props.onRemove}
      />
    </div>
  );
};

export default Timeline;
