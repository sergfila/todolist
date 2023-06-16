import type {Meta, StoryObj} from '@storybook/react';
import AddItemForm from './AddItemForm';
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const meta: Meta<typeof AddItemForm> = {
    title: 'Components/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotError: Story = {
    args: {

    }
}

type ErrorProps = {
    addItem: (title: string) => void;
}

const ErrorContent: React.FC<ErrorProps> = ({ addItem }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>('Title is required');

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
            addItem(title.trim());
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
    );
}

export const Error: Story = {
    render: (args) => {
        return (
            <ErrorContent addItem={args.addItem} />
        );
    }
}
