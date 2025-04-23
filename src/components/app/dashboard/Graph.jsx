import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Filter from "../../global/Filter";
import { useUsers } from "../../../hooks/api/Get";

const RevenueChart = ({setIsInsights}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [activePoint, setActivePoint] = useState(null);
  const { loading, data, pagination } = useUsers(`admin`,1);
  const {graph,stats}=data??[]; 
  useEffect(()=>{
    setIsInsights(stats);
  },[data])
  console.log(stats,"graphData");
  const Graphdata = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Sales",
        data: graph?.earnings,
        borderColor: "#000",
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#000",
        pointHoverBackgroundColor: "#000",
        pointBorderWidth: 0,
      },
    ],
  };

  useEffect(() => {
   
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart instance
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: Graphdata,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            tooltip: {
              enabled: false,
              external: (context) => {
                // No external tooltip needed as we're using custom tooltip
              },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                color: "#6B7280",
                font: {
                  size: 12,
                },
              },
              border: {
                display: false,
              },
            },
            y: {
              border: {
                display: false,
              },
              grid: {
                color: "#F3F4F6",
              },
              ticks: {
                color: "#6B7280",
                font: {
                  size: 12,
                },
                callback: (value) => value / 1000 + "K",
                stepSize: 40000,
              },
              min: 0,
              max: 240000,
            },
          },
          onHover: (event, elements) => {
            if (elements && elements.length) {
              const pointIndex = elements[0].index;
              console.log(graph?.months[pointIndex], "data");

              setActivePoint({
                index: pointIndex,
                value: data.datasets[0].data[pointIndex],
                label: graph?.months[pointIndex],
              });
            } else {
              setActivePoint(null);
            }
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const formatCurrency = (value) => {
    return "$" + value / 1000 + "k";
  };

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="p-3 pt-0 bg-white rounded-lg shadow-sm mt-5 mb-5 "
      onMouseLeave={() => setActivePoint(null)}
    >
      <div className="flex justify-between items-center ">
        <h2 className="text-[16px] font-bold text-gray-900">Revenue</h2>
        <Filter />
      </div>

      <div className="relative h-[400px]">
        <canvas ref={chartRef} />

        {activePoint && (
          <div
            className="absolute pointer-events-none bg-white rounded-lg shadow-lg p-4 z-10"
            style={{
              left: `${
                activePoint.label == "JAN"
                  ? ` calc(${
                      (activePoint.index / (graph.months.length - 1)) * 100
                    }% - 2 0px)`
                  : `calc(${
                      (activePoint.index / (graph.months.length - 1)) * 100
                    }% - 125px)`
              } `,
              top: "30%",
              minWidth: "150px",
            }}
          >
            <div className="text-[#4B5563] text-[10px] font-[500] mb-1">
              {activePoint.label}, {currentYear}
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mt-[2px] rounded-full bg-black mr-2"></div>
              <span className="font-[400] text-[#6B7280] text-[13px]">
                Sales:{" "}
              </span>
              <span className="font-[600] text-[13px] ml-1">
                {formatCurrency(activePoint.value)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
