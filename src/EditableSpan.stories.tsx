import type { Meta, StoryObj } from '@storybook/react';
import {EditableSpan} from "./EditableSpan";

const meta: Meta<typeof EditableSpan> = {
    title: 'Components/EditableSpan',
    component: EditableSpan,
    // tags: ['autodocs'],
    argTypes: {

    }
};

export default meta;

type Story = StoryObj<typeof meta>

export const empty: Story = {
    args: {
        title: '',
    }
}

export const filled: Story = {
    args: {
        title: 'default value',
    }
}