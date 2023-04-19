import { getChartData } from '../aggregation/aggreagation-dao.js';

export const getChartDataHandler = async (req, res) => {
    try {
        const seller_username = req.query.seller_username;
        const chartData = await getChartData(seller_username);
        console.log(chartData)
        res.status(200).json(chartData);

    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
};


export default (app) => {
    app.get('/api/chart-data', getChartDataHandler);
}