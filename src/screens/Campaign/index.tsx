import Board from "components/Board";
import Header from "components/Header";
import "./styles.scss";

const Campaign = () => {
  return (
    <div className="Campaign">
      <Header disableLogo />
      <div className="Background"></div>
      <div className="Content">
        <Board />
      </div>
    </div>
  );
};

export default Campaign;
