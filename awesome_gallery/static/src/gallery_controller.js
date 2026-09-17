import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { standardViewProps } from "@web/views/standard_view_props";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static props = {
        ...standardViewProps,
        archInfo: { type: Object },
    };
    static components = { Layout };

    setup() {
        this.orm = useService("orm");
        this.model = useState({ records: [] });

        onWillStart(() => this.loadImages(this.props.domain));
        onWillUpdateProps((nextProps) => this.loadImages(nextProps.domain));
    }

    async loadImages(domain) {
        const imageField = this.props.archInfo.imageField;
        const { records } = await this.orm.webSearchRead(this.props.resModel, domain, {
            specification: {
                [imageField]: {},
            },
            context: {
                bin_size: true,
            },
        });
        this.model.records = records;
    }
}