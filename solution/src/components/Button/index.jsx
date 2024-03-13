export const Button = ({ label, onClick }) => {
    return (
        <div onClick={onClick} className="button">
            {label}
        </div>
    )
}