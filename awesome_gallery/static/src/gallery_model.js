import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    constructor(orm) {
        this.orm = orm;
        this.keepLast = new KeepLast();
        this.records = [];
    }

    async load({ resModel, domain, imageField, tooltipField }) {
        const specification = {
            [imageField]: {},
        };
        if (tooltipField) {
            specification[tooltipField] = {};
        }
        const { records } = await this.keepLast.add(
            this.orm.webSearchRead(resModel, domain, {
                specification,
                context: {
                    bin_size: true,
                },
            })
        );
        this.records = records;
    }
}
