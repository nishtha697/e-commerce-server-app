export const timelineAggregation = [
    {
        $project: {
            date: {
                $toLong: "$orderDate",
            },
            value: 1,
        },
    },
    {
        $group: {
            _id: {
                $dateToString: {
                    format: "%Y-%m-%d",
                    date: {
                        $toDate: "$date",
                    },
                },
            },
            count: {
                $sum: 1,
            },
        },
    },
    {
        $project: {
            date: "$_id",
            value: "$count",
            _id: 0,
        },
    },
];
