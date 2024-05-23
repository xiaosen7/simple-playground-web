import * as React from "react";
import { Previewer } from "./previewer";
import { Meta } from "@storybook/react";
import { PlaygroundProvider, PlaygroundProviderBuilder } from "../provider";
import { Paper, Stack } from "@mui/material";
import { usePlayground } from "../hooks/playground";
import { Playground } from "@simple-playground-web/playground";
import { once, range } from "lodash-es";

export default {
  component: Previewer,
} satisfies Meta<typeof Previewer>;

export const Base = () => {
  return (
    <PlaygroundProviderBuilder cwd="/src/playgrounds/1">
      <Previewer />
    </PlaygroundProviderBuilder>
  );
};

export const RuntimeInfo = () => {
  const playground = React.useMemo(
    () => Playground.create({ cwd: "/src/playgrounds/1" }),
    []
  );

  React.useEffect(() => {
    const existingCode = playground.explore.readFileSync("index.tsx", "utf-8");

    playground.explore.writeFileSync(
      "index.tsx",
      `

      const div = document.createElement('div');
      div.textContent = "hello world";
      document.body.append(div);


      ${range(100)
        .map((i) => `console.log('hello world ${i}')`)
        .join("\n")}

      console.error('some error logs'); 
      console.error('some error logs2'); 
      
      throw new Error('some error happens');
    `
    );

    return () => {
      playground.explore.writeFileSync("index.tsx", existingCode);
    };
  });

  return (
    <PlaygroundProvider value={playground}>
      <Stack spacing={2}>
        <Paper>
          <Previewer />
        </Paper>

        <Paper>
          <Previewer.Console height={300} />
        </Paper>
      </Stack>
    </PlaygroundProvider>
  );
};
