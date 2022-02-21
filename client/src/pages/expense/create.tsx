
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { ICategory, IExpense, IWallet } from '../../store';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';


const EditExpense: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const [expense, setExpense] = useState<IExpense>({ id: 0, description: "", amount: 0 } as IExpense);
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [walletList, setWalletList] = useState<IWallet[]>([]);

    const [amountError, setAmountError] = useState("");
    const [descriptionError, setDescription] = useState("");

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
        resetMessages();
        axios.post("/expenses/", { ...expense, category: expense.categoryId, wallet: expense.walletId },
            { baseURL: url as string }
        ).then(res => {
            console.log(res);
            toast.success('New Expense Created!', {
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
            let errors: { msg: string, param: string }[] = error.response.data.errors;
            console.log(errors);

            errors.forEach(error => {
                switch (error.param) {
                    case "amount":
                        setAmountError(error.msg)
                        break;
                    case "description":
                        setDescription(error.msg)
                        break;
                    default:
                        break;
                }
            })
        })
    }

    const resetMessages = () => {
        setAmountError('');
        setDescription('');
    }

    const cancelExpense = () => {
        history.push("/expenses");
    }

    useEffect(() => {
        getCategories();
        getWallets();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>New Expense</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="" onSubmit={() => undefined}>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={expense.description} onChange={e => { setExpense({ ...expense, description: e.target.value }) }} />
                            <div className='error-message'>{descriptionError}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Amount</label>
                            {/* <input className="form-control" type="number" name="" id="" placeholder="" value={expense.amount} onChange={e => { setExpense({ ...expense, amount: (e.target.value as unknown) as number }) }} /> */}
                            <NumberFormat
                                value={expense.amount}
                                thousandSeparator=' '
                                mask="_"
                                suffix={' MT'}
                                className="form-control"
                                onValueChange={({ formattedValue, value }) => { setExpense({ ...expense, amount: +value }) }}
                                displayType="input"
                                decimalSeparator='.'
                                decimalScale={2}
                                fixedDecimalScale={true}

                            />

                            <div className='error-message'>{amountError}</div>

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

                        <div className="form-group">
                            <label htmlFor="">Wallet</label>
                            <select className="form-control" name="wallets" id="" value={expense.walletId} onChange={e => { setExpense({ ...expense, walletId: (e.target.value as unknown) as number }) }}>
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

export default EditExpense;