import { Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {
  CreateFile,
  CreateFolder,
  Delete,
  Download,
  IActionComponent,
  Redo,
  Rename,
  RequestPreviewerFullScreen,
  Undo,
  ReloadPreviewer,
} from "./actions";
import { IComponentProps } from "./types";

const exploreActions = [
  Rename,
  CreateFile,
  CreateFolder,
  Delete,
  Undo,
  Redo,
  Download,
];

const PreviewActions = [RequestPreviewerFullScreen, ReloadPreviewer];

export function ExploreMenu(props: IComponentProps) {
  return <BaseMenu title="Explore Menu" actions={exploreActions} {...props} />;
}

export function PreviewerMenu(props: IComponentProps) {
  return (
    <BaseMenu title="Previewer Menu" actions={PreviewActions} {...props} />
  );
}

interface IBaseMenuProps extends IComponentProps {
  actions: IActionComponent[];
  title: string;
}
function BaseMenu(props: IBaseMenuProps) {
  const { actions, className, style, title } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div title={title} className={className} style={style}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {actions.map((Action) => (
          <MenuItem key={Action.name}>
            <Action />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
