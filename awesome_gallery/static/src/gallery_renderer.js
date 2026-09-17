import { Component } from "@odoo/owl";

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";
    static props = {
        records: { type: Array },
        imageField: { type: String },
    };
}