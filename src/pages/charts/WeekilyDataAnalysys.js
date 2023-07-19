import { ResponsivePie } from "@nivo/pie";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useQuery } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { GMD_CURRENC_FORMAT } from "../../global/GlobalVeriableFormat";

const WeekilyDataAnalysys = ({ month, year }) => {
  const AxiousPrivate = useAxiousPrivate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isLoading, error, data, refetch, isError } = useQuery(
    "transaction",
    () =>
      AxiousPrivate.get(`/fine/fine/`)
        .then((result) => result.data)
        .catch((err) => console.log(err))
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
  function filterDataForYearAndMonth(data, year, month) {
    // Check if data is not available or is null
    if (!data) {
      console.log("no data avelable");
      return []; // Return an empty array if data is not available yet or is null.
    }
    // Convert data to an array if it's not already
    // console.log("dddd", data);

    const dataArray = Array.isArray(data) ? data : [data];
    // Check if dataArray contains valid objects with the 'createdAt' property
    const filteredData = dataArray.filter((entry) => {
      if (!entry || typeof entry !== "object" || !entry.createdAt) {
        return false; // Skip invalid entries without the 'createdAt' property
      }

      const createdAtDate = new Date(entry.createdAt);

      // Check if the createdAtDate matches the provided year and month
      return (
        createdAtDate.getFullYear() === parseInt(year) &&
        createdAtDate.getMonth() === parseInt(month)
      );
    });

    return filteredData;
  }

  // console.log(data);
  const filteredData = filterDataForYearAndMonth(data, year, month);

  // function to calculate the total numbe of money generated from fine per month
  function calculateTotalAmount(data) {
    let TotalAmount = 0;

    // Check if data is not available or is null
    if (!data?.length) {
      return TotalAmount; // Return 0 if data is not available yet or is not an array.
    }

    data.forEach((entry) => {
      const element = entry?.fineAmount?.replace(/[^\d.-]/g, ""); // extract the numerical value from the string
      if (!Number.isNaN(element)) {
        // add a check for NaN values
        TotalAmount += parseFloat(element);
      }
    });

    return TotalAmount;
  }

  const TruckLength = filteredData?.filter(
    (element) => element?.category === "truck"
  );

  // passinf the data to the function which should be calculated (array)
  const TruckPrice = calculateTotalAmount(TruckLength);

  const BushLength = filteredData?.filter(
    (element) => element?.category === "bus"
  );
  // passinf the data to the function which should be calculated (array)
  const BusPrice = calculateTotalAmount(BushLength);

  // passinf the data to the function which should be calculated (array)
  const CarLength = filteredData?.filter(
    (element) => element?.category === "car"
  );
  // passinf the data to the function which should be calculated (array)
  const CarPricePerMonth = calculateTotalAmount(CarLength);

  const others = filteredData?.filter(
    (element) => element?.category !== "car" && "bus" && "truck"
  );
  // passinf the data to the function which should be calculated (array)
  const OthersPrices = calculateTotalAmount(others);
  const mockPieData = [
    {
      id: "Vench",
      label: "Vehch",
      value: CarLength?.length,
      color: "hsl(244, 70%, 50%)",
    },
    {
      id: "Truck",
      label: "Truck",
      value: TruckLength?.length,
      color: "hsl(164, 70%, 50%)",
    },
    {
      id: "Bus  ",
      label: "Bus ",
      value: BushLength?.length,
      color: "hsl(327, 70%, 50%)",
    },
    {
      id: "Motocycle",
      label: "Motocycle",
      value: TruckLength?.length,
      color: "hsl(271, 70%, 50%)",
    },
    {
      id: "Others",
      label: "others",
      value: others?.length,
      color: "hsl(241, 70%, 50%)",
    },
  ];
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
      <Box sx={{ pl: 2, pr: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Typography>Source</Typography>
          <Typography>Total Price</Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Typography>Vench</Typography>
          <Typography>{GMD_CURRENC_FORMAT.format(CarPricePerMonth)}</Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Typography>Truck</Typography>
          <Typography>{GMD_CURRENC_FORMAT.format(TruckPrice)}</Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Typography>BUs</Typography>
          <Typography>{GMD_CURRENC_FORMAT.format(BusPrice)}</Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Typography>Motocycle</Typography>
          <Typography>GMd 1,000</Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Typography>Others</Typography>
          <Typography>{GMD_CURRENC_FORMAT.format(OthersPrices)}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default WeekilyDataAnalysys;
