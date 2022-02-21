import React, { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IBill } from "../../store";


const ExpenseView: React.FC = () => {
    const [billList, setBillList] = useState<IBill[]>([])
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const bills = () => {
        try {
            axios.get('/bills',
                { baseURL: url as string }
            ).then(({ data }) => {
                setBillList(data as IBill[]);
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        }
    }

    const _edit = (id: number) =>{
        history.push("bills/"+id)
    }

    const _delete = (id: number) =>{
       axios.delete("/bills/"+id,{
           baseURL: url as string
       }).then(res => {
            if(res.status === 200){
                toast.success('Bill deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    bills();
            }
       }).catch(error => {

       })
    }
    useEffect(bills, [url])
    return (
        <>
        <div className="card">
            <h1>
                Bills page not ready yet...
            </h1>
        </div>
        <div className="card table-card" style={{display:"none"}}>
            <div className="card-header" ><h3>Bills</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <Link to="bills/create">
                        <button className="button button-success">Create new</button>
                    </Link>
                </div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>

                                <th>
                                    Description
                                </th>
                                <th>
                                    Amount
                                </th>
                                <th>
                                    Category
                                </th>
                                <th>
                                    Wallet
                                </th>
                                <th style={{width: "100px"}}>
                                    Action
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {billList.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td >{item.description} </td>
                                        <td >{item.amount} </td>
                                        <td >{item.category?.name} </td>
                                        <td >{item.wallet?.description} </td>
                                        <td>
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <button className="button button-primary" onClick={()=>_edit(item.id)}>Edit</button>
                                                <button className="button button-danger" onClick={()=>_delete(item.id)}>Delete</button>
                                            </div>
                                           
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
        )
}

export default ExpenseView;