import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todo_item";
import { useAutofocus } from "../utils";

export class TodoList extends Component {
    static template = "awesome_owl.TodoList";
    static components = { TodoItem };

    setup() {
        useAutofocus("input");
        this.nextId = 1;
        this.todos = useState([]);
    }

    addTodo(ev){
        if(ev.keyCode !== 13){
            return;
        }

        const description = ev.target.value.trim();

        if(!description){
            return;
        }

        this.todos.push({
            id: this.nextId++,
            description,
            isCompleted: false,
        });

        ev.target.value = "";
    }

    toggleState(todoId){
        const todo = this.todos.find((t) => t.id === todoId);

        if(todo){
            todo.isCompleted = !todo.isCompleted;
        }
    }

    removeTodo(todoId){
        const index = this.todos.findIndex((t) => t.id === todoId)

        if(index >= 0){
            this.todos.splice(index, 1);
        }
    }
}
