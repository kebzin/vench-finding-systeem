import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export const mockPieData = [
  {
    id: "Vench",
    label: "Vehch",
    value: 485,
    color: "hsl(244, 70%, 50%)",
  },
  {
    id: "Truck",
    label: "Truck",
    value: 446,
    color: "hsl(164, 70%, 50%)",
  },
  {
    id: "Bus  ",
    label: "Bus ",
    value: 333,
    color: "hsl(327, 70%, 50%)",
  },
  {
    id: "",
    label: "Motocycle",
    value: 570,
    color: "hsl(271, 70%, 50%)",
  },
  {
    id: "Others",
    label: "others",
    value: 190,
    color: "hsl(241, 70%, 50%)",
  },
];

const WeekilyDataAnalysys = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        height: 250,
      }}
    >
      <ResponsivePie
        data={mockPieData}
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
        margin={{ top: 20, right: 10, bottom: 20, left: 20 }}
        valueFormat=" >-"
        sortByValue={true}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={7}
        arcLabelsRadiusOffset={0.4}
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
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: -20,
            translateY: 50,
            itemsSpacing: 0,
            itemWidth: 50,
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
      />
    </Box>
  );
};

export default WeekilyDataAnalysys;
