import {SxProps} from "@mui/material";

export const containerSx: SxProps = {
    display: "flex",
    justifyContent: "space-between",
}

export const containerWithGapSx2: SxProps = {
    ...containerSx,
    gap: "5px",
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    fontWeight: isDone ? "normal" : "bold",
    opacity: isDone ? 0.5 : 1,
})
