import logging
import os

from lxml import etree

from odoo import fields, models
from odoo.loglevels import ustr
from odoo.tools import misc, view_validation

_logger = logging.getLogger(__name__)
_gallery_validator = None


class View(models.Model):
    _inherit = "ir.ui.view"

    type = fields.Selection(selection_add=[("gallery", "Awesome Gallery")])

    def _get_view_info(self):
        return {
            "gallery": {"icon": "fa fa-picture-o"},
        } | super()._get_view_info()

    def _validate_tag_gallery(self, node, name_manager, node_info):
        if not node_info["validate"]:
            return
        for attr in ("image_field", "tooltip_field"):
            fname = node.get(attr)
            if fname:
                name_manager.has_field(node, fname, node_info)
        for field_node in node.xpath(".//field[@name]"):
            name_manager.has_field(field_node, field_node.get("name"), node_info)


@view_validation.validate("gallery")
def schema_gallery(arch, **kwargs):
    """Check the gallery view against its Relax NG schema."""
    global _gallery_validator
    if _gallery_validator is None:
        with misc.file_open(os.path.join("awesome_gallery", "rng", "gallery_view.rng")) as f:
            _gallery_validator = etree.RelaxNG(etree.parse(f))
    if _gallery_validator.validate(arch):
        return True
    for error in _gallery_validator.error_log:
        _logger.error(ustr(error))
    return False
