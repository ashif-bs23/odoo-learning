import { registry } from "@web/core/registry";
import { GalleryArchParser } from "./gallery_arch_parser";
import { GalleryController } from "./gallery_controller";

export const galleryView = {
    type: "gallery",
    display_name: "Gallery",
    icon: "fa fa-picture-o",
    multiRecord: true,
    ArchParser: GalleryArchParser,
    Controller: GalleryController,
    props: (genericProps, view) => {
        const { arch } = genericProps;
        const archInfo = new view.ArchParser().parse(arch);
        return {
            ...genericProps,
            archInfo,
        };
    },
};

registry.category("views").add("gallery", galleryView);
