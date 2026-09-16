import { Component, useExternalListener } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_service";

export class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.ClickerSystrayItem";
    static props = {};

    setup() {
        this.clicker = useClicker();
        this.action = useService("action");

        useExternalListener(
            document.body,
            "click",
            this.onExternalClick,
            { capture: true }
        );
    }

    onExternalClick(ev) {
        if (ev.target.closest("[data-clicker-ignore]")) {
            return;
        }
        this.clicker.increment(1);
    }

    openClientAction() {
        this.action.doAction({
           type: "ir.actions.client",
           tag:"awesome_clicker.client_action",
           target: "new",
           name: "Clicker",
        });
    }
}

registry.category("systray").add(
    "awesome_clicker.ClickerSystrayItem",
    { Component: ClickerSystrayItem },
    { sequence: 1000 }
);