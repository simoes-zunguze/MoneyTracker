import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { ICategory } from '../../store';
import { toast } from 'react-toastify';

const NewCategory: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const [category, setCategory] = useState<ICategory>({ name: "", description: "", limit: 0 } as ICategory);
    const history = useHistory();
    const saveCategory = () => {
        axios.post("/categories", category,
            { baseURL: url as string }
        ).then(res => {
            history.push("/categories")
            toast.success('Product created!', {
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

    const cancelCategory = () => {
        // setCategory({ name: "", description: "", limit: 0 });
        history.push("/categories");
        
    }

    return (

        <div className="card table-card">
            <div className="card-header"><h3>New Category</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={category.name} onChange={e => { setCategory({ ...category, name: e.target.value }) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={category.description} onChange={e => { setCategory({ ...category, description: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Limit</label>
                            <input className="form-control" type="number" name="" id="" placeholder="" value={category.limit} onChange={e => { setCategory({ ...category, limit: (e.target.value as unknown) as number }) }} />
                        </div>
                    </form>
                </div>
                <div className="card-footer no-style">
                    <button className="button button-success" onClick={saveCategory}>Save</button>
                    <button className="button button-danger" onClick={cancelCategory}>Cancel</button>
                </div>
            </div>
        </div>)
}

export default NewCategory;