import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { standardViewProps } from "@web/views/standard_view_props";
import { GalleryModel } from "./gallery_model";
import { GalleryRenderer } from "./gallery_renderer";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static props = {
        ...standardViewProps,
        archInfo: { type: Object },
    };
    static components = { Layout, GalleryRenderer };

    setup() {
        this.orm = useService("orm");
        this.model = useState(new GalleryModel(this.orm));

        onWillStart(() => this.load(this.props));
        onWillUpdateProps((nextProps) => this.load(nextProps));
    }

    load(props) {
        return this.model.load({
            resModel: props.resModel,
            domain: props.domain,
            imageField: props.archInfo.imageField,
        });
    }
}