/** @odoo-module **/

import { Component, onMounted, onWillStart, onWillUnmount, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {
        data: Object,
    };

    setup() {
        this.canvasRef = useRef("canvas");
        this.action = useService("action");
        this.chart = null;

        onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));
        onMounted(() => {
            this.renderChart();
        });
        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }

    renderChart() {
        const labels = Object.keys(this.props.data);
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: _t("T-shirts by size"),
                        data: Object.values(this.props.data),
                    },
                ],
            },
            options: {
                onClick: (event, elements) => {
                    if (!elements.length) {
                        return;
                    }
                    const size = labels[elements[0].index];
                    this.openOrders(size);
                },
                onHover: (event, elements) => {
                    const canvas = this.canvasRef.el;
                    if (canvas) {
                        canvas.style.cursor = elements.length ? "pointer" : "default";
                    }
                },
            },
        });
    }

    openOrders(size) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: _t("T-shirt orders (%s)", size.toUpperCase()),
            res_model: "awesome_dashboard.tshirt_order",
            views: [
                [false, "list"],
                [false, "form"],
            ],
            domain: [["size", "=", size]],
            context: { default_size: size },
        });
    }
}
