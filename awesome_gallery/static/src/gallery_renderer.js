import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { url } from "@web/core/utils/urls";

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";
    static props = {
        records: { type: Array },
        imageField: { type: String },
        resModel: { type: String },
    };

    setup() {
        this.action = useService("action");
    }

    imageUrl(record) {
        return url("/web/image", {
            model: this.props.resModel,
            id: record.id,
            field: this.props.imageField,
        });
    }

    onImageClick(record) {
        this.action.switchView("form", { resId: record.id });
    }
}
