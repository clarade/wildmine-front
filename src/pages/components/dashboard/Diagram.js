import React from "react";
import { userWithRelations } from "../../../graphql/UserSession";
import { useQuery } from "@apollo/client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Diagram = () => {
  const { loading, error, data } = useQuery(userWithRelations);
  // console.log(data);

  const status = data.userWithRelations.issues_assigned;

  const chartData = {
    inWait: status.filter((status) => status.status === "IN_WAIT").length,
    inProgress: status.filter((status) => status.status === "IN_PROGRESS")
      .length,
    done: status.filter((status) => status.status === "DONE").length,
  };

  const datas = {
    labels: ["Gray", "Yellow", "Yellow"],
    datasets: [
      {
        data: [chartData.inWait, chartData.inProgress, chartData.done],
        backgroundColor: ["#808080", "#FFFF00", "#008000"],
        hoverBackgroundColor: ["#00A550", "#F0F0F0", "#EACC41"],
      },
    ],
    options: {
      // responsive: true,
      cutoutPercentage: 30,
    },
  };

  return (
    <>
      
      <Doughnut data={datas} />
      <div className="p-4">
        {/* <img className="w-full" src={diagram} alt="diagram" /> */}
        <div className="font-bold text-xl mb-2 font-chaney_title text-md text-center">
          Résumé de mes tickets
        </div>
        <div className="px-6 py-4 ">
          <div className=" grid-cols-2 p-4 flex flex-col">
            <div>
              <p className="text_color_light">
                Non traités ( {chartData.inWait} )
              </p>
              <p className="text_color_light">
                En cours ( {chartData.inProgress} )
              </p>
              <p className="text_color_light">Résolus ( {chartData.done} )</p>
            </div>
            <div className="my-2">
              <p className="text_color_light">
                Nombre de tickets résolus depuis{" "}
                {new Date(
                  data.userWithRelations.created_at
                ).toLocaleDateString()}
              </p>
              <div className="font-chaney_title text-center">
                {chartData.done}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </canvas> */}
    </>
  );
};

export default Diagram;
