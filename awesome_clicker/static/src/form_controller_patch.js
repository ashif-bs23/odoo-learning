import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

patch(FormController.prototype, {
    setup() {
        super.setup(...arguments);
        const clicker = useService("clicker");
        const notification = useService("notification");
        const action = useService("action");
        if (Math.random() >= 0.01) {
            return;
        }
        const reward = clicker.getReward();
        if (!reward) {
            return;
        }
        const close = notification.add(reward.description, {
            type: "success",
            sticky: true,
            buttons: [
                {
                    name: "Collect",
                    primary: true,
                    onClick: () => {
                        reward.apply(clicker);
                        close();
                        action.doAction({
                            type: "ir.actions.client",
                            tag: "awesome_clicker.client_action",
                            target: "new",
                            name: "Clicker",
                        });
                    },
                },
            ],
        });
    },
});