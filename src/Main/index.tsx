import React from "react";
import styled from "styled-components/macro";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import Template from "./Template";
import FileLoaderSystemDialog from "./FileLoader/SystemDialog";
import FileLoaderBox from "./FileLoader/FileLoaderBox";
import FileTree from "./FileTree";
import Command from "./ffmpeg/command";

import mainHook from "./mainHook";
import { eventValue } from "./helpers";

const StyledCode = styled.code`
  white-space: pre-wrap;
  overflow: scroll;
  background-color: white;
  padding: 12px;
  flex: 1;
`;

export default React.memo(function() {
  const logRef = React.useRef<HTMLElement>(null);
  const {
    ffmpegLoaded,
    selectedFiles,
    commandApi,
    selectedFilesNotEmpty,
    localFiles,
    toggleSelectFile,
    uploadFile,
    downloadFile,
    removeFile,
    run,
  } = mainHook(logRef);

  return (
    <Template
      rightElement={
        <Box display="flex" alignItems="center">
          {selectedFilesNotEmpty && (
            <Button
              variant="contained"
              color="default"
              size="large"
              onClick={run}
            >
              run
            </Button>
          )}
        </Box>
      }
    >
      {localFiles.length === 0 ? (
        <Box
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          {ffmpegLoaded ? (
            <FileLoaderSystemDialog onFileLoaded={uploadFile}>
              {open => (
                <FileLoaderBox padding="100px 180px" onClick={open}>
                  <Typography>Click here to select file</Typography>
                </FileLoaderBox>
              )}
            </FileLoaderSystemDialog>
          ) : (
            <>
              <CircularProgress />
              <Typography>Loading FFMPEG library...</Typography>
            </>
          )}
        </Box>
      ) : (
        <Box display="flex" flex={1} height="calc(100vh - 64px)">
          <Box
            height="100%"
            width="20%"
            padding="18px"
            borderRight="1px solid lightgray"
            display="flex"
            flexDirection="column"
          >
            <FileTree
              files={localFiles}
              selectedFileNames={selectedFiles}
              newFileLoader={
                <FileLoaderSystemDialog onFileLoaded={uploadFile}>
                  {open => (
                    <FileLoaderBox padding="10px 100px" onClick={open}>
                      <Typography>Upload file</Typography>
                    </FileLoaderBox>
                  )}
                </FileLoaderSystemDialog>
              }
              downloadFile={downloadFile}
              removeFile={removeFile}
              toggleFileSelected={toggleSelectFile}
            />
          </Box>
          <Box
            height="100%"
            width="80%"
            padding="18px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box padding="18px" display="flex">
              <Box
                bgcolor="lightgray"
                marginRight="18px"
                flex={1}
                display="flex"
                alignItems="center"
                padding="0 18px"
              >
                <code>{commandApi.getString()}</code>
              </Box>
              <Box width="100px" marginBottom="2px">
                <FormControl variant="outlined" fullWidth>
                  <Select
                    value={commandApi.command.outputFileExtension}
                    onChange={eventValue(commandApi.setOutputExtension)}
                  >
                    <MenuItem value="mp4">mp4</MenuItem>
                    <MenuItem value="avi">avi</MenuItem>
                    <MenuItem value="mpg">mpg</MenuItem>
                    <MenuItem value="mkv">mkv</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box padding="18px">
              <Command
                commandArguments={commandApi.command.arguments}
                setArguments={commandApi.setArguments}
              />
            </Box>
            <Box flexDirection="column" display="flex" height="100%">
              <Box
                padding="18px"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button onClick={() => (logRef.current.innerHTML = "")}>
                  Clear logs
                </Button>
              </Box>
              <StyledCode ref={logRef} />
            </Box>
          </Box>
        </Box>
      )}
    </Template>
  );
});
