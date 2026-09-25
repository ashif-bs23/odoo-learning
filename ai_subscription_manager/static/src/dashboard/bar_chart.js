import { Component, onMounted, onWillStart, onWillUnmount, onWillUpdateProps, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class BarChart extends Component {
    static template = "ai_subscription_manager.BarChart";
    static props = {
        totalSubscription: Number,
        totalReceived: Number,
    };

    setup() {
        this.canvasRef = useRef("canvas");
        this.chart = null;
        onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));
        onMounted(() => this.renderChart(this.props));
        onWillUpdateProps((nextProps) => this.renderChart(nextProps));
        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }

    renderChart(props) {
        if (!this.canvasRef.el) {
            return;
        }
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new window.Chart(this.canvasRef.el, {
            type: "bar",
            data: {
                labels: ["Total Subscription Amount", "Total Received Amount"],
                datasets: [
                    {
                        label: "Amount (BDT)",
                        data: [props.totalSubscription, props.totalReceived],
                        backgroundColor: ["#714B67", "#017e84"],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }
}
