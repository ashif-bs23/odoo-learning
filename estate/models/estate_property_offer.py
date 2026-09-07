from odoo import api, fields, models
from odoo.exceptions import UserError


class EstatePropertyOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Property Offer"

    price = fields.Float(string="Price")
    status = fields.Selection(
        selection=[
            ("accepted", "Accepted"),
            ("refused", "Refused"),
        ],
        string="Status",
        copy=False,
    )
    partner_id = fields.Many2one(
        "res.partner",
        string="Partner",
        required=True,
    )
    property_id = fields.Many2one(
        "estate.property",
        string="Property",
        required=True,
    )
    validity = fields.Integer(string="Validity (days)", default=7)
    date_deadline = fields.Date(
        string="Deadline",
        compute="_compute_date_deadline",
        inverse="_inverse_date_deadline",
    )

    @api.depends("create_date", "validity")
    def _compute_date_deadline(self):
        for offer in self:
            start = (
                offer.create_date.date()
                if offer.create_date
                else fields.Date.context_today(offer)
            )
            offer.date_deadline = fields.Date.add(start, days=offer.validity)

    def _inverse_date_deadline(self):
        for offer in self:
            start = (
                offer.create_date.date()
                if offer.create_date
                else fields.Date.context_today(offer)
            )
            offer.validity = (offer.date_deadline - start).days

    def action_accept(self):
        for record in self:
            existing = record.property_id.offer_ids.filtered(
                lambda o: o.status == "accepted" and o != record
            )
            if existing:
                raise UserError(
                    "An offer has already been accepted for this property."
                )
            record.status = "accepted"
            record.property_id.selling_price = record.price
            record.property_id.buyer_id = record.partner_id
        return True

    def action_refuse(self):
        for record in self:
            record.status = "refused"
        return True
