import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { standardViewProps } from "@web/views/standard_view_props";
import { BarChart } from "./bar_chart";

export class StatsController extends Component {
    static template = "ai_subscription_manager.StatsController";
    static props = { ...standardViewProps };
    static components = { Layout, BarChart };

    setup() {
        this.orm = useService("orm");
        this.state = useState({
            totalSubscription: 0,
            totalReceived: 0,
        });
        onWillStart(() => this.loadStats(this.props.domain));
        onWillUpdateProps((nextProps) => this.loadStats(nextProps.domain));
    }

    async loadStats(domain) {
        const stats = await this.orm.call("ai.subscription", "get_dashboard_stats", [domain]);
        this.state.totalSubscription = stats.total_subscription;
        this.state.totalReceived = stats.total_received;
    }

    formatAmount(value) {
        return Number(value || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
}
