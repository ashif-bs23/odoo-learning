import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardActionServiceProps } from "@web/webclient/actions/action_service";
import { useClicker } from "./clicker_service";
import { ClickValue } from "./click_value";
import { Notebook } from "@web/core/notebook/notebook";

export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";
    static components = { ClickValue, Notebook };
    static props = { ...standardActionServiceProps };

    setup() {
        this.clicker = useClicker();
    }

    increment() {
        this.clicker.increment(100000);
    }

    buyClickBot() {
        this.clicker.buyClickBot();
    }

    buyBigBot() {
        this.clicker.buyBigBot();
    }

    buyPower(){
        this.clicker.buyPower();
    }

    buyPearTree() {
        this.clicker.buyPearTree();
    }

    buyCherryTree() {
        this.clicker.buyCherryTree();
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);