
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { IIncome, IWallet } from '../../store';
import { toast } from 'react-toastify';
import CurrencyFormat from 'react-currency-format';


const CreateIncome: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const [income, setIncome] = useState<IIncome>({ id: 0, description: "", amount: 0 });
    const [walletList, setWalletList] = useState<IWallet[]>([])

    const getWallets = () => {
        axios.get('/wallets',
            { baseURL: url as string }
        ).then(({ data }) => {
            setWalletList(data as IWallet[]);
        }).catch(error => {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        });
    }

    const saveWallet = () => {
        axios.post("/incomings/", { ...income, wallet: income.walletId },
            { baseURL: url as string }
        ).then(res => {
            toast.success('New Income added!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push("/incomes");

        }).catch(error => {
            console.error(error);
        })
    }
    const cancelExpense = () => {
        history.push("/incomes");
    }

    useEffect(() => {
        getWallets();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>New Income</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="" onSubmit={() => undefined}>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={income.description} onChange={e => { setIncome({ ...income, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Amount</label>
                            {/* <input className="form-control" type="number" name="" id="" placeholder="" value={income.amount} onChange={e => { setIncome({ ...income, amount: (e.target.value as unknown) as number }) }} /> */}
                            <CurrencyFormat
                                value={income.amount}
                                thousandSeparator=' '
                                suffix={' MT'}
                                className="form-control"
                                onValueChange={({ floatValue }) => { setIncome({ ...income, amount: floatValue }) }}
                                displayType="input"

                            />

                        </div>

                        <div className="form-group">
                            <label htmlFor="">Wallet</label>
                            <select className="form-control" name="wallets" id="" value={income.walletId} onChange={e => { setIncome({ ...income, walletId: (e.target.value as unknown) as number }) }}>
                                <option value="" selected></option>
                                {
                                    walletList.map(wallet => {
                                        return (
                                            <option key={wallet.id} value={wallet.id}>{wallet.description}</option>

                                        )
                                    })
                                }
                            </select>
                        </div>
                    </form>
                </div>
                <div className="card-footer no-style">
                    <button className="button button-success" onClick={saveWallet}>Save</button>
                    <button className="button button-danger" onClick={cancelExpense}>Cancel</button>
                </div>
            </div>
        </div>)
}

export default CreateIncome;