import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { LazyComponent } from "@web/core/assets";
import { standardActionServiceProps } from "@web/webclient/actions/action_service";

export class AwesomeDashboardAction extends Component {
    static components = { LazyComponent };
    static props = { ...standardActionServiceProps };
    static template = xml`
        <LazyComponent
            bundle="'awesome_dashboard.dashboard'"
            Component="'AwesomeDashboard'"
            props="props"
        />
    `;
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboardAction);