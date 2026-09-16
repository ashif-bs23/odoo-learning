import { Component } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers";

export class ClickValue extends Component {
    static template = "awesome_clicker.ClickValue";
    static props = {
        value: Number,
    };

    get displayValue() {
        return humanNumber(this.props.value);
    }
}