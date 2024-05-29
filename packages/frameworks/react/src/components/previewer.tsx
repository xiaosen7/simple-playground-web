import React, { useEffect, useMemo, useRef, useState } from "react";
import { IComponentProps } from "./types";
import { useDebounceFn, useMap, useMount, useUpdate } from "ahooks";
import { usePlayground } from "../hooks/playground";
import { useObservable, useObservableValues, useSubs } from "../hooks";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  StackProps,
  Tab,
  Tabs,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import classNames from "classnames";
import DockLayout from "rc-dock";
import { styled } from "@mui/material/styles";
import {
  CONSOLE_STREAM_NAMES,
  IConsoleStreamName,
} from "@simple-playground-web/renderers";
import { combineLatest, map, merge, zip } from "rxjs";
import { startCase, upperCase } from "lodash-es";

export interface IPreviewerProps extends IComponentProps {}

export function Previewer(props: IPreviewerProps) {
  const previewerRef = useRef(null);
  const playground = usePlayground();

  const previewState = useObservable(playground.previewer.state$);
  const buildState = useObservable(playground.buildState$);

  useMount(() => {
    playground.previewer.render(previewerRef.current!);
  });

  return (
    <div
      {...props}
      hidden={buildState !== playground.EBuildState.Done}
      className={classNames("flex flex-col", props.className)}
      ref={previewerRef}
      aria-label="previewer"
    ></div>
  );
}

export interface IConsoleStreamProps extends StackProps {}

/**
 * This component will only be rendered when render previewer
 * @param props
 * @returns
 */
function Console(props: IConsoleStreamProps) {
  const playground = usePlayground();

  const [activeName, setActiveName] = useState<IConsoleStreamName>("log");
  const nameToLogsMap = useRef<Map<IConsoleStreamName, any[][]>>(new Map());
  const newLogNamesRef = useRef<Set<IConsoleStreamName>>(new Set());
  const update = useUpdate();
  const theme = useTheme();

  const console$ = useMemo(() => {
    return merge(
      ...CONSOLE_STREAM_NAMES.map((name) =>
        playground.previewer.console[`${name}$`].pipe(
          map((value) => ({ name, value }))
        )
      ),
      playground.previewer.error$.pipe(
        map((value) => ({ name: "error" as const, value: [value] }))
      )
    );
  }, []);

  useSubs(console$, (value) => {
    const { name, value: logArgs } = value;
    const existingLogs = nameToLogsMap.current.get(name) ?? [];
    nameToLogsMap.current.set(name, [...existingLogs, logArgs]);

    newLogNamesRef.current.add(name);

    update();
  });

  useSubs(playground.previewer.state$, (state) => {
    if (state === playground.previewer.EState.Loading) {
      nameToLogsMap.current.clear();
      newLogNamesRef.current.clear();
      update();
    }
  });
  return (
    <Stack {...props}>
      <Tabs
        onMouseOver={() => {
          if (newLogNamesRef.current.has(activeName)) {
            newLogNamesRef.current.delete(activeName);
            update();
          }
        }}
        value={activeName}
        onChange={(_, name) => {
          newLogNamesRef.current.delete(name);
          setActiveName(name);
        }}
        aria-label="console"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {CONSOLE_STREAM_NAMES.map((name) => (
          <Tab
            key={name}
            label={
              <Badge
                color={
                  !newLogNamesRef.current.has(name)
                    ? "default"
                    : name === "error"
                      ? "error"
                      : "info"
                }
                variant="dot"
              >
                {startCase(name)}
              </Badge>
            }
            value={name}
            aria-controls={name}
          />
        ))}
      </Tabs>
      <Box className="flex-1 overflow-auto">
        {nameToLogsMap.current.get(activeName)?.map((logs, index) => (
          <React.Fragment key={index}>
            <Typography
              padding={theme.spacing(1)}
              paddingX={theme.spacing(2)}
              style={{ wordWrap: "break-word" }}
              color={
                activeName === "error"
                  ? theme.palette.error.main
                  : theme.palette.text.secondary
              }
            >
              {logs.join(" ")}
            </Typography>
            <Divider variant="middle" />
          </React.Fragment>
        ))}
      </Box>
    </Stack>
  );
}

Previewer.Console = Console;

const Item = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.error.light,
}));

Previewer.Error = Error;
