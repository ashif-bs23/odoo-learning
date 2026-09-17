import { reactive, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { ClickerModel } from "./clicker_model";

const clickerService = {
    dependencies: ["effect"],
    start(env, { effect } ) {
        const clicker =  new ClickerModel();
        clicker.bus.addEventListener("MILESTONE_1k", () => {
            effect.add({
                type: "rainbow_man",
                message: "Yayyyyy!!!  You can now buy clickbots!",
            });
        });
        return clicker;
    },
}

export function useClicker() {
    return useState(useService("clicker"));
}

registry.category("services").add("clicker", clickerService);