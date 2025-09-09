type ButtonPropsType = {
    value: string,
    onClick?: () => void,
    disabled?: boolean,
    className?: string,
}

export const Button = ({value, onClick, disabled, className}: ButtonPropsType) => {
    return (
        <button className={className} disabled={disabled} onClick={onClick}>{value}</button>
    )
}