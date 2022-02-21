
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { ICategory, IBill } from '../../store';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';


const EditBill: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [bill, setBill] = useState<IBill>({id: 0, description: "", amount: 0} as IBill);
    const [categoryList, setCategoryList] = useState<ICategory[]>([])

    const getCategories = () => {
            axios.get('/categories',
                { baseURL: url as string }
            ).then(({ data }) => {
                setCategoryList(data as ICategory[]);
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
        }).catch(error => {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        });
    }

    const saveBill = () => {
        axios.put("/bills/"+id, {...bill, category: bill.categoryId, wallet: bill.walletId},
            { baseURL: url as string }
        ).then(res => {
            toast.success('Bill Edited!', {
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

    const getBill = () => {
        axios.get('/bills/'+id,
            { baseURL: url as string }
        ).then(({ data }) => {
            setBill(data as IBill);
        }).catch(error => {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        });
    }

    const cancelBill = () => {
        history.push("/bills");
    }

    useEffect(() => {
        getCategories();
        getWallets();
        getBill();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>Edit Bill</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="" onSubmit={()=> undefined}>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={bill.description} onChange={e => { setBill({ ...bill, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Amount</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={bill.amount} onChange={e => { setBill({ ...bill, amount: (e.target.value as unknown) as number }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Category</label>
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