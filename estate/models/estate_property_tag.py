from odoo import fields, models


class EstatePropertyTag(models.Model):
    _name = "estate.property.tag"
    _description = "Property Tag"
    _order = "name"
    _sql_constraints = [
        ("name_uniq", "UNIQUE(name)", "The tag name must be unique."),
    ]

    name = fields.Char(string="Tag", required=True)
    color = fields.Integer(string="Color")
