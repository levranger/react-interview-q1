export const InputField = ({ label,  value, onChange }) => {
    return (
        <div className='inputField'>
            { label }
            <input name={label} value={value} onChange={onChange} />
        </div>
    )
}