import { Router } from "express";
import DashboardController from "../app/controllers/DashboardController";

const dashboardController = new DashboardController();
export default
    Router()
    .get("/",(req, res)=>{
        dashboardController.getExpenseSummary(req, res);
    })
    .get('/totals', (req, res) => {
        dashboardController.getMonthTotals(req, res);
    })