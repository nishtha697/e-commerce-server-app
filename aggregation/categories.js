export const categoriesAggregation = [
    {
        $unwind: '$shipments',
    },
    {
        $unwind: '$shipments.products',
    },
    {
        $lookup: {
            from: 'product',
            localField: 'shipments.products.product_id',
            foreignField: 'product_id',
            as: 'product',
        },
    },
    {
        $unwind: '$product',
    },
    {
        $project: {
            _id: 0,
            topLevelCategory: { $arrayElemAt: ['$product.category', 0] },
            secondLevelCategory: { $arrayElemAt: ['$product.category', 1] },
            thirdLevelCategory: { $arrayElemAt: ['$product.category', 2] },
        },
    },
    {
        $group: {
            _id: {
                topLevelCategory: '$topLevelCategory',
                secondLevelCategory: '$secondLevelCategory',
                thirdLevelCategory: '$thirdLevelCategory',
            },
            count: { $sum: 1 },
        },
    },
    {
        $group: {
            _id: {
                topLevelCategory: '$_id.topLevelCategory',
                secondLevelCategory: '$_id.secondLevelCategory',
            },
            thirdLevelCategories: {
                $push: {
                    thirdLevelCategory: '$_id.thirdLevelCategory',
                    count: '$count',
                },
            },
        },
    },
    {
        $group: {
            _id: '$_id.topLevelCategory',
            secondLevelCategories: {
                $push: {
                    secondLevelCategory: '$_id.secondLevelCategory',
                    thirdLevelCategories: '$thirdLevelCategories',
                },
            },
        },
    },
    {
        $sort: { _id: 1 },
    },
];
