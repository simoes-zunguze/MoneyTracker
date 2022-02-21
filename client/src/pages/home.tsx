
import {
	Chart as ChartJS, ArcElement, Tooltip, Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,

} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import "../assets/css/home.css"
// import faker from 'faker';
import axios from 'axios';
import DatePicker from "react-datepicker";

import { useEffect, useState } from 'react';
import { Format } from '../utils/format'
import { getDate } from '../utils/date';

ChartJS.register(ArcElement, Tooltip, Legend);


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Line Chart',
		},
	},
};

interface ExpenseByDay {
	day: string,
	sum: string
}

const moneyFormat = Format.getMoneyInstance();

function Home() {

	const [expenses, setExpenses] = useState("0");
	const [incomes, setIncomes] = useState("0");
	const [expensesQuant, setExpensesQuant] = useState("0");
	const [expensesByDay, setExpensesByDay] = useState<ExpenseByDay[]>([]);
	const [startDate, setStartDate] = useState(new Date());

	const [expenseSummaryData, setexpenseSummaryData] = useState({
		labels: ["No data"],
		datasets: [
			{
				label: '# Summary',
				data: [1],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
				],
				borderWidth: 1,
			},
		],
	})

	const [expenseByDayData, setExpenseByDayData] = useState({
		labels: ["a"],
		datasets: [
			{
				label: 'Dataset 1',
				data: [3],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			}
		],
	});

	const handleDate = (date: Date) => {
		setStartDate(date);
	}

	function getTotals() {
		const date = getDate(startDate);
		axios.get<{
			expenses: string,
			incomes: string, expensesQuant:
			string, expensesByDay:
			ExpenseByDay[]
		}>("/dashboard/totals",
		{
			params:{
				date: date
			}
		}
		).then(({ data: { expenses, expensesQuant, incomes, expensesByDay } }) => {
			setExpenses(expenses);
			setIncomes(incomes);
			setExpensesQuant(expensesQuant);
			setExpensesByDay(expensesByDay);
		})
	}
	function getExpenseSumary() {
		const date = getDate(startDate);

		axios.get("/dashboard",{
			params:{
				date: date
			}
		}).then(res => {
			const data = res.data as { name: string, sum: number }[];
			let labels = [];
			let sums = [];
			for (let i = 0; i < data.length; i++) {
				labels.push(data[i].name)
				sums.push(data[i].sum)
			}
			setexpenseSummaryData({
				labels: labels,
				datasets: [
					{
						label: '# of Votes',
						data: sums,
						backgroundColor: [
							'rgba(255, 99, 132, 0.8)',
							'rgba(54, 162, 235, 0.8)',
							'rgba(255, 206, 86, 0.8)',
							'rgba(75, 192, 192, 0.8)',
							'rgba(153, 102, 255, 0.8)',
							'rgba(255, 19, 44, 0.8)',
							'rgba(25, 159, 64, 0.8)',

						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 19, 44, 1)',
							'rgba(25, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],

			})
		})
	}

	function updateLineGraph() {
		const labels = expensesByDay.map(expense => expense.day)
		const data = expensesByDay.map(expense => parseFloat(expense.sum))

		setExpenseByDayData({
			labels: labels,
			datasets: [
				{
					label: 'Expenses by Day',
					data: data,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				}
			],
		})

	}

	useEffect(() => {
		getTotals();
		getExpenseSumary();
	}, [startDate])

	useEffect(() => {
		updateLineGraph();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [expensesByDay])

	return (
		<>
			<div className="row stats-row">
				<div className="card-stats" style={{ backgroundColor: "#0c6" }}>
					<div className="row">
						<i className="fa fa-calendar-alt" style={{ color: "#fff" }}></i>
						<div className="col">
							<div className="card-stats-header" style={{color: "#fff"}}>
								<strong> Choose the month <span className="fa fa-hand-point-down"></span></strong>
							</div>
							<div className="card-stats-body">
								<DatePicker
									className="date-picker"
									selected={startDate}
									onChange={(date) => handleDate(date as Date)}
									dateFormat="MMMM, yyyy"
									showMonthYearPicker
									showFullMonthYearPicker
									placeholderText="Click to select a date"
								/>
							</div>
						</div>
					</div>

				</div>

				<div className="card-stats">
					<div className="row">
						<i className="fa fa-coins" style={{ color: "orange" }}></i>
						<div className="col">
							<div className="card-stats-header">
								Expenses
							</div>
							<div className="card-stats-body">
								{moneyFormat.format(expenses)}
							</div>
						</div>
					</div>

				</div>

				<div className="card-stats">
					<div className="row">
						<i className="fa fa-donate" style={{ color: "green" }}></i>
						<div className="col">
							<div className="card-stats-header">
								Incomes
							</div>
							<div className="card-stats-body">
								{moneyFormat.format(incomes)}
							</div>
						</div>
					</div>

				</div>

				<div className="card-stats">
					<div className="row">
						<i className="fa fa-grip-vertical" style={{ color: "#A01" }}></i>
						<div className="col">
							<div className="card-stats-header">
								Expenses quant
							</div>
							<div className="card-stats-body">
								{expensesQuant} items
							</div>
						</div>
					</div>

				</div>




			</div>
			<div className="row-charts">
				<div className="card card-doughnut">
					<Doughnut style={{ padding: "15px" }} data={expenseSummaryData} />
				</div>
				<div className="card card-line">
					<Bar style={{ padding: "15px" }} data={expenseByDayData} />
				</div>
			</div>
		</>
	)
}

export default Home;