import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    constructor(orm) {
        this.orm = orm;
        this.keepLast = new KeepLast();
        this.records = [];
        this.offset = 0;
        this.limit = 80;
        this.count = 0;
    }

    _specification(imageField, tooltipField, fieldNames) {
        const specification = {
            [imageField]: {},
            write_date: {},
        };
        if (tooltipField) {
            specification[tooltipField] = {};
        }
        for (const name of fieldNames || []) {
            specification[name] = {};
        }
        return specification;
    }

    async load({ resModel, domain, imageField, tooltipField, fieldNames, offset, limit }) {
        if (offset !== undefined) {
            this.offset = offset;
        }
        if (limit !== undefined) {
            this.limit = limit;
        }
        const { records, length } = await this.keepLast.add(
            this.orm.webSearchRead(resModel, domain, {
                specification: this._specification(imageField, tooltipField, fieldNames),
                offset: this.offset,
                limit: this.limit,
                context: {
                    bin_size: true,
                },
            })
        );
        this.records = records;
        this.count = length;
    }

    async uploadImage({ resModel, recordId, imageField, tooltipField, fieldNames, data }) {
        const [saved] = await this.orm.webSave(
            resModel,
            [recordId],
            { [imageField]: data },
            {
                specification: this._specification(imageField, tooltipField, fieldNames),
                context: { bin_size: true },
            }
        );
        const record = this.records.find((r) => r.id === recordId);
        if (record && saved) {
            Object.assign(record, saved);
        }
    }
}
