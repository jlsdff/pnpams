/** @format */

import { Lavishly_Yours } from "next/font/google";

type Props = {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    date: string;
    timeIn: string;
    timeOut: string;
    status?: string;
};
export default function TableRow({
    id,
    firstName,
    lastName,
    middleName,
    timeIn,
    date,
    timeOut,
    status,
}: Props): JSX.Element {

    const timeInDate = new Date(`${date} ${timeIn}`);
    const timeOutDate = new Date(`${date} ${timeOut}`);

    return <tr>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{middleName.charAt(0)}.</td>
        <td>{timeInDate.toLocaleDateString()}</td>
        <td>{timeInDate.toLocaleTimeString()}</td>
        <td>{timeOutDate.toLocaleTimeString()}</td>
        <td>{status && "status here"}</td>
    </tr>;
}
