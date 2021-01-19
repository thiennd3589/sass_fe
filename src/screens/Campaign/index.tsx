import Header from "components/Header";
import Stage from "components/Stage";
import "./styles.scss";

const Campaign = () => {
  return (
    <div className="Campaign">
      <Header disableLogo />
      <div className="Background"></div>
      <div className="Content">
        <Stage />
      </div>
    </div>
  );
};

export default Campaign;
