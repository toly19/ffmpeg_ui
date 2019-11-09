import React from "react";
import Box from "@material-ui/core/Box";

import Resize from "./components/Resize";
import Extract from "./components/Extract";
import { AudioCodec, VideoCodec } from "./components/Codecs";

import { CommandControllerInterface } from "./useCommand";

export default React.memo(function(props: CommandControllerInterface) {
  return (
    <Box display="flex" flexWrap="wrap">
      <Resize {...props} />
      <Extract {...props} />
      <VideoCodec {...props} />
      <AudioCodec {...props} />
    </Box>
  );
});
