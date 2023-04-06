import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { tokens } from "../theme";

const data = [
  {
    id: "Greater Banjul",
    color: "hsl(139, 70%, 50%)",
    data: [
      {
        x: "Vench",
        y: 1,
      },
      {
        x: "bus",
        y: 12,
      },
      {
        x: "car",
        y: 0,
      },
      {
        x: "moto",
        y: 15,
      },
      {
        x: "bicycle",
        y: 32,
      },

      {
        x: "Trucks",
        y: 34,
      },
      {
        x: "others",
        y: 18,
      },
    ],
  },
  {
    id: "West Coast Region",
    color: "hsl(293, 70%, 50%)",
    data: [
      {
        x: "Vench",
        y: 9,
      },
      {
        x: "bus",
        y: 13,
      },
      {
        x: "car",
        y: 0,
      },
      {
        x: "moto",
        y: 26,
      },
      {
        x: "bicycle",
        y: 10,
      },

      {
        x: "Trucks",
        y: 29,
      },
      {
        x: "others",
        y: 20,
      },
    ],
  },
  {
    id: "Nort Bank Region",
    color: "hsl(220, 70%, 50%)",
    data: [
      {
        x: "Vench",
        y: 2,
      },
      {
        x: "bus",
        y: 22,
      },
      {
        x: "car",
        y: 32,
      },
      {
        x: "moto",
        y: 18,
      },
      {
        x: "bicycle",
        y: 15,
      },

      {
        x: "Trucks",
        y: 25,
      },
      {
        x: "others",
        y: 17,
      },
    ],
  },
  {
    id: "Rower River Region",
    color: "hsl(215, 70%, 50%)",
    data: [
      {
        x: "Vench",
        y: 2,
      },
      {
        x: "bus",
        y: 32,
      },
      {
        x: "car",
        y: 19,
      },
      {
        x: "moto",
        y: 14,
      },
      {
        x: "bicycle",
        y: 11,
      },

      {
        x: "Trucks",
        y: 10,
      },
      {
        x: "others",
        y: 12,
      },
    ],
  },
  {
    id: "Center River Region",
    color: "hsl(290, 70%, 50%)",
    data: [
      {
        x: "Vench",
        y: 0,
      },
      {
        x: "bus",
        y: 16,
      },
      {
        x: "car",
        y: 18,
      },
      {
        x: "moto",
        y: 16,
      },
      {
        x: "bicycle",
        y: 0,
      },

      {
        x: "Trucks",
        y: 2,
      },
      {
        x: "others",
        y: 20,
      },
    ],
  },
];

const LineChartAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        height: 400,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
        Regions Analysis
      </Typography>
      <ResponsiveLine
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
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        margin={{ top: 10, right: 170, bottom: 120, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 9,
          legend: "count",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 110,
            translateY: 10,
            itemsSpacing: 3,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 30,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default LineChartAdmin;
