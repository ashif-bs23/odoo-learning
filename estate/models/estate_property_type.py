from odoo import fields, models


class EstatePropertyType(models.Model):
    _name = "estate.property.type"
    _description = "Property Type"
    _sql_constraints = [
        ("name_uniq", "UNIQUE(name)", "The property type name must be unique."),
    ]

    name = fields.Char(string="Property Type", required=True)
    description = fields.Text(string="Description")
