import React, { useEffect, useRef, useState } from "react";
import highchartsMore from "highcharts/highcharts-more.js";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts-gantt";
import draggable from "highcharts/modules/draggable-points";
import noData from "highcharts/modules/no-data-to-display";
import "./styles.scss";
import { Obj } from "interfaces/common";
import CustomButton from "element/Button";

if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
  draggable(Highcharts);
  noData(Highcharts);
}

interface GanttChartProps {
  data: Obj[];

  onChange?: (e: any) => void;
  onRemove?: (name: string) => void;
}

interface GanttChartState {
  disabledRemove: boolean;
  selectedPoint: string | null;
}

const day = 1000 * 60 * 60 * 24;

const GanttChart = (props: GanttChartProps) => {
  const count = useRef(0);
  const [state, setState] = useState<GanttChartState>({
    disabledRemove: true,
    selectedPoint: null,
  });

  useEffect(() => {
    console.log(state.selectedPoint);
  }, [state]);

  const onClick = (e: any) => {
    // Run in a timeout to allow the select to update
    console.log(e);
    setTimeout(function () {
      if (e.target.selected) {
        count.current++;
      } else {
        count.current--;
      }
      console.log(count.current);
      setState((prev) => ({
        ...prev,
        disabledRemove: count.current % 2 === 0 ? true : false,
        selectedPoint: e.target.name,
      }));
    }, 10);
  };

  const onRemove = () => {
    count.current--;
    props.onRemove &&
      state.selectedPoint &&
      props.onRemove(state.selectedPoint);
  };

  const option = {
    chart: {
      spacingLeft: 1,
      zoomType: "x",
      zoomKey: "alt",
      style: {
        borderRadius: "5px",
      },
    },

    // title: {
    //   text: "Interactive Gantt Chart",
    // },

    // subtitle: {
    //   text: "Drag and drop points to edit",
    // },

    navigator: {
      enabled: true,
      liveRedraw: true,
      series: {
        type: "gantt",
        pointPlacement: 0.5,
        pointPadding: 0.25,
      },
      yAxis: {
        reversed: true,
        categories: [],
      },
    },

    noData: {
      useHtml: true,
    },
    scrollbar: {
      enabled: true,
    },
    // rangeSelector: {
    //   enabled: true,
    //   selected: 0,
    // },

    plotOptions: {
      series: {
        animation: false, // Do not animate dependency connectors
        dragDrop: {
          draggableX: true,
          draggableY: true,
          dragMinY: 0,
          dragPrecisionX: day / 24, // Snap to eight hours
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            cursor: "default",
            pointerEvents: "none",
          },
        },
        allowPointSelect: true,
        point: {
          events: {
            select: onClick,
            unselect: onClick,
            // remove: updateRemoveButtonStatus,
            // update: onClick,
          },
        },
      },
    },

    yAxis: {
      type: "category",
      min: 0,
    },

    xAxis: {
      currentDateIndicator: true,
      type: "datetime",
      grid: {
        enabled: true,
      },
    },

    tooltip: {
      xDateFormat: "%a %b %d, %H:%M",
    },

    series: [
      {
        data: props.data,
        // [
        //   { end: 1606928400000, name: "Test", start: 1606755600000, y: 0 },
        // ],
      },
    ],
  };

  return (
    <div className="GanttChart">
      <HighchartsReact
        highcharts={Highcharts}
        options={option}
        constructorType={"ganttChart"}
      />
      <CustomButton
        text="Remove"
        disabled={state.disabledRemove}
        className={state.disabledRemove ? "Disabled" : ""}
        onClick={onRemove}
      />
    </div>
  );
};

export default GanttChart;
