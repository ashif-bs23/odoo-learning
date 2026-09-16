import { Reactive } from "@web/core/utils/reactive";

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.clicks = 0;
        this.level = 0;
        this.clickBots = 0;
        setInterval(() => {
            if (this.clickBots > 0) {
                this.increment(10 * this.clickBots);
            }
        }, 10000);
    }

    increment(inc) {
        this.clicks += inc;
        if (this.clicks >= 1000 && this.level < 1) {
            this.level = 1;
        }
    }

    buyClickBot() {
        if (this.clicks < 1000) {
            return;
        }
        this.clicks -= 1000;
        this.clickBots += 1;
    }
}