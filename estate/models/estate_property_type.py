from odoo import fields, models


class EstatePropertyType(models.Model):
    _name = "estate.property.type"
    _description = "Property Type"
    _order = "sequence, name"
    _sql_constraints = [
        ("name_uniq", "UNIQUE(name)", "The property type name must be unique."),
    ]

    name = fields.Char(string="Property Type", required=True)
    description = fields.Text(string="Description")
    sequence = fields.Integer(string="Sequence", default=10)
    property_ids = fields.One2many(
        "estate.property",
        "property_type_id",
        string="Properties",
    )
