import { Component, xml } from "@odoo/owl";
import { useTooltip } from "@web/core/tooltip/tooltip_hook";
import { useService } from "@web/core/utils/hooks";
import { url } from "@web/core/utils/urls";
import { visitXML } from "@web/core/utils/xml";
import { FileUploader } from "@web/views/fields/file_handler";

function compileTooltipTemplate(tooltipTemplate) {
    if (!tooltipTemplate) {
        return null;
    }
    const clone = tooltipTemplate.cloneNode(true);
    visitXML(clone, (node) => {
        if (node.tagName === "field") {
            const tEsc = node.ownerDocument.createElement("t");
            tEsc.setAttribute("t-esc", node.getAttribute("name"));
            node.replaceWith(tEsc);
            return false;
        }
    });
    const wrapper = clone.ownerDocument.createElement("t");
    wrapper.setAttribute("t-name", "awesome_gallery.GalleryTooltip");
    while (clone.firstChild) {
        wrapper.appendChild(clone.firstChild);
    }
    return xml`${wrapper.outerHTML}`;
}

export class GalleryItem extends Component {
    static template = "awesome_gallery.GalleryItem";
    static components = { FileUploader };
    static props = {
        record: { type: Object },
        imageField: { type: String },
        tooltipField: { type: String, optional: true },
        compiledTooltip: { optional: true },
        resModel: { type: String },
        onImageClick: { type: Function },
        onImageUpload: { type: Function },
    };

    setup() {
        if (this.props.compiledTooltip) {
            useTooltip("root", {
                template: this.props.compiledTooltip,
                info: this.props.record,
            });
        }
    }

    imageUrl() {
        return url("/web/image", {
            model: this.props.resModel,
            id: this.props.record.id,
            field: this.props.imageField,
            unique: this.props.record.write_date,
        });
    }

    tooltip() {
        const field = this.props.tooltipField;
        if (!field) {
            return false;
        }
        const value = this.props.record[field];
        if (value && typeof value === "object") {
            return value.display_name;
        }
        return value;
    }

    onUploaded(info) {
        return this.props.onImageUpload(this.props.record, info);
    }
}

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";
    static components = { GalleryItem };
    static props = {
        records: { type: Array },
        imageField: { type: String },
        tooltipField: { type: String, optional: true },
        tooltipTemplate: { optional: true },
        resModel: { type: String },
        onImageUpload: { type: Function },
    };

    setup() {
        this.action = useService("action");
        this.compiledTooltip = compileTooltipTemplate(this.props.tooltipTemplate);
    }

    onImageClick(record) {
        this.action.switchView("form", { resId: record.id });
    }
}
