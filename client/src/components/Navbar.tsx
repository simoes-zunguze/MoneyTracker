import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { IUser, IWallet } from "../store";

interface Props {
    logout: () => void
}
const Navabar: React.FC<Props> = ({ logout }) => {
    const history = useHistory();
    const [wallets, setWallets] = useState<IWallet[]>([]);
    const user = useSelector<{ user: IUser }>(state => state.user) as IUser
    const profile = () => {
        history.push("/profile");
    }
    const getWallets = () => {
        axios.get("/wallets").then(res => {
            setWallets(res.data as IWallet[]);
        }).catch(e => {
            // toast.error("Connection error", {
            //     position: "top-right",
            //     autoClose: 2500,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        })
    }

    const seeBalance = () => {
        for (let index = 0; index < wallets.length; index++) {
            let wallet = wallets[index];
            toast.info(wallet.description + ": " + wallet.balance, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        seeBalance();
    }, [wallets])

    return (
        <>
            <div className="nav-bar">
                <div className="notification-wrapper">
                    <i className="fa fa-eye" onClick={getWallets}></i>
                </div>

                <div className="profile-wrapper">
                    <i className="fa fa-user"></i>
                    <ul className="profile-options">
                        <li>
                            <i className="fa fa-user"></i>
                            {user.firstName}
                        </li>
                        <li onClick={profile}>
                            <i className="fa fa-user-cog"></i>
                            Profile
                        </li>
                        <li>
                            <i className="fa fa-info-circle"></i>
                            Info
                        </li>
                        <li onClick={logout}>
                            <i className="fa fa-sign-out-alt"></i>
                            logout
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navabar;