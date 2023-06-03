import Checkbox from '@mui/material/Checkbox';
import {ChangeEvent} from "react";

type PropsType = {
    checked: boolean;
    onChange: (isChecked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
};

export function SuperCheckBox(props: PropsType) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCheckedValue = e.target.checked;
        const event = e as ChangeEvent<HTMLInputElement>;
        props.onChange(newCheckedValue, event);
    };

    return (
        <Checkbox checked={props.checked} onChange={handleChange} />
    );
}