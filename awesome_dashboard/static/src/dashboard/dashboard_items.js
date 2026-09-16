/** @odoo-module **/

import { NumberCard } from "./number_card/number_card";
import { PieChartCard } from "./pie_chart_card/pie_chart_card";
import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";

export const items = [
    {
        id: "nb_new_orders",
        description: _t("New orders this month"),
        Component: NumberCard,
        props: (data) => ({
            title: _t("New orders this month"),
            value: data.nb_new_orders || 0,
        }),
    },
    {
        id: "total_amount",
        description: _t("Total amount this month"),
        Component: NumberCard,
        props: (data) => ({
            title: _t("Total amount this month"),
            value: data.total_amount || 0,
        }),
    },
    {
        id: "average_quantity",
        description: _t("Average t-shirts per order"),
        Component: NumberCard,
        props: (data) => ({
            title: _t("Average t-shirts per order"),
            value: data.average_quantity || 0,
        }),
    },
    {
        id: "nb_cancelled_orders",
        description: _t("Cancelled orders this month"),
        Component: NumberCard,
        props: (data) => ({
            title: _t("Cancelled orders this month"),
            value: data.nb_cancelled_orders || 0,
        }),
    },
    {
        id: "average_time",
        description: _t("Average hours from new to sent or cancelled"),
        Component: NumberCard,
        size: 2,
        props: (data) => ({
            title: _t("Average hours from new to sent or cancelled"),
            value: data.average_time || 0,
        }),
    },
    {
        id: "orders_by_size",
        description: _t("T-shirts by size"),
        Component: PieChartCard,
        size: 2,
        props: (data) => ({
            title: _t("T-shirts by size"),
            data: data.orders_by_size || {},
        }),
    },
];

items.forEach((item) => {
    registry.category("awesome_dashboard").add(item.id, item);
});
