import { reactive, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { ClickerModel } from "./clicker_model";

const clickerService = {
    start() {
        return new ClickerModel();
    },
}

export function useClicker() {
    return useState(useService("clicker"));
}

registry.category("services").add("clicker", clickerService);