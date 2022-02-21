import React, { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface Wallet {
    id: number;
    description: string;
    limit: number;
    balance: number;
}

const WalletView: React.FC = () => {
    const [walletList, setWalletList] = useState<Wallet[]>([])
    const url = useSelector<{ url: string }>(state => state.url)
    const [totalBalance, setTotalBalance] = useState(0);
    const history = useHistory();
    const categories = () => {
        try {
            axios.get('/wallets',
                { baseURL: url as string }
            ).then(({ data }) => {
                setWalletList(data as Wallet[]);
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
        history.push("wallets/" + id)
    }

    const _delete = (id: number) => {
        axios.delete("/wallets/" + id, {
            baseURL: url as string
        }).then(res => {
            if (res.status === 200) {
                toast.success('Wallet deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                categories();
            }
        }).catch(error => {

        })
    }
    useEffect(categories, [url])
    useEffect(() => {
        let tempTotal = walletList.reduce((a, b) => a + b.balance, 0);
        setTotalBalance(tempTotal);
        console.log("--");

    }, [walletList])
    return (

        <div className="card table-card">
            <div className="card-header"><h3>Wallets</h3></div>
            <div className="card-body">
                <div className="card header-wallet">
                    <Link to="wallets/create" style={{ width: 200 }}>
                        <button className="button button-success">Create new</button>
                    </Link>
                    <div className="total-balance">
                        Total balance: <span> {totalBalance.toFixed(2)} MT</span>
                    </div>
                </div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>

                                <th>
                                    Description
                                </th>
                                <th>
                                    Balance
                                </th>
                                <th>
                                    Limit
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
                                        <td >{item.balance} </td>
                                        <td >{item.limit} </td>
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

export default WalletView;