import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  increase,
  date,
  complete,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" className="transition">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
            {date}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  background: colors.greenAccent[500],
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                }}
              ></Typography>
              <Typography
                variant="h6"
                sx={{ mr: 1, ml: 1, color: colors.greenAccent[500] }}
              >
                completed
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  background: colors.blueAccent[500],
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                }}
              ></Typography>
              <Typography
                variant="h6"
                sx={{ mr: 1, ml: 1, color: colors.blueAccent[500] }}
              >
                pending
              </Typography>
            </Box>
          </Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: colors.blueAccent[600] }}
          >
            {increase}
          </Typography>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ ml: 2, color: colors.greenAccent[500] }}
          >
            {complete}
          </Typography>
        </Box>
        {/* <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography> */}
      </Box>
    </Box>
  );
};

export default StatBox;
