import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import { ResponsiveSunburst } from "@nivo/sunburst";

const data = [
  {
    id: "My Fines",
    color: "hsl(293, 70%, 50%)",
    data: [
      {
        x: "bus",
        y: 5,
      },
      {
        x: "car",
        y: 10,
      },
      {
        x: "moto",
        y: 15,
      },
      {
        x: "bicycle",
        y: 20,
      },
      {
        x: "horse",
        y: 25,
      },
      {
        x: "Trucks",
        y: 30,
      },
      {
        x: "others",
        y: 35,
      },
    ],
  },
];

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        height: 200,
      }}
    >
      <ResponsiveSunburst
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={2}
        borderWidth={0}
        borderColor={{ theme: "background" }}
        colors={{ scheme: "nivo" }}
        childColor={{ theme: "background" }}
        enableArcLabels={true}
        arcLabel="value"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 1.4]],
        }}
        motionConfig={{
          mass: 500,
          tension: 500,
          friction: 500,
          clamp: true,
          precision: 0.01,
          velocity: 0,
        }}
        transitionMode="pushIn"
      />
      {/* <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        margin={{ top: 10, right: 50, bottom: 100, left: 50 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      /> */}
    </Box>
  );
};

export default PieChart;
