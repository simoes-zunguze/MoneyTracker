
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { ICategory, IExpense } from '../../store';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';


const EditExpense: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [expense, setExpense] = useState<IExpense>({ id: 0, description: "", amount: 0 } as IExpense);
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

    const getExpense = () => {
        axios.get<IExpense>(("/expenses/" + id),
            { baseURL: url as string }
        ).then(res => {
            setExpense({ ...res.data, categoryId: res.data.category?.id, walletId: res.data.wallet?.id })
        }).catch(error => {
            console.error(error);
        })
    }


    const saveWallet = () => {
        axios.put("/expenses/" + id, { ...expense, category: expense.categoryId, wallet: expense.walletId },
            { baseURL: url as string }
        ).then(res => {
            toast.success('Expense edited!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push("/expenses");

        }).catch(error => {
            console.error(error);
        })
    }
    const cancelExpense = () => {
        history.push("/expenses");
    }

    useEffect(() => {
        getExpense();
        getCategories();
        getWallets();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>Edit Expense</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="" onSubmit={() => undefined}>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={expense.description} onChange={e => { setExpense({ ...expense, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Amount</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={expense.amount} onChange={e => { setExpense({ ...expense, amount: (e.target.value as unknown) as number }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Category</label>
                            <select className="form-control" name="category" id="" value={expense.categoryId} onChange={e => { setExpense({ ...expense, categoryId: (e.target.value as unknown) as number }) }}>
                                <option value="" selected></option>
                                {
                                    categoryList.map(category => {
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
                    <button className="button button-success" onClick={saveWallet}>Save</button>
                    <button className="button button-danger" onClick={cancelExpense}>Cancel</button>
                </div>
            </div>
        </div>)
}

export default EditExpense;