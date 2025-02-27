import { Box } from "@mui/material";
import React from "react";
import { JSONTree } from "react-json-tree";
import { useTheme } from "../configs/theme";

const theme = {
  scheme: "chalk",
  author: "chris kempson (http://chriskempson.com)",
  base00: "#FFFFFF",
  base01: "#202020",
  base02: "#303030",
  base03: "#505050",
  base04: "#b0b0b0",
  base05: "#d0d0d0",
  base06: "#e0e0e0",
  base07: "#f5f5f5",
  base08: "#fb9fb1",
  base09: "#eda987",
  base0A: "#ddb26f",
  base0B: "#acc267",
  base0C: "#12cfc0",
  base0D: "#6fc2ef",
  base0E: "#e1a3ee",
  base0F: "#deaf8f",
};

export interface IT1JsonTreeProps {
  data: any;
}

const T1JsonTree = React.memo(({data}: IT1JsonTreeProps) => {
  const muiTheme = useTheme();

  return (
    <Box sx={{
      '& > *': {
        background: 'transparent !important',
      },
      fontFamily: 'JetBrains Mono'
    }}>
      <JSONTree
        data={data}
        theme={theme}
        invertTheme={muiTheme.palette.mode === 'dark'}
        shouldExpandNode={() => true}
      />
    </Box>
  )
});

export default T1JsonTree;
