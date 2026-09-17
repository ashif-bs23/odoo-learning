export class GalleryArchParser {
    parse(xmlDoc) {
        return {
            imageField: xmlDoc.getAttribute("image_field"),
            tooltipField: xmlDoc.getAttribute("tooltip_field"),
        };
    }
}
