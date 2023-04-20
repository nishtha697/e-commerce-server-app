import orderModel from "../orders/orders-model.js";
import { userDemographicAggregation } from "./user-demographics.js";
import { categoriesAggregation } from "./categories.js";
import { timelineAggregation } from "./timeline.js";
import { revenueByProductAggregation } from "./revenue.js";

export const getChartData = async (seller_username) => {
    const sellerMatchStage = {
        $match: {
            "shipments.seller_username": seller_username,
        },
    };

    const userDemographicData = await orderModel.aggregate([
        sellerMatchStage,
        ...userDemographicAggregation,
    ]);

    const categoriesData = await orderModel.aggregate([
        sellerMatchStage,
        ...categoriesAggregation,
    ]);

    const timelineData = await orderModel.aggregate([
        sellerMatchStage,
        ...timelineAggregation,
    ]);

    const revenueData = await orderModel.aggregate([
        sellerMatchStage,
        ...revenueByProductAggregation,
    ]);

    return { userDemographicData, categoriesData, timelineData, revenueData };
};
