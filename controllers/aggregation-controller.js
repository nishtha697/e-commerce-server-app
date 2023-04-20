import { getChartData } from '../aggregation/aggregation-dao.js';

export const getChartDataHandler = async (req, res) => {
    try {
        const seller_username = req.query.seller_username;
        const chartData = await getChartData(seller_username);
        res.status(200).json(chartData);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default (app) => {
    app.get('/api/chart-data', getChartDataHandler);
}