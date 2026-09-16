/** @odoo-module **/

import { Component, useSubEnv, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { standardActionServiceProps } from "@web/webclient/actions/action_service";
import { useService } from "@web/core/utils/hooks";
import { user } from "@web/core/user";
import { DashboardItem } from "./dashboard_item/dashboard_item";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { browser } from "@web/core/browser/browser";
import { _t } from "@web/core/l10n/translation";
import "./dashboard_items";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static props = { ...standardActionServiceProps };
    static components = { Layout, DashboardItem };

    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.action = useService("action");
        this.statisticsService = useService("awesome_dashboard.statistics");
        this.statistics = useState(this.statisticsService.statistics);
        this.allItems = registry.category("awesome_dashboard").getAll();
        this.dialog = useService("dialog");
        this.orm = useService("orm");
        this.state = useState({
            disabledItemIds: [],
        });

        this.customersLabel = _t("Customers");
        this.leadsLabel = _t("Leads");
        this.settingsLabel = _t("Settings");

        onWillStart(async () => {
            await this.statisticsService.loadStatistics();
            await this.loadDisabledItemIds();
        });
    }

    async loadDisabledItemIds() {
        const [data] = await this.orm.read(
            "res.users",
            [user.userId],
            ["awesome_dashboard_disabled_item_ids"]
        );
        let ids = data.awesome_dashboard_disabled_item_ids || [];
        if (!ids.length) {
            ids = JSON.parse(
                browser.localStorage.getItem("disabledDashboardItems") || "[]"
            );
            if (ids.length) {
                await this.saveDisabledItemIds(ids);
            }
        }
        this.state.disabledItemIds = ids;
    }

    async saveDisabledItemIds(ids) {
        await this.orm.write("res.users", [user.userId], {
            awesome_dashboard_disabled_item_ids: ids,
        });
        browser.localStorage.removeItem("disabledDashboardItems");
    }

    get items() {
        return this.allItems.filter(
            (item) => !this.state.disabledItemIds.includes(item.id)
        );
    }

    openCustomers() {
        this.action.doAction("base.action_partner_form");
    }

    openLeads() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: _t("Leads"),
            res_model: "crm.lead",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }

    openSettings() {
        this.dialog.add(ConfigurationDialog, {
            items: this.allItems,
            disabledItemIds: this.state.disabledItemIds,
            onApply: async (ids) => {
                this.state.disabledItemIds = ids;
                await this.saveDisabledItemIds(ids);
            },
        });
    }
}

class ConfigurationDialog extends Component {
    static template = "awesome_dashboard.ConfigurationDialog";
    static components = { Dialog, CheckBox };
    static props = {
        close: Function,
        items: { type: Array },
        disabledItemIds: { type: Array },
        onApply: Function,
    };

    setup() {
        this.title = _t("Dashboard items");
        this.applyLabel = _t("Apply");
        this.items = useState(
            this.props.items.map((item) => ({
                ...item,
                enabled: !this.props.disabledItemIds.includes(item.id),
            }))
        );
    }

    onChange(enabled, item) {
        item.enabled = enabled;
    }

    async apply() {
        const disabledItemIds = this.items
            .filter((item) => !item.enabled)
            .map((item) => item.id);
        await this.props.onApply(disabledItemIds);
        this.props.close();
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);