export interface ButtonProps {
    className?: string;
    title: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit';
    block?: boolean;
}

export { PrimaryButton } from './PrimaryButton';
export { SecondaryButton } from './SecondaryButton';
