import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    constructor(orm) {
        this.orm = orm;
        this.keepLast = new KeepLast();
        this.records = [];
    }

    async load({ resModel, domain, imageField }) {
        const { records } = await this.keepLast.add(
            this.orm.webSearchRead(resModel, domain, {
                specification: {
                    [imageField]: {},
                },
                context: {
                    bin_size: true,
                },
            })
        );
        this.records = records;
    }
}