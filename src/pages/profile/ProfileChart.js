import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { tokens } from "../../theme";

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
  //   {
  //     id: "West Coast Region",
  //     color: "hsl(293, 70%, 50%)",
  //     data: [
  //       {
  //         x: "boat",
  //         y: 148,
  //       },
  //       {
  //         x: "train",
  //         y: 145,
  //       },
  //       {
  //         x: "subway",
  //         y: 291,
  //       },
  //       {
  //         x: "bus",
  //         y: 153,
  //       },
  //       {
  //         x: "car",
  //         y: 0,
  //       },
  //       {
  //         x: "moto",
  //         y: 226,
  //       },
  //       {
  //         x: "bicycle",
  //         y: 80,
  //       },
  //       {
  //         x: "horse",
  //         y: 152,
  //       },
  //       {
  //         x: "Trucks",
  //         y: 49,
  //       },
  //       {
  //         x: "others",
  //         y: 210,
  //       },
  //     ],
  //   },
  //   {
  //     id: "Nort Bank Region",
  //     color: "hsl(220, 70%, 50%)",
  //     data: [
  //       {
  //         x: "boat",
  //         y: 77,
  //       },
  //       {
  //         x: "train",
  //         y: 184,
  //       },
  //       {
  //         x: "subway",
  //         y: 58,
  //       },
  //       {
  //         x: "bus",
  //         y: 226,
  //       },
  //       {
  //         x: "car",
  //         y: 52,
  //       },
  //       {
  //         x: "moto",
  //         y: 182,
  //       },
  //       {
  //         x: "bicycle",
  //         y: 45,
  //       },
  //       {
  //         x: "horse",
  //         y: 298,
  //       },
  //       {
  //         x: "Trucks",
  //         y: 285,
  //       },
  //       {
  //         x: "others",
  //         y: 175,
  //       },
  //     ],
  //   },
  //   {
  //     id: "Rower River Region",
  //     color: "hsl(215, 70%, 50%)",
  //     data: [
  //       {
  //         x: "boat",
  //         y: 178,
  //       },
  //       {
  //         x: "train",
  //         y: 64,
  //       },
  //       {
  //         x: "subway",
  //         y: 228,
  //       },
  //       {
  //         x: "bus",
  //         y: 32,
  //       },
  //       {
  //         x: "car",
  //         y: 196,
  //       },
  //       {
  //         x: "moto",
  //         y: 165,
  //       },
  //       {
  //         x: "bicycle",
  //         y: 251,
  //       },
  //       {
  //         x: "horse",
  //         y: 235,
  //       },
  //       {
  //         x: "Trucks",
  //         y: 104,
  //       },
  //       {
  //         x: "others",
  //         y: 12,
  //       },
  //     ],
  //   },
  //   {
  //     id: "Center River Region",
  //     color: "hsl(290, 70%, 50%)",
  //     data: [
  //       {
  //         x: "boat",
  //         y: 109,
  //       },
  //       {
  //         x: "train",
  //         y: 91,
  //       },
  //       {
  //         x: "subway",
  //         y: 154,
  //       },
  //       {
  //         x: "bus",
  //         y: 161,
  //       },
  //       {
  //         x: "car",
  //         y: 184,
  //       },
  //       {
  //         x: "moto",
  //         y: 16,
  //       },
  //       {
  //         x: "bicycle",
  //         y: 71,
  //       },
  //       {
  //         x: "horse",
  //         y: 169,
  //       },
  //       {
  //         x: "Trucks",
  //         y: 178,
  //       },
  //       {
  //         x: "others",
  //         y: 207,
  //       },
  //     ],
  //   },
];

const ProfileChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        height: 320,
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 1, ml: 2, pt: 2 }}>
        My Fine Analysis
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

export default ProfileChart;
