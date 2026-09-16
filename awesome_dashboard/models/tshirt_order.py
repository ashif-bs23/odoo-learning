# -*- coding: utf-8 -*-
from odoo import fields, models


class TshirtOrder(models.Model):
    _name = "awesome_dashboard.tshirt_order"
    _description = "T-shirt order"
    _order = "id desc"

    name = fields.Char(required=True)
    size = fields.Selection(
        [
            ("s", "S"),
            ("m", "M"),
            ("l", "L"),
            ("xl", "XL"),
        ],
        required=True,
        index=True,
    )
    amount = fields.Float()
