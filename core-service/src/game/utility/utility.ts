import { PipelineStage, Types } from 'mongoose';

export const journalAggregateQuery = (
  childId: string,
  gameId: string,
  createdAt?: any,
): PipelineStage[] => [
  {
    $match: {
      child: new Types.ObjectId(childId),
      game: new Types.ObjectId(gameId),
      createdAt: createdAt,
      leavingAt: { $exists: true },
    },
  },
  {
    $addFields: {
      spentTime: {
        $function: {
          body: function (leavingAt, createdAt) {
            return Math.trunc((leavingAt - createdAt) / 1000);
          },
          args: [`$leavingAt`, `$createdAt`],
          lang: 'js',
        },
      },
    },
  },
  {
    $group: {
      _id: [`$child`, `$game`],
      totalTimePassed: { $sum: `$spentTime` },
    },
  },
];

export const progressionAggregateQuery = (
  childId: string,
  gameId: string,
): PipelineStage[] => [
  {
    $match: {
      child: new Types.ObjectId(childId),
      game: new Types.ObjectId(gameId),
      completedAt: { $exists: true },
    },
  },
  {
    $addFields: {
      spentTime: {
        $function: {
          body: function (completedAt, createdAt) {
            return Math.trunc((completedAt - createdAt) / 1000);
          },
          args: [`$completedAt`, `$createdAt`],
          lang: 'js',
        },
      },
    },
  },
  {
    $group: {
      _id: [`$child`, `$game`],
      failPerLevelAVG: { $avg: `$failAttempt` },
      timePerLevelAVG: { $avg: `$spentTime` },
      levelCompletedNumber: { $count: {} },
    },
  },
];

export const getChildrenAchievementsAggregate = (
  parentId: string,
): PipelineStage[] => [
  {
    $match: {
      _id: new Types.ObjectId(parentId),
    },
  },
  {
    $lookup: {
      from: 'children',
      let: { parentId: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$$parentId', '$parent'],
            },
          },
        },
        {
          $lookup: {
            from: 'achievements',
            let: { childId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$$childId', '$child'],
                  },
                },
              },
              {
                $sort: { createdAt: -1 },
              },
              {
                $limit: 4,
              },
              {
                $lookup: {
                  from: 'trophies',
                  let: { trophyId: '$trophy' },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ['$$trophyId', '$_id'],
                        },
                      },
                    },
                  ],
                  as: 'trophies',
                },
              },
              {
                $replaceRoot: {
                  newRoot: {
                    $mergeObjects: [
                      { $arrayElemAt: ['$trophies', 0] },
                      '$$ROOT',
                    ],
                  },
                },
              },
            ],
            as: 'achievements',
          },
        },
        {
          $unwind: {
            path: '$achievements',
            // preserveNullAndEmptyArrays: true, // this would include child even if it doesn't have achievement, not needed in this context
          },
        },
        {
          $sort: { 'achievements.createdAt': -1 },
        },
      ],
      as: 'childs',
    },
  },
];
