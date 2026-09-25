from odoo import fields, models


class View(models.Model):
    _inherit = "ir.ui.view"

    type = fields.Selection(selection_add=[("stats", "Subscription Stats")])

    def _get_view_info(self):
        return {
            "stats": {"icon": "fa fa-bar-chart"},
        } | super()._get_view_info()

    def _validate_tag_stats(self, node, name_manager, node_info):
        return
