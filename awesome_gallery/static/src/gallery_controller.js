import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { usePager } from "@web/search/pager_hook";
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
        if (this.props.limit) {
            this.model.limit = this.props.limit;
        }

        onWillStart(() => this.load(this.props));
        onWillUpdateProps((nextProps) => {
            this.model.offset = 0;
            return this.load(nextProps);
        });

        usePager(() => ({
            offset: this.model.offset,
            limit: this.model.limit,
            total: this.model.count,
            onUpdate: async ({ offset, limit }) => {
                this.model.offset = offset;
                this.model.limit = limit;
                await this.load(this.props);
            },
        }));
    }

    load(props) {
        return this.model.load({
            resModel: props.resModel,
            domain: props.domain,
            imageField: props.archInfo.imageField,
            tooltipField: props.archInfo.tooltipField,
            fieldNames: props.archInfo.fieldNames,
            offset: this.model.offset,
            limit: this.model.limit,
        });
    }

    onImageUpload(record, { data }) {
        return this.model.uploadImage({
            resModel: this.props.resModel,
            recordId: record.id,
            imageField: this.props.archInfo.imageField,
            tooltipField: this.props.archInfo.tooltipField,
            fieldNames: this.props.archInfo.fieldNames,
            data,
        });
    }
}
