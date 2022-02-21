
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { ICategory } from '../../store';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';


const EditCategory: React.FC = () => {
    const url = useSelector<{ url: string }>(state => state.url)
    const [category, setCategory] = useState<ICategory>({ name: "", description: "", limit: 0 } as ICategory);
    const history = useHistory();
    const { id } = useParams<{ id: string }>()

    const getCategory = () => {
        axios.get<ICategory>(("/categories/" + id),
            { baseURL: url as string }
        ).then(res => {
            setCategory(res.data)
        }).catch(error => {
            console.error(error);
            
        })
    }

    const saveCategory = () =>{
        axios.put("/categories/"+id, category,
            {baseURL: url as string}
        ).then( res =>{
            toast.success('Product edited!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                history.push("/categories");

        }).catch(error => {
            console.error(error);
        })
    }
    const cancelCategory = () => {
        history.push("/categories");
    }

    useEffect(() => {
        getCategory()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="card table-card">
            <div className="card-header"><h3>Edit Category</h3></div>
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

export default EditCategory;