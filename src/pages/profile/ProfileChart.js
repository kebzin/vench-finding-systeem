import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { tokens } from "../../theme";
import { useQuery } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";

const ProfileChart = ({ id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const AxiousPrivate = useAxiousPrivate();
  const { isLoading, data, isError, error, refetch } = useQuery(
    "fine",
    async () => {
      try {
        return await AxiousPrivate.get(`/fine/fine/${id}`)
          .then((res) => res.data)
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(error);
      }
    },
    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: true,
    }
  );

  if (isLoading) {
    return (
      <Box>
        <Typography>Loading......</Typography>
      </Box>
    );
  } else if (isError) {
    return (
      <Box>
        <Typography>oops something wnt wrong</Typography>
        <Typography>{error.message}</Typography>
      </Box>
    );
  }

  // function to calculate the total numbe of money generated from fine per month

  const TruckAmount = data?.filter((element) => element?.category === "truck");
  const BushLength = data?.filter((element) => element?.category === "bus");
  const CarLength = data?.filter((element) => element?.category === "car");
  const others = data?.filter(
    (element) => element?.category !== "car" && "bus" && "truck"
  );

  const dataarray = [
    {
      id: "My Fines",
      color: "hsl(293, 70%, 50%)",
      data: [
        {
          x: "bus",
          y: BushLength?.length,
        },
        {
          x: "car",
          y: CarLength?.length,
        },

        {
          x: "Trucks",
          y: TruckAmount?.length,
        },
        {
          x: "others",
          y: others?.length,
        },
      ],
    },
  ];
  return (
    <Box
      sx={{
        height: 250,
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 1, ml: 2, pt: 2 }}>
        My Fine Analysis
      </Typography>
      <ResponsiveLine
        data={dataarray}
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
