import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";

registry.category("command_provider").add("awesome_clicker", {
    provide(env) {
        return [
            {
                name: _t("Open Clicker Game"),
                action() {
                    env.services.action.doAction({
                        type: "ir.actions.client",
                        tag: "awesome_clicker.client_action",
                        target: "new",
                        name: "Clicker",
                    });
                },
            },
            {
                name: _t("Buy 1 click bot"),
                action() {
                    env.services.clicker.buyClickBot();
                },
            },
        ];
    },
});