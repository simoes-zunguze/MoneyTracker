import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { IWallet } from '../../store';
import { toast } from 'react-toastify';

const NewCategory: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const [wallet, setWallet] = useState<IWallet>({ balance: 0, description: "", limit: 0 } as IWallet);
    const history = useHistory();
    const saveWallet = () => {
        axios.post("/wallets", wallet,
            { baseURL: url as string }
        ).then(res => {
            history.push("/wallets")
            toast.success('Wallet created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch(error => {
            console.error(error);
        })
    }

    const cancelWallet = () => {
        history.push("/wallets");
        
    }

    return (

        <div className="card table-card">
            <div className="card-header"><h3>New Wallet</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={wallet.description} onChange={e => { setWallet({ ...wallet, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Balance</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={wallet.balance} onChange={e => { setWallet({ ...wallet, balance: (e.target.value as unknown) as number }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Limit</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={wallet.limit} onChange={e => { setWallet({ ...wallet, limit: (e.target.value as unknown) as number }) }} />
                        </div>
                    </form>
                </div>
                <div className="card-footer no-style">
                    <button className="button button-success" onClick={saveWallet}>Save</button>
                    <button className="button button-danger" onClick={cancelWallet}>Cancel</button>
                </div>
            </div>
        </div>)
}

export default NewCategory;