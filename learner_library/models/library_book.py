from datetime import timedelta

from odoo import api, fields, models
from odoo.exceptions import UserError, ValidationError


class LibraryBook(models.Model):
    _name = 'learner.library.book'
    _description = 'Library Book'
    _order = 'name'

    name = fields.Char(string='Title', required=True)
    reference = fields.Char(readonly=True, copy=False)
    isbn = fields.Char(copy=False)
    author_id = fields.Many2one(
        'res.partner',
        string='Author',
        ondelete='restrict',
    )
    page_count = fields.Integer(string='Pages')
    publication_date = fields.Date()
    category = fields.Selection(
        selection=[
            ('fiction', 'Fiction'),
            ('science', 'Science'),
            ('history', 'History'),
            ('other', 'Other'),
        ],
        string='Category',
    )
    state = fields.Selection(
        selection=[
            ('draft', 'Draft'),
            ('available', 'Available'),
            ('borrowed', 'Borrowed'),
        ],
        string='Status',
        default='draft',
        readonly=True,
    )
    active = fields.Boolean(default=True)
    borrower_id = fields.Many2one(
        'res.partner',
        string='Borrower',
        ondelete='restrict',
        copy=False,
    )
    borrow_date = fields.Date(copy=False)
    due_date = fields.Date(copy=False)
    borrower_phone = fields.Char(
        related='borrower_id.phone',
        string='Borrower Phone',
        readonly=True,
    )
    days_overdue = fields.Integer(
        compute='_compute_days_overdue',
        readonly=True,
    )

    @api.onchange('borrow_date')
    def _onchange_borrow_date(self):
        if self.borrow_date:
            self.due_date = self.borrow_date + timedelta(days=14)
        else:
            self.due_date = False

    @api.depends('state', 'due_date')
    def _compute_days_overdue(self):
        for book in self:
            if book.state != 'borrowed' or not book.due_date:
                book.days_overdue = 0
                continue
            today = fields.Date.context_today(book)
            if book.due_date >= today:
                book.days_overdue = 0
            else:
                book.days_overdue = (today - book.due_date).days

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if not vals.get('reference'):
                vals['reference'] = self.env['ir.sequence'].next_by_code(
                    'learner.library.book'
                )
        return super().create(vals_list)

    def action_set_available(self):
        for book in self:
            if book.state != 'draft':
                raise UserError('Only a draft book can be set available.')
        self.write({'state': 'available'})
        return True

    def action_borrow(self):
        for book in self:
            if book.state != 'available':
                raise UserError('Only an available book can be borrowed.')
            if not book.borrower_id:
                raise UserError('Set a borrower before borrowing this book.')
            if not book.due_date:
                raise UserError('Set a due date before borrowing this book.')
            borrowed_count = self.search_count([
                ('borrower_id', '=', book.borrower_id.id),
                ('state', '=', 'borrowed'),
            ])
            if borrowed_count >= 3:
                raise UserError(
                    'This contact already has 3 borrowed books. The limit is 3.'
                )
            book.write({'state': 'borrowed'})
        return True

    def action_return(self):
        for book in self:
            if book.state != 'borrowed':
                raise UserError('Only a borrowed book can be returned.')
        self.write({
            'state': 'available',
            'borrower_id': False,
            'borrow_date': False,
            'due_date': False,
        })
        return True

    @api.constrains('page_count')
    def _check_page_count(self):
        for book in self:
            if book.page_count <= 0:
                raise ValidationError(
                    'The page count must be greater than zero.'
                )

    @api.constrains('borrow_date', 'due_date')
    def _check_borrow_dates(self):
        for book in self:
            if (
                book.borrow_date
                and book.due_date
                and book.due_date < book.borrow_date
            ):
                raise ValidationError(
                    'The due date cannot be before the borrow date.'
                )
