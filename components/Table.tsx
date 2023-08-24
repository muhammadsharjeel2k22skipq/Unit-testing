'use client';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';

const Table = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("http://localhost:3333/data/all");
            setData(res.data);
        }
        getData();
    },[]);

  return (
    <div>
        <table className='mt-7 border-collapse w-full'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item:any,i) => (
                    <tr key={i}>
                        <td>{item?.name}</td>
                        <td>{item?.country}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table;
