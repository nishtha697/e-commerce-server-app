export const userDemographicAggregation = [
    {
        $lookup: {
            from: 'buyer',
            localField: 'buyer_username',
            foreignField: 'username',
            as: 'buyer_info',
        },
    },
    {
        $unwind: '$buyer_info',
    },
    {
        $group: {
            _id: '$buyer_info.gender',
            count: { $sum: 1 },
        },
    },
];
