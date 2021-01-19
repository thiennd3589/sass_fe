import React from "react";
import GanttChart from "components/GanttChart";
import { Obj } from "interfaces/common";
import "./styles.scss";

interface TimelineProps {
  data: Obj[];
  height?: number;

  onChange?: (e: any) => void;
  onRemove?: (name: string) => void;
}

const Timeline = (props: TimelineProps) => {
  return (
    <div className="TimeLine">
      <div className="Title">Timeline</div>
      <GanttChart
        height={props.height}
        data={props.data}
        onChange={props.onChange}
        onRemove={props.onRemove}
      />
    </div>
  );
};

export default Timeline;
