import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.bus = new EventBus();
        this.clicks = 0;
        this.level = 0;
        this.clickBots = 0;
        this.bigBots = 0;
        setInterval(() => {
            if (this.clickBots > 0 || this.bigBots > 0) {
                this.increment(10 * this.clickBots + 100 * this.bigBots);
            }
        }, 10000);
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
}