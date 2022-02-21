
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { IWallet } from '../../store';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';


const EditCategory: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const [wallet, setCategory] = useState<IWallet>({ balance: 0, description: "", limit: 0 } as IWallet);
    const history = useHistory();
    const { id } = useParams<{ id: string }>()

    const getCategory = () => {
        axios.get<IWallet>(("/wallets/" + id),
            { baseURL: url as string }
        ).then(res => {
            setCategory(res.data)
        }).catch(error => {
            console.error(error);

        })
    }


    const saveWallet = () => {
        axios.put("/wallets/" + id, wallet,
            { baseURL: url as string }
        ).then(res => {
            toast.success('Wallet edited!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push("/wallets");

        }).catch(error => {
            console.error(error);
        })
    }
    const cancelCategory = () => {
        history.push("/wallets");
    }

    useEffect(() => {
        getCategory()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>Edit Wallet</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={wallet.description} onChange={e => { setCategory({ ...wallet, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Balance</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={wallet.balance} onChange={e => { setCategory({ ...wallet, balance: (e.target.value as unknown) as number }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Limit</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={wallet.limit} onChange={e => { setCategory({ ...wallet, limit: (e.target.value as unknown) as number }) }} />
                        </div>
                    </form>
                </div>
                <div className="card-footer no-style">
                    <button className="button button-success" onClick={saveWallet}>Save</button>
                    <button className="button button-danger" onClick={cancelCategory}>Cancel</button>
                </div>
            </div>
        </div>)
}

export default EditCategory;