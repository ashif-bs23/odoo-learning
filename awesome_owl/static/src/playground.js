import { Component, markup, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardActionServiceProps } from "@web/webclient/actions/action_service";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todo/todo_list";

export class OwlPlayground extends Component {
    static template = "awesome_owl.OwlPlayground";
    static props = { ...standardActionServiceProps };
    static components = { Counter, Card, TodoList };

    setup() {
        this.escapedHtml = "<div class='text-danger'>this should show as raw tags</div>";
        this.safeHtml = markup("<div class='text-success'><b>this should be bold green HTML</b></div>");
        this.sum = useState({ value: 2 });
    }

    incrementSum() {
        this.sum.value++;
    }
}

registry.category("actions").add("awesome_owl.action", OwlPlayground);
