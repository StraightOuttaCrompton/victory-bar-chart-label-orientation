import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from "victory";

interface IData {
    x: string;
    y: number;
}

function NegativeAwareTickLabel(props: any) {
    const { datum, scale, ...rest } = props;
    const sign = datum.y < 0 ? -1 : 1;
    return (
        <VictoryLabel
            {...rest}
            textAnchor={sign === 1 ? "end" : "start"}
            datum={datum} // Shove `datum` back into label. We destructured it from `props` so we'd have it available for a future step
            x={scale.x(2)} // Set y to the svg-space location of the axis
            dx={-10 * sign} // Change direction of offset based on the datum value
        />
    );
}

function parseData(data: IData[], type: "positive" | "negative") {
    const maxY = Math.max(...data.map(d => Math.abs(d.y)));
    return data.map(d => {
        return {
            x: d.x,
            y:
                maxY === 0
                    ? 0
                    : ((type === "positive" ? 1 : -1) * Math.abs(d.y)) / maxY
        };
    });
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

    const data = parseData(positiveData, "positive").concat(
        parseData(negativeData, "negative")
    );

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
            <VictoryBar
                data={data}
                barWidth={barWidth}
                labels={({ datum }) => `${datum.x}`}
                labelComponent={<NegativeAwareTickLabel />}
            />
            <VictoryAxis
                style={{
                    tickLabels: { fill: "none" }
                }}
            />
        </VictoryChart>
    );
}
