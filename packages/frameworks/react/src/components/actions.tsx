import React, { ReactNode, useState } from "react";
import { IComponentProps } from "./types";
import { usePlayground } from "../hooks/playground";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import * as prettier from "prettier/standalone";
import prettierPluginTypescript from "prettier/plugins/typescript";
import prettierPluginEstree from "prettier/plugins/estree";
import { useObservable, useSubsUpdate } from "../hooks";
import { basename, dirname, join } from "@simple-playground-web/path";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { snakeCase, startCase } from "lodash-es";

interface IActionProps extends IComponentProps {
  title: string;
  Icon: React.ComponentType;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Base action component UI for all actions
 * @param props
 * @returns
 */
export function Action(props: IActionProps) {
  const { Icon, title, className, onClick, style, disabled } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        className="flex"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Button
          disabled={disabled}
          aria-label={title}
          className={className}
          style={{ minWidth: 0, ...style }}
          onClick={onClick}
        >
          <Icon />
        </Button>
      </div>

      <Popover
        id={`popover-id-for-${title}`}
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography fontSize={14} sx={{ p: 1 }}>
          {startCase(title)}
        </Typography>
      </Popover>
    </>
  );
}

type IActionComponent = React.ComponentType<IComponentProps>;

export interface IDialogActionProps extends Omit<IActionProps, "onClick"> {
  renderDialog: (options: {
    open: boolean;
    setOpen: (value: boolean) => void;
  }) => React.ReactNode;
}
/**
 * Base dialog action component UI for all dialog actions
 * @param props
 * @returns
 */
export const DialogAction = (props: IDialogActionProps) => {
  const [open, setOpen] = useState(false);
  const { disabled, renderDialog, Icon, title, className, style } = props;

  return (
    <>
      <Action
        style={style}
        onClick={() => setOpen(true)}
        disabled={disabled}
        Icon={Icon}
        title={title}
        className={className}
      />

      {renderDialog({ open, setOpen })}
    </>
  );
};

export const ReloadPreviewer: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();

  return (
    <Action
      title="ReloadPreviewer"
      Icon={RefreshIcon}
      onClick={() => playground.previewer.reload()}
      {...props}
    />
  );
};

export const RequestPreviewerFullScreen: IActionComponent = (
  props: IComponentProps
) => {
  const playground = usePlayground();
  const disabled =
    useObservable(playground.previewer.state$) ===
    playground.previewer.EState.Loading;
  return (
    <Action
      title="RequestPreviewerFullScreen"
      Icon={FullscreenIcon}
      disabled={disabled}
      onClick={() => playground.previewer.requestFullscreen()}
      {...props}
    />
  );
};

export const FormatCode: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();
  return (
    <Action
      {...props}
      title="FormatCode"
      Icon={CodeIcon}
      onClick={async () => {
        const code = playground.editor.getValue();
        const formatted = await prettier.format(code, {
          parser: "typescript",
          plugins: [prettierPluginEstree, prettierPluginTypescript],
        });

        playground.editor.setValue(formatted);
      }}
    />
  );
};

export const Rename: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();
  const selectedPath = useObservable(playground.selectedPath$);
  const disabled = !selectedPath;

  return (
    <DialogAction
      disabled={disabled}
      renderDialog={({ open, setOpen }) => {
        return (
          <InputDialog
            defaultValue={basename(selectedPath!)}
            description={`Rename "${basename(selectedPath!)}"`}
            onSubmit={(newName) => {
              if (newName !== basename(selectedPath!)) {
                const oldName = basename(selectedPath!);

                playground.explore.renameSync(
                  join(dirname(selectedPath!), oldName),
                  join(dirname(selectedPath!), newName)
                );
              }

              setOpen(false);
            }}
            open={open}
            onClose={() => setOpen(false)}
          />
        );
      }}
      title="Rename"
      Icon={DriveFileRenameOutlineIcon}
      {...props}
    />
  );
};

export const CreateFolder: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();
  const selectedPath = useObservable(playground.selectedPath$);
  const disabled = !selectedPath;

  return (
    <DialogAction
      disabled={disabled}
      renderDialog={({ open, setOpen }) => {
        return (
          <InputDialog
            defaultValue={""}
            description={`CreateFolder`}
            onSubmit={(name) => {
              let parentPath: string;
              if (playground.explore.isDirectory(selectedPath!)) {
                parentPath = selectedPath!;
              } else {
                parentPath = dirname(selectedPath!);
              }

              playground.explore.mkdirSync(join(parentPath, name));

              setOpen(false);
            }}
            open={open}
            onClose={() => setOpen(false)}
          />
        );
      }}
      title="CreateFolder"
      Icon={CreateNewFolderIcon}
      {...props}
    />
  );
};

export const CreateFile: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();
  const selectedPath = useObservable(playground.selectedPath$);
  const disabled = !selectedPath;

  return (
    <DialogAction
      disabled={disabled}
      renderDialog={({ open, setOpen }) => {
        return (
          <InputDialog
            defaultValue={""}
            description={`CreateFile`}
            onSubmit={(name) => {
              let parentPath: string;
              if (playground.explore.isDirectory(selectedPath!)) {
                parentPath = selectedPath!;
              } else {
                parentPath = dirname(selectedPath!);
              }

              playground.explore.writeFileSync(join(parentPath, name), "");
              setOpen(false);
            }}
            open={open}
            onClose={() => setOpen(false)}
          />
        );
      }}
      title="CreateFile"
      Icon={NoteAddIcon}
      {...props}
    />
  );
};

export const Redo: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();
  const hasRedo = playground.explore.hasRedo();
  const disabled = !hasRedo;
  useSubsUpdate(playground.explore.change$);

  console.log({ disabled, hasRedo });
  return (
    <Action
      disabled={disabled}
      title="Redo"
      Icon={RedoIcon}
      onClick={() => playground.explore.redo()}
      {...props}
    />
  );
};

export const Undo: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();
  const hasUndo = playground.explore.hasUndo();
  const disabled = !hasUndo;
  useSubsUpdate(playground.explore.change$);

  console.log({ disabled, hasRedo: hasUndo });
  return (
    <Action
      disabled={disabled}
      title="Undo"
      Icon={UndoIcon}
      onClick={() => playground.explore.undo()}
      {...props}
    />
  );
};

export const Delete: IActionComponent = (props: IComponentProps) => {
  const playground = usePlayground();
  const selectedPath = useObservable(playground.selectedPath$);
  const disabled = !selectedPath;

  return (
    <DialogAction
      disabled={disabled}
      renderDialog={({ open, setOpen }) => {
        return (
          <ConfirmDialog
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={() => {
              if (playground.explore.isDirectory(selectedPath!)) {
                playground.explore.rmdirSync(selectedPath!);
              } else {
                playground.explore.unlinkSync(selectedPath!);
              }
              setOpen(false);
            }}
            description={`Are you sure to delete "${selectedPath}"?`}
          />
        );
      }}
      title="Delete"
      Icon={DeleteIcon}
      {...props}
    />
  );
};
//#region Common UI

const ConfirmDialog = (
  props: Omit<DialogProps, "PaperProps" | "onSubmit" | "close"> & {
    description: string;
    onClose: () => void;
    onSubmit: () => void;
  }
) => {
  const { description, onSubmit, ...dialogProps } = props;

  return (
    <Dialog fullWidth {...dialogProps}>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose?.()}>Cancel</Button>
        <Button onClick={() => onSubmit()}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

const InputDialog = (
  props: Omit<DialogProps, "PaperProps" | "onSubmit" | "close"> & {
    onSubmit: (name: string) => void;
    defaultValue: string;
    description: string;
    onClose: () => void;
  }
) => {
  const { onSubmit, defaultValue, description, ...dialogProps } = props;

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const name = formJson.name.trim();
          onSubmit(name);
        },
      }}
    >
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          defaultValue={defaultValue}
          fullWidth
          name="name"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose?.()}>Cancel</Button>
        <Button type="submit">Ok</Button>
      </DialogActions>
    </Dialog>
  );
};
//#endregion
