import React from "react";
import ExampleBarChart from "./ExampleBarChart";

function App() {
    return (
        <ExampleBarChart
            positiveData={[
                { x: "positive 0", y: 0 },
                { x: "positive 1", y: 1 },
                { x: "positive 2", y: 2 },
                { x: "positive 3", y: 2 }
            ]}
            negativeData={[
                { x: "negative 0", y: 0 },
                { x: "negative 1", y: 1 },
                { x: "negative 2", y: 2 },
                { x: "negative 3", y: 2 }
            ]}
        />
    );
}

export default App;
