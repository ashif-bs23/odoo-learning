import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";
import { StatsController } from "./stats_controller";

export const statsView = {
    type: "stats",
    display_name: _t("Stats"),
    icon: "fa fa-bar-chart",
    multiRecord: true,
    searchMenuTypes: ["filter", "favorite"],
    Controller: StatsController,
};

registry.category("views").add("stats", statsView);