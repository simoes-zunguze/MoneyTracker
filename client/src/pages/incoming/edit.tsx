
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router';
import { IIncome } from '../../store';
import { toast } from 'react-toastify';


const CreateIncome: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const [income, setIncome] = useState<IIncome>({id:0, amount: 0, description: ""})
    const { id } = useParams<{id: string}>();
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


    const getIncome = () => {
        axios.get<IIncome>('/incomings/'+id,
            { baseURL: url as string }
        ).then(res => {
            setIncome({...res.data, walletId: res.data.wallet?.id});
            // console.log(data);
            
        }).catch(error => {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        });
    }

    const saveWallet = () => {
        axios.put("/incomings/"+id, {...income},
            { baseURL: url as string }
        ).then(res => {
            toast.success('Income edited!', {
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
        getIncome();
        getWallets();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>Edit Income</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="" onSubmit={()=> undefined}>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={income.description} onChange={e => { setIncome({ ...income, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Amount</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={income.amount} onChange={e => { setIncome({ ...income, amount: (e.target.value as unknown) as number }) }} />
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