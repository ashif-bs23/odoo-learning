import { visitXML } from "@web/core/utils/xml";

export class GalleryArchParser {
    parse(xmlDoc) {
        const fieldNames = new Set();
        let tooltipTemplate = null;
        visitXML(xmlDoc, (node) => {
            if (node.tagName === "field") {
                fieldNames.add(node.getAttribute("name"));
            } else if (node.tagName === "tooltip-template") {
                tooltipTemplate = node;
            }
        });
        return {
            imageField: xmlDoc.getAttribute("image_field"),
            tooltipField: xmlDoc.getAttribute("tooltip_field"),
            fieldNames: [...fieldNames],
            tooltipTemplate,
        };
    }
}
