import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const DataTable = ({
  items,
  handleDelete,
  handleEdit,
  selection_itemId,
  setSelection_itemId,
}) => {
  const classes = useToolbarStyles();
  const numSelected = selection_itemId.length;

  const columns = [
    { field: "itemName", headerName: "Item name", width: 300 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "location",
      headerName: "Location",
      width: 200,
    },
    {
      field: "postingDate",
      headerName: "Posting date",
      description: "This column has a value getter and is not sortable.",
      width: 300,
    },
  ];

  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        paddingBottom: "90px",
        paddingTop: "20px",
      }}
    >
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            List of all Offers
          </Typography>
        )}

        {numSelected > 1 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : numSelected === 1 ? (
          <>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          ""
        )}
      </Toolbar>
      <DataGrid
        rows={items}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(e) => {
          setSelection_itemId(e.selectionModel);
        }}
      />
    </div>
  );
};

export default DataTable;
