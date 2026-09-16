import { reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

const statistics = reactive({});

async function loadStatistics() {
    const data = await rpc("/awesome_dashboard/statistics");
    Object.assign(statistics, data);
    return statistics;
}

export const statisticsService = {
    start(){
        loadStatistics();
        setInterval(loadStatistics, 10 * 1000);
        return{
            statistics,
            loadStatistics,
        }
    }
}


registry.category("services").add("awesome_dashboard.statistics", statisticsService);