import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type PropsType = {
    createItem: (title: string ) => void,
}

export const CreateItemForm = ({createItem}: PropsType) => {
    const [itemTitle, setItemTitle] = useState<string>("");
    const [error, setError] = useState(false)

    const maxTitleLength = 15

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(false)
    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            createItem(itemTitle)
        } else {
            setError(true)
        }
        setItemTitle('')
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }
    return (
        <div>
            <input className={error ? 'error' : ''}
                   placeholder={"Enter task title"}
                   value={itemTitle}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}
            />
            <Button
                value="+"
                disabled={itemTitle === "" || itemTitle.length > maxTitleLength}
                onClick={createItemHandler}
            />
            {error && <div className={'error-message'}>{error}</div>}
            {itemTitle && itemTitle.length <= maxTitleLength && <div>max {maxTitleLength} characters</div>}
            {itemTitle.length > maxTitleLength && <div className={"error-message"}>! title is too long !</div>}
        </div>
    )
}