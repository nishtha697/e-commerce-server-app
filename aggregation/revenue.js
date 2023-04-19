export const revenueByProductAggregation = [
    {
        $unwind: "$shipments"
    },
    {
        $unwind: "$shipments.products"
    },
    {
        $lookup: {
            from: "product",
            localField: "shipments.products.product_id",
            foreignField: "product_id",
            as: "product_info"
        }
    },
    {
        $unwind: "$product_info"
    },
    {
        $group: {
            _id: {
                product_id: "$product_info.product_id",
                title: "$product_info.title"
            },
            revenue: {
                $sum: {
                    $multiply: ["$shipments.products.quantity", "$shipments.products.pricePerUnit"]
                }
            }
        }
    },
    {
        $sort: {
            revenue: -1
        }
    }
];
