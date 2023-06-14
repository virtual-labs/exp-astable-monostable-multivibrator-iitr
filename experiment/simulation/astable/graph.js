let datasets = [dataset1, dataset2, dataset3];
let selectedDatasetIndex = 0;

function updateDatasetLabel(value) {
    const datasetLabel = document.getElementById("dataset-label");
    datasetLabel.innerHTML = "Data Set: " + value;
}



function plotGraph() {
    const selectedDataset = datasets[selectedDatasetIndex];

    const xValues = selectedDataset.map((item) => item.x);
    const yValues = selectedDataset.map((item) => item.y);

    const trace = {
        x: xValues,
        y: yValues,
        mode: "lines",

    };

    const data = [trace];

    const layout = {
        xaxis: { range: [0, 0.004], title: "Time(s)" },
        yaxis: { range: [0, 12], title: "Voltage(V)" },
    };

    Plotly.newPlot("myPlot", data, layout);
}



//   document.getElementById("plot-graph").addEventListener("click", plotGraph);
document.getElementById('stop').addEventListener("input", function (event) {
    selectedDatasetIndex = parseInt(event.target.value) - 1;
});
