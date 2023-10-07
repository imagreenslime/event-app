import React from 'react'
import { Table } from 'react-bootstrap';

export default function TableList({meetData}){
    if (meetData.length !== undefined){
        return (
            <Table>
            <thead>
                <tr>
                <th className="col-1">Federation</th>
                <th className="col-8">Name</th>
                <th className="col-1">When</th>
                <th className="col-2">State</th>
                </tr>
            </thead>
            <tbody>
            {meetData.map((item) => (
            <tr>
                <td >{item.federation}</td>
                <td><a class="text-dark" href={item.link} >{item.name}</a></td>
                <td>{item.date}</td>
                <td>{item.state}</td>
            </tr>
            ))}
            </tbody>
        </Table>
        )
    }
}