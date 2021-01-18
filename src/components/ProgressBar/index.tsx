import { Progress } from "semantic-ui-react";
import "./styles.scss";

interface ProgressBarProps {
  percent?: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div className="ProgressBar">
      <Progress percent={props.percent ? props.percent : 0} progress />
    </div>
  );
};

export default ProgressBar;
