import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function Graphs() {
    const [labels, setLabel] = useState(["Jan", "Feb", "Mar" ,"Apr", "May"]);

    const [value, setValue] = useState([40, 55, 10 ,85 ,90]);
    const data = {
        labels,
        datasets: [
            {
                label: "Total",
                data: value,
                backgroundColor: "#007168",
            },
        ],
    };
 
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                position: "top left",
            },
        },
    };
    return (
        <>
            <div className="graphs_inner">
                <Bar options={options} data={data} />
            </div>
        </>
    );
}

export default Graphs;