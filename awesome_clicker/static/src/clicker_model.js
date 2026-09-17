import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { getReward as pickReward } from "./click_rewards";
import { browser } from "@web/core/browser/browser";

const STORAGE_KEY = "awesome_clicker";
const CURRENT_VERSION = 2;

const MIGRATIONS = [
    {
        fromVersion: 1,
        toVersion: 2,
        apply(state) {
            state.peachTrees = state.peachTrees ?? 0;
            state.peaches = state.peaches ?? 0;
        },
    },
];

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.bus = new EventBus();
        this.clicks = 0;
        this.level = 0;
        this.clickBots = 0;
        this.bigBots = 0;
        this.power = 1;
        this.pearTrees = 0;
        this.cherryTrees = 0;
        this.pears = 0;
        this.cherries = 0;
        this.peachTrees = 0;
        this.peaches = 0;
        this.version = CURRENT_VERSION;

        const saved = browser.localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const state = JSON.parse(saved);
            this.migrate(state);
            Object.assign(this, state);
        }

        setInterval(() => {
            if (this.clickBots > 0 || this.bigBots > 0) {
                this.increment((10 * this.clickBots + 100 * this.bigBots) * this.power);
            }
            this.save();
        }, 10000);

        setInterval(() => {
            this.pears += this.pearTrees;
            this.cherries += this.cherryTrees;
            this.peaches += this.peachTrees;
            this.save();
        }, 30000);
    }

    toJSON() {
        return {
            clicks: this.clicks,
            level: this.level,
            clickBots: this.clickBots,
            bigBots: this.bigBots,
            power: this.power,
            pearTrees: this.pearTrees,
            cherryTrees: this.cherryTrees,
            pears: this.pears,
            cherries: this.cherries,
            peachTrees: this.peachTrees,
            peaches: this.peaches,
            version: this.version,
        };
    }

    migrate(state) {
        let version = state.version ?? 0;
        while (version < CURRENT_VERSION) {
            const migration = MIGRATIONS.find((m) => m.fromVersion === version);
            if (!migration) {
                break;
            }
            migration.apply(state);
            version = migration.toVersion;
            state.version = version;
        }
    }

    save() {
        browser.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.toJSON()));
    }

    get trees() {
        return this.pearTrees + this.cherryTrees + this.peachTrees;
    }

    get fruits() {
        return this.pears + this.cherries + this.peaches;
    }

    increment(inc) {
        this.clicks += inc;
        if (this.clicks >= 1000 && this.level < 1) {
            this.level = 1;
            this.bus.trigger("MILESTONE_1k");
        }

        if (this.clicks >= 5000 && this.level < 2){
            this.level = 2;
        }

        if (this.clicks >= 100000 && this.level < 3){
            this.level = 3;
        }

        if (this.clicks >= 1000000 && this.level < 4) {
            this.level = 4;
        }
    }

    buyClickBot() {
        if (this.clicks < 1000) {
            return;
        }
        this.clicks -= 1000;
        this.clickBots += 1;
    }

    buyBigBot() {
        if (this.clicks < 5000) {
            return;
        }
        this.clicks -= 5000;
        this.bigBots += 1;
    }

    buyPower(){
        if(this.clicks < 50000){
            return;
        }

        this.clicks -= 50000;
        this.power += 1;
    }

    getReward() {
        return pickReward(this.level);
    }

    buyPearTree() {
        if (this.clicks < 1000000) {
            return;
        }
        this.clicks -= 1000000;
        this.pearTrees += 1;
    }

    buyCherryTree() {
        if (this.clicks < 1000000) {
            return;
        }
        this.clicks -= 1000000;
        this.cherryTrees += 1;
    }

    buyPeachTree() {
        if (this.clicks < 1000000) {
            return;
        }
        this.clicks -= 1000000;
        this.peachTrees += 1;
    }
}