import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    currentTitle: string
    changeTitle: (newTitle: string) => void
    classes?: string
}

export const EditableSpan = ({currentTitle, changeTitle, classes}: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [itemTitle, setItemTitle] = useState<string>(currentTitle)

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode (false)
        changeTitle(itemTitle)
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const changeItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        isEditMode
            ? <TextField variant="outlined"
                         size="small"
                         autoFocus
                         value={itemTitle}
                         onChange={changeItemTitleHandler}
                         onBlur={offEditMode}
                         onKeyDown={changeItemOnEnterHandler}
            />
            : <span
                onDoubleClick={() => onEditMode()}
                className={classes ? classes : ""}>{currentTitle}</span>

    )
}