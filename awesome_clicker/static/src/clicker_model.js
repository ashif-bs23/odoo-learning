import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { getReward as pickReward } from "./click_rewards";

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

        setInterval(() => {
            if (this.clickBots > 0 || this.bigBots > 0) {
                this.increment((10 * this.clickBots + 100 * this.bigBots) * this.power);
            }
        }, 10000);

        setInterval(() => {
            this.pears += this.pearTrees;
            this.cherries += this.cherryTrees;
        }, 30000);
    }

    get trees() {
        return this.pearTrees + this.cherryTrees;
    }

    get fruits() {
        return this.pears + this.cherries;
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
}