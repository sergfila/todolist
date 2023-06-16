import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan render')

    const [editMode, setEditMode] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')

    const changeMode = () => {
        setTitle(props.title)
        setEditMode(!editMode)
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <span onDoubleClick={changeMode}>{props.title}</span>
            : <input
                value={title}
                onChange={onChangeTitleHandler}
                autoFocus
                onBlur={changeMode}
                />
    )
})