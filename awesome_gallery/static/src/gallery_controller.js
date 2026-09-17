import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { standardViewProps } from "@web/views/standard_view_props";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static props = {
        ...standardViewProps,
        archInfo: { type: Object },
        Model: Function,
        Renderer: Function,
    };
    static components = { Layout };

    setup() {
        this.orm = useService("orm");
        this.model = useState(new this.props.Model(this.orm));

        onWillStart(() => this.load(this.props));
        onWillUpdateProps((nextProps) => this.load(nextProps));
    }

    load(props) {
        return this.model.load({
            resModel: props.resModel,
            domain: props.domain,
            imageField: props.archInfo.imageField,
            tooltipField: props.archInfo.tooltipField,
        });
    }
}
