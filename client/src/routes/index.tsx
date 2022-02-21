import {
    Route,
    Switch,
} from "react-router-dom";
import Category from "../pages/category";
import CreateCategory from "../pages/category/create";
import EditCategory from "../pages/category/edit";

import Wallet from "../pages/wallet";
import CreateWallet from "../pages/wallet/create";
import EditWallet from "../pages/wallet/edit";

import Expense from "../pages/expense"
import EditExpense from "../pages/expense/edit";
import CreateExpense from "../pages/expense/create";

import Income from "../pages/incoming";
import CreateIncome from "../pages/incoming/create";
import EditIncome from "../pages/incoming/edit";

import Bill from "../pages/bill";
import CreateBill from "../pages/bill/create";
import EditBill from "../pages/bill/edit";
import Home from "../pages/home"
import Profile from "../pages/user/profile";

export default function Routes() {
    return (
        <>
            <Switch>
                <Route path="/home" exact>
                    <Home />
                </Route>

                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/categories" exact>
                    <Category />
                </Route>
                <Route path="/categories/create" exact>
                    <CreateCategory />
                </Route>
                <Route path="/categories/:id" exact>
                    <EditCategory />
                </Route>

                <Route path="/wallets" exact>
                    <Wallet />
                </Route>
                <Route path="/wallets/create" exact>
                    <CreateWallet />
                </Route>
                <Route path="/wallets/:id" exact>
                    <EditWallet />
                </Route>

                <Route path="/expenses" exact>
                    <Expense />
                </Route>
                <Route path="/expenses/create" exact>
                    <CreateExpense />
                </Route>
                <Route path="/expenses/:id" exact>
                    <EditExpense />
                </Route>

                <Route path="/incomes" exact>
                    <Income />
                </Route>
                <Route path="/incomes/create" exact>
                    <CreateIncome/>
                </Route>
                <Route path="/incomes/:id" exact>
                    <EditIncome />
                </Route>

                <Route path="/bills" exact>
                    <Bill />
                </Route>
                <Route path="/bills/create" exact>
                    <CreateBill/>
                </Route>
                <Route path="/bills/:id" exact>
                    <EditBill />
                </Route>
                <Route path="/profile/" exact>
                    <Profile />
                </Route>
            </Switch>
        </>
    )
}
