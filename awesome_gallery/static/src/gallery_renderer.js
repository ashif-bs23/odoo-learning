import { Component } from "@odoo/owl";
import { url } from "@web/core/utils/urls";

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";
    static props = {
        records: { type: Array },
        imageField: { type: String },
        resModel: { type: String },
    };

    imageUrl(record) {
        return url("/web/image", {
            model: this.props.resModel,
            id: record.id,
            field: this.props.imageField,
        });
    }
}