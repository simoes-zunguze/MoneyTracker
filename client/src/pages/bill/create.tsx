
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { ICategory, IBill, IWallet } from '../../store';
import { toast } from 'react-toastify';


const EditBill: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const [bill, setBill] = useState<IBill>({id: 0, description: "", amount: 0} as IBill);
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [walletList, setWalletList] = useState<IWallet[]>([])

    const getCategories = () => {
            axios.get('/categories',
                { baseURL: url as string }
            ).then(({ data }) => {
                setCategoryList(data as ICategory[]);                
                setBill({...bill, categoryId: categoryList[0].id});

            }).catch(error => {
                if (axios.isAxiosError(error)) {
                    console.error(error);
                } else {
                    console.error(error);
                }
            });
    }

    const getWallets = () => {
        axios.get('/wallets',
            { baseURL: url as string }
        ).then(({ data }) => {
            setWalletList(data as IWallet[]);
            setBill({...bill, walletId: walletList[0].id});
        }).catch(error => {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        });
    }

    const saveBill = () => {
        axios.post("/bills/", {...bill, category: bill.categoryId, wallet: bill.walletId},
            { baseURL: url as string }
        ).then(res => {
            toast.success('New Bill Created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push("/bills");

        }).catch(error => {
            console.error(error);
        })
    }
    const cancelBill = () => {
        history.push("/bills");
    }

    useEffect(() => {
        getCategories();
        getWallets();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>New Bill</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="" onSubmit={()=> undefined}>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={bill.description} onChange={e => { setBill({ ...bill, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label>Amount</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={bill.amount} onChange={e => { setBill({ ...bill, amount: (e.target.value as unknown) as number }) }} />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select className="form-control" name="category" id="" value={bill.categoryId} onChange = {e => {setBill({ ...bill, categoryId: (e.target.value as unknown) as number }) }}>
                                <option value="" selected></option>
                                {
                                    categoryList.map( category => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Wallet</label>
                            
                            <select className="form-control" name="wallets" id="" value={bill.walletId} onChange = {e => {setBill({ ...bill, walletId: (e.target.value as unknown) as number })}}>
                            <option value="" selected></option>

                                {
                                    walletList.map( wallet => {
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
                    <button className="button button-success" onClick={saveBill}>Save</button>
                    <button className="button button-danger" onClick={cancelBill}>Cancel</button>
                </div>
            </div>
        </div>)
}

export default EditBill;