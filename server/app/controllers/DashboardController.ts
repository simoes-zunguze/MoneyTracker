import { Request, Response } from "express";
import { getManager } from "typeorm";

export default class DashboardController {
    async getExpenseSummary(req: Request, res: Response) {
        let month:string;
        if (req.query.date) {
            month = (new Date(req.query.date as string).getMonth()+1).toString();
        }else{
            month = (new Date().getMonth()+1).toString();
        }

        try {
            const expenseSummary = await getManager().query(
                "SELECT SUM(amount) as sum, category.name as name from expense\
                join category on category.id=expense.categoryId\
                WHERE category.userId = ?\
                and MONTH(expense.created_at) = ?\
                group by categoryId",
                [res.locals.user.id, month])
            res.send(expenseSummary);
        } catch (error) {
            console.error(error);
        }
    }

    async getMonthTotals(req: Request, res: Response) {
        let month:string;
        if (req.query.date) {
            month = (new Date(req.query.date as string).getMonth()+1).toString();
        }else{
            month = (new Date().getMonth()+1).toString();
        }
        console.log(month);
        try {
            const expenses = await getManager().query(
                "Select sum(amount) as expenses from expense\
                    join category on category.id = expense.categoryId\
                    join user on user.id = category.userId\
                    where user.id = ?\
                    and MONTH(expense.created_at) = ?",
                    [res.locals.user.id, month]);

            const incomes = await getManager().query(
                "Select sum(amount) as incomes from incoming\
                    join wallet on wallet.id = incoming.walletId\
                    join user on user.id = wallet.userId\
                    where user.id = ?\
                    and MONTH(incoming.created_at) = ?",
                    [res.locals.user.id, month]);
            const expensesQuant = await getManager().query(
                "Select count(*) as expensesQuant from expense\
                    join category on category.id = expense.categoryId\
                    join user on user.id = category.userId\
                    where user.id = ? \
                    and MONTH(expense.created_at) = ?",
                    [res.locals.user.id, month]);

            const expensesByDay = await getManager().query(
                "SELECT sum(amount) as sum, DAY(expense.created_at) as day  from expense\
                    JOIN category on category.id = expense.categoryId\
                    JOIN user on user.id = category.userId\
                    WHERE user.id = ? AND MONTH(expense.created_at) = ?\
                    GROUP BY DAY(expense.created_at) ",
                    [res.locals.user.id, month]);
        
            const data = {
                expenses: expenses[0].expenses + "",
                incomes: incomes[0].incomes + "",
                expensesQuant: expensesQuant[0].expensesQuant + "",
                expensesByDay : expensesByDay
            };

            res.send(data);
        } catch (error) {
            console.error(error);
        }
    }
}