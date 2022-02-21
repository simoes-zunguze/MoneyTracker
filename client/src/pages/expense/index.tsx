import React, { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IExpense } from "../../store";
import { getDate, getDateTime } from "../../utils/date";
import DatePicker from "react-datepicker";
import { Format } from "../../utils/format";

import "react-datepicker/dist/react-datepicker.css";


const moneyFormat = Format.getMoneyInstance();

const ExpenseView: React.FC = () => {
    const [walletList, setExpenseList] = useState<IExpense[]>([])
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());

    const handleDate= (date: Date) =>{

        setStartDate(date);
    }

    const expenses = () => {
        const date = getDate(startDate);
        console.log(date);

                
        try {
            axios.get('/expenses',
                { baseURL: url as string,
                    params: {
                        date: date
                    }
                }
            ).then(({ data }) => {
                setExpenseList(data as IExpense[]);
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        }
    }

    const _edit = (id: number) => {
        history.push("expenses/" + id)
    }

    const _delete = (id: number) => {
        axios.delete("/expenses/" + id, {
            baseURL: url as string
        }).then(res => {
            if (res.status === 200) {
                toast.success('Expense deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                expenses();
            }
        }).catch(error => {

        })
    }
    
    useEffect(expenses, [url, startDate])

    return (

        <div className="card table-card">
            <div className="card-header"><h3>Expenses</h3></div>
            <div className="card-body">
                <div className="taskbar">
                    
                    <Link className="link" to="expenses/create">
                        <button className="button button-success">Create new</button>
                    </Link>

                    <DatePicker
                        className="date-picker"
                        selected={startDate}
                        onChange={(date) => handleDate(date as Date)}
                        dateFormat="MMMM, yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        placeholderText="Click to select a date"
                    />
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
                                <th>
                                    Date
                                </th>
                                <th style={{ width: "100px" }}>
                                    Action
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {walletList.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td >{item.description} </td>
                                        <td >{moneyFormat.format(item.amount)} </td>
                                        <td >{item.category?.name} </td>
                                        <td >{item.wallet?.description} </td>
                                        <td >{getDateTime(new Date(item.created_at))} </td>

                                        <td>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <button className="button button-primary" onClick={() => _edit(item.id)}>Edit</button>
                                                <button className="button button-danger" onClick={() => _delete(item.id)}>Delete</button>
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
        </div>)
}

export default ExpenseView;