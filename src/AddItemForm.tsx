import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type AddItemPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo ((props: AddItemPropsType) => {
    console.log('addItemForm render')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const miStules = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px',
    }

    return (
        <div className={'textfild-container '}>
            <TextField
                error={!!error}
                size='small'
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                id="outlined-basic"
                label={!!error ? 'Title is required' : ''}
                variant="outlined"
            />
            <Button style={miStules} variant="contained" onClick={addTask}>+</Button>
        </div>
    )
})

export default AddItemForm;