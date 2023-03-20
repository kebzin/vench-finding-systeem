import { Box, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

// const data = [
//   {
//     id: "Greater Banjul",
//     color: "hsl(139, 70%, 50%)",
//     data: [
//       {
//         x: "boat",
//         y: 253,
//       },
//       {
//         x: "train",
//         y: 35,
//       },
//       {
//         x: "subway",
//         y: 171,
//       },
//       {
//         x: "bus",
//         y: 125,
//       },
//       {
//         x: "car",
//         y: 0,
//       },
//       {
//         x: "moto",
//         y: 151,
//       },
//       {
//         x: "bicycle",
//         y: 32,
//       },
//       {
//         x: "horse",
//         y: 17,
//       },
//       {
//         x: "Trucks",
//         y: 34,
//       },
//       {
//         x: "others",
//         y: 183,
//       },
//     ],
//   },
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
// ];

export const mockBarData = [
  {
    country: "LRR",
    "hot dog": 31,
    "hot dogColor": "hsl(15, 70%, 50%)",
    burger: 57,
    burgerColor: "hsl(6, 70%, 50%)",
    sandwich: 2,
    sandwichColor: "hsl(43, 70%, 50%)",
    kebab: 27,
    kebabColor: "hsl(296, 70%, 50%)",
    fries: 21,
    friesColor: "hsl(349, 70%, 50%)",
    donut: 6,
    donutColor: "hsl(317, 70%, 50%)",
  },
  {
    country: "URR",
    "hot dog": 41,
    "hot dogColor": "hsl(193, 70%, 50%)",
    burger: 92,
    burgerColor: "hsl(211, 70%, 50%)",
    sandwich: 100,
    sandwichColor: "hsl(313, 70%, 50%)",
    kebab: 117,
    kebabColor: "hsl(285, 70%, 50%)",
    fries: 167,
    friesColor: "hsl(266, 70%, 50%)",
    donut: 38,
    donutColor: "hsl(235, 70%, 50%)",
  },
  {
    country: "CRR",
    "hot dog": 40,
    "hot dogColor": "hsl(279, 70%, 50%)",
    burger: 141,
    burgerColor: "hsl(124, 70%, 50%)",
    sandwich: 26,
    sandwichColor: "hsl(52, 70%, 50%)",
    kebab: 47,
    kebabColor: "hsl(64, 70%, 50%)",
    fries: 47,
    friesColor: "hsl(33, 70%, 50%)",
    donut: 7,
    donutColor: "hsl(311, 70%, 50%)",
  },
  {
    country: "GB",
    "hot dog": 62,
    "hot dogColor": "hsl(9, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(86, 70%, 50%)",
    sandwich: 58,
    sandwichColor: "hsl(271, 70%, 50%)",
    kebab: 40,
    kebabColor: "hsl(89, 70%, 50%)",
    fries: 88,
    friesColor: "hsl(185, 70%, 50%)",
    donut: 51,
    donutColor: "hsl(235, 70%, 50%)",
  },
  {
    country: "NBR",
    "hot dog": 62,
    "hot dogColor": "hsl(9, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(86, 70%, 50%)",
    sandwich: 58,
    sandwichColor: "hsl(271, 70%, 50%)",
    kebab: 40,
    kebabColor: "hsl(89, 70%, 50%)",
    fries: 88,
    friesColor: "hsl(185, 70%, 50%)",
    donut: 51,
    donutColor: "hsl(235, 70%, 50%)",
  },
  {
    country: "WCR",
    "hot dog": 62,
    "hot dogColor": "hsl(9, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(86, 70%, 50%)",
    sandwich: 58,
    sandwichColor: "hsl(271, 70%, 50%)",
    kebab: 40,
    kebabColor: "hsl(89, 70%, 50%)",
    fries: 88,
    friesColor: "hsl(185, 70%, 50%)",
    donut: 51,
    donutColor: "hsl(235, 70%, 50%)",
  },
];
const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        height: 400,
      }}
    >
      <ResponsiveBar
        data={mockBarData}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        theme={{
          // added
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
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />{" "}
      {/* <ResponsiveBar
        data={mockBarData}
        theme={{
          // added
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
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country", // changed
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food", // changed
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      /> */}
    </Box>
  );
};

export default BarChart;
