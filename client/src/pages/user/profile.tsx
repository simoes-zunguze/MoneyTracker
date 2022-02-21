import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import { IUser } from "../../store"
const Profile: React.FC = () => {
    const history = useHistory();
    const storedUser = useSelector<{user: IUser}>(state => state.user) as IUser;

    const [user, setUser] = useState<IUser>({id: 0, firstName:"", lastName: "", password:"", confirmPassword: ""})
    const userData = ()=>{
        setUser({...storedUser, confirmPassword: ""})
    }
    
    const saveProfile = () => {
        axios.post("profile/edit", user).then(res => {
            console.log(res.data);
            if(res.status === 200){
                toast.success("Profile updated", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });  
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    history.goBack();
            }else if (res.status === 400) {
                toast.warning("Erro de validação veja se os dados estão bem preencidos", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });            
            }
           
        }).catch( error => {
                          
        })
    }

    const cancelEdit = () => {
        history.goBack();
    }

    useEffect(() => {
        userData();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="card table-card">
            <div className="card-header"><h3>Edit your profile</h3></div>
            <div className="card-body">
                <div className="card no-style">
                    <form action="" onSubmit={() => undefined}>
                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={user.firstName} onChange={e => { setUser({ ...user, firstName: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <input className="form-control" type="text" name="" id="" placeholder="" value={user.lastName} onChange={e => { setUser({ ...user, lastName: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input className="form-control" type="password" name="" id="" placeholder="" value={user.password} onChange={e => { setUser({ ...user, password: e.target.value }) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Confirm Password</label>
                            <input className="form-control" type="password" name="" id="" placeholder="" value={user.confirmPassword} onChange={e => { setUser({ ...user, confirmPassword: e.target.value }) }} />
                        </div>
                    </form>
                </div>
                <div className="card-footer no-style">
                    <button className="button button-success" onClick={saveProfile}>Save</button>
                    <button className="button button-danger" onClick={cancelEdit}>Cancel</button>
                </div>
            </div>
        </div>)
}

export default Profile