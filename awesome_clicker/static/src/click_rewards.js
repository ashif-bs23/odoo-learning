import { choose } from "./utils";

export const rewards = [
    {
        description: "Get 1 click bot",
        apply(clicker) {
            clicker.clickBots += 1;
        },
        maxLevel: 3,
    },
    {
        description: "Get 10 click bots",
        apply(clicker) {
            clicker.clickBots += 10;
        },
        minLevel: 3,
        maxLevel: 4,
    },
    {
        description: "Increase bot power!",
        apply(clicker) {
            clicker.power += 1;
        },
        minLevel: 3,
    },
];

export function getReward(level) {
    const eligible = rewards.filter(
        (reward) =>
            (reward.minLevel === undefined || level >= reward.minLevel) &&
            (reward.maxLevel === undefined || level <= reward.maxLevel)
    );
    return choose(eligible);
}
