interface ExerciseType {
    id: number;
    title: string;
    url: string;
    bothSides: boolean;
}

export const exercises: Array<ExerciseType> = [
    {
        id: 1,
        title: 'high knees',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 2,
        title: 'jumping jacks',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 3,
        title: 'hold plank',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 4,
        title: 'high plank low plank',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 5,
        title: 'boxing and running',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 6,
        title: 'worm',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 7,
        title: 'scissors',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 8,
        title: 'mountain climber',
        url: require('./exerciseImgs/mountainClimber.png'),
        bothSides: false,
    },
    {
        id: 9,
        title: 'brzuszki',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 10,
        title: 'wdupki',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 11,
        title: 'hold side plank',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: true,
    },
    {
        id: 12,
        title: 'jumping jack squats',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 13,
        title: 'saw',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: false,
    },
    {
        id: 14,
        title: 'rainbow',
        url: require('./exerciseImgs/highKnees.png'),
        bothSides: true,
    },
    {
        id: 15,
        title: 'lunge',
        url: require('./exerciseImgs/lunge.png'),
        bothSides: true,
    },
]