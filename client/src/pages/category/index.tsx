import React, { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface Category {
    id: number;
    name: string;
    description: string;
    limit: number
}

const CategoryView: React.FC = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const url = useSelector<{ url: string }>(state => state.url)
    const history = useHistory();
    const categories = () => {
        try {
            axios.get('/categories',
                { baseURL: url as string }
            ).then(({ data }) => {
                setCategoryList(data as Category[]);
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }
        }
    }

    const _edit = (id: number) =>{
        history.push("categories/"+id)
    }

    const _delete = (id: number) =>{
       axios.delete("/categories/"+id,{
           baseURL: url as string
       }).then(res => {
            if(res.status === 200){
                toast.success('Category deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    categories();

            }
       }).catch(error => {

       })
    }
    useEffect(categories, [url])
    return (

        <div className="card table-card">
            <div className="card-header"><h3>Categories</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <Link to="categories/create">
                        <button className="button button-success">Create new</button>
                    </Link>
                </div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Limit
                                </th>
                                <th style={{width: "100px"}}>
                                    Action
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {categoryList.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td >{item.id} </td>
                                        <td >{item.name} </td>
                                        <td >{item.description} </td>
                                        <td >{item.limit} </td>
                                        <td>
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <button className="button button-primary" onClick={()=>_edit(item.id)}>Edit</button>
                                                <button className="button button-danger" onClick={()=>_delete(item.id)}>Delete</button>
                                            </div>
                                           
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}

export default CategoryView;