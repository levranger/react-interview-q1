export const Table = ({ data }) => {
    return (
        <table className="userTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
            { data?.map(({ name, country}) => (
                <tr>
                    <td>{name}</td>
                    <td>{country}</td>
                </tr>
            ))}

            </tbody>
        </table>
    )
}