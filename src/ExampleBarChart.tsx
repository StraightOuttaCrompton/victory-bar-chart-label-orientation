import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

interface IData {
    x: string;
    y: number;
}

interface IProps {
    positiveData: IData[];
    negativeData: IData[];
    barWidth?: number;
    spacing?: number;
}

export default function ExampleBarChart(props: IProps) {
    const { positiveData, negativeData, barWidth = 25, spacing = 10 } = props;

    const totalNumberOfBars = positiveData.length + negativeData.length;

    const padding = 10;
    const topBottomPadding = barWidth / 2 + padding;

    return (
        <VictoryChart
            horizontal
            height={totalNumberOfBars * (barWidth + spacing)}
            padding={{
                left: padding,
                right: padding,
                top: topBottomPadding,
                bottom: topBottomPadding
            }}
        >
            <VictoryAxis
                dependentAxis
                style={{
                    axis: { stroke: "none" },
                    tickLabels: { stroke: "none", fill: "transparent" }
                }}
            />
            {ExampleBar({ id: "negativeData", barWidth, data: negativeData, type: "negative" })}
            {ExampleBar({ id: "positiveData", barWidth, data: positiveData, type: "positive" })}
        </VictoryChart>
    );
}

interface IChangeBarProps {
    id: string;
    data: IData[];
    type: "positive" | "negative";
    barWidth: number;
}

function ExampleBar(props: IChangeBarProps) {
    const { id, data, type, barWidth } = props;

    const orientation = type === "positive" ? "right" : "left";

    const maxY = Math.max(...data.map(d => Math.abs(d.y)));
    const parsedData = data.map(d => {
        return {
            x: d.x,
            y:
                maxY === 0
                    ? 0
                    : ((type === "positive" ? 1 : -1) * Math.abs(d.y)) / maxY
        };
    });

    console.log(orientation)

    return [
        <VictoryAxis
            key={`${id}-axis`}
            style={{
                axis: { stroke: "none" }
            }}
            orientation={orientation}
            // orientation={"left"}
            // orientation={"right"}
        />,
        <VictoryBar
            key={`${id}-bar`}
            barWidth={barWidth}
            data={parsedData}
        />
    ];
}
