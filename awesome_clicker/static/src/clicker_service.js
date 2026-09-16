import { reactive, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

const clickerService = {
    start() {
        const state = reactive({ clicks : 0 });

        return {
            state,
            increment(inc) {
                state.clicks += inc;
            },
        };
    },
}

export function useClicker() {
    return useState(useService("clicker"));
}

registry.category("services").add("clicker", clickerService);