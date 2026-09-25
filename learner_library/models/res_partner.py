from odoo import api, fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'

    borrowed_book_ids = fields.One2many(
        'learner.library.book',
        'borrower_id',
        string='Borrowed Books',
    )
    borrowed_book_count = fields.Integer(
        compute='_compute_borrowed_book_count',
    )

    @api.depends('borrowed_book_ids.state')
    def _compute_borrowed_book_count(self):
        grouped = self.env['learner.library.book']._read_group(
            [
                ('borrower_id', 'in', self.ids),
                ('state', '=', 'borrowed'),
            ],
            ['borrower_id'],
            ['__count'],
        )
        counts = {partner.id: count for partner, count in grouped}
        for partner in self:
            partner.borrowed_book_count = counts.get(partner.id, 0)
