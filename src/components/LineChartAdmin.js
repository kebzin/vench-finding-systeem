import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { tokens } from "../theme";

const LineChartAdmin = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(data);

  const BrikamaRegion = data?.filter((element) => element.region === "Brikama");

  // vicle in brikama
  const BrikamaCars = BrikamaRegion?.filter(
    (element) => element?.fineCategory === "Car"
  );
  // Truck in brikama
  const BrikamaTruck = BrikamaRegion?.filter(
    (element) => element?.fineCategory === "truck"
  );
  // brikama Bus
  const BrikamaBus = BrikamaRegion?.filter(
    (element) => element.fineCategory === "Bus"
  );
  const BrikamaMotocar = BrikamaRegion?.filter(
    (element) => element.fineCategory === "Motocar"
  );
  const BrikamaOthers = BrikamaRegion?.filter(
    (element) => element.fineCategory !== "Motocar" && "Bus" && "Car" && "Truck"
  );

  // filtering by "Kanifing"
  const KanaifngRegion = data?.filter(
    (element) => element.region === "Brikama"
  );
  const KanafingCars = KanaifngRegion?.filter(
    (element) => element?.fineCategory === "Car"
  );
  const KanafingBus = KanaifngRegion?.filter(
    (element) => element.fineCategory === "Bus"
  );

  const KanafinMotocar = KanaifngRegion?.filter(
    (element) => element.fineCategory === "Motocar"
  );
  const KanafinOthers = KanaifngRegion?.filter(
    (element) => element.fineCategory !== "Motocar" && "Bus" && "Car" && "Truck"
  );
  // Truck in brikama
  const KanafinTruck = KanaifngRegion?.filter(
    (element) => element?.fineCategory === "truck"
  );
  const RegionDataAnalysis = [
    {
      id: "Brikama Region",
      color: "hsl(139, 70%, 50%)",
      data: [
        {
          x: "Bus",
          y: BrikamaBus?.length,
        },
        {
          x: "Car",
          y: BrikamaCars?.length,
        },
        {
          x: "MotoCars",
          y: BrikamaMotocar?.length,
        },

        {
          x: "Trucks",
          y: BrikamaTruck?.length,
        },
        {
          x: "others",
          y: BrikamaOthers?.length,
        },
      ],
    },
    {
      id: "Kanifing Region",
      color: "hsl(293, 70%, 50%)",
      data: [
        {
          x: "Bus",
          y: KanafingBus?.length,
        },
        {
          x: "Car",
          y: KanafingCars?.length,
        },
        {
          x: "MotoCars",
          y: KanafinMotocar?.length,
        },

        {
          x: "Trucks",
          y: KanafinTruck?.length,
        },
        {
          x: "others",
          y: KanafinOthers?.length,
        },
      ],
    },
    {
      id: "Nort Bank Region",
      color: "hsl(220, 70%, 50%)",
      data: [
        {
          x: "Bus",
          y: BrikamaBus?.length,
        },
        {
          x: "Car",
          y: BrikamaCars?.length,
        },
        {
          x: "MotoCars",
          y: BrikamaMotocar?.length,
        },

        {
          x: "Trucks",
          y: BrikamaTruck?.length,
        },
        {
          x: "others",
          y: BrikamaOthers?.length,
        },
      ],
    },
    {
      id: "Rower River Region",
      color: "hsl(215, 70%, 50%)",
      data: [
        {
          x: "Bus",
          y: 32,
        },
        {
          x: "Car",
          y: 19,
        },
        {
          x: "MotoCars",
          y: 14,
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
          x: "Bus",
          y: 16,
        },
        {
          x: "Car",
          y: 18,
        },
        {
          x: "MotoCars",
          y: 16,
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
        data={RegionDataAnalysis}
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
