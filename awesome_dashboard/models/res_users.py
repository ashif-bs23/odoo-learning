# -*- coding: utf-8 -*-
from odoo import fields, models


class ResUsers(models.Model):
    _inherit = "res.users"

    awesome_dashboard_disabled_item_ids = fields.Json(default=lambda self: [])

    @property
    def SELF_READABLE_FIELDS(self):
        return super().SELF_READABLE_FIELDS + [
            "awesome_dashboard_disabled_item_ids",
        ]

    @property
    def SELF_WRITEABLE_FIELDS(self):
        return super().SELF_WRITEABLE_FIELDS + [
            "awesome_dashboard_disabled_item_ids",
        ]
