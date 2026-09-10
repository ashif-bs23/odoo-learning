from odoo import Command, models


class EstateProperty(models.Model):
    _inherit = "estate.property"

    def action_sold(self):
        result = super().action_sold()
        for record in self:
            self.env["account.move"].create({
                "partner_id": record.buyer_id.id,
                "move_type": "out_invoice",
                "invoice_line_ids": [
                    Command.create({
                        "name": "6% of selling price",
                        "quantity": 1.0,
                        "price_unit": record.selling_price * 0.06,
                        "display_type": "product",
                    }),
                    Command.create({
                        "name": "Administrative fees",
                        "quantity": 1.0,
                        "price_unit": 100.0,
                        "display_type": "product",
                    }),
                ],
            })
        return result

    def get_property_invoice(self):
        self.ensure_one()
        if not self.buyer_id:
            return self.env["account.move"]
        return self.env["account.move"].search(
            [
                ("partner_id", "=", self.buyer_id.id),
                ("move_type", "=", "out_invoice"),
            ],
            order="id desc",
            limit=1,
        )
