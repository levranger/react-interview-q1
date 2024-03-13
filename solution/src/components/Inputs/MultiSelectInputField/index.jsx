export const MultiselectInputField = ({ label,  value, onChange, options }) => {
    return (
        <div className='inputField'>
            { label }
            <select onChange={onChange} name={label} defaultValue={null} value={value}>
                { !value &&  <option selected={true} value={null}>Select a country</option>}
                {options.map((item, idx) =>
                    <option value={item} key={`${item}_${idx}`}>{item}</option>)
                }
            </select>
        </div>
    )
}