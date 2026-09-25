from odoo import api, fields, models
from odoo.exceptions import UserError, ValidationError
from odoo.osv import expression
from odoo.tools import date_utils

class AiSubscription(models.Model):
    _name = 'ai.subscription'
    _description = 'AI Subscription'

    title = fields.Char(string='Title', required=True)
    description = fields.Text(string='Description')

    state = fields.Selection(
        selection=[
            ('due', 'Due'),
            ('overDue', 'Overdue'),
            ('cancel', 'Cancel'),
            ('paid', 'Paid'),
        ],
        string='Status',
        required=True,
        copy=False,
        default='due',
    )
    price = fields.Float(string='Price', required=True, copy=False)
    created = fields.Datetime(string='Created', required=True, copy=False, default=fields.Datetime.now)
    dueDate = fields.Date(string='Due Date', required=True, copy=False)
    validity = fields.Integer(string='Validity', required=True, copy=False, default=30)
    expirationDate = fields.Datetime( string='Expiration Date', copy=False, compute='_expiration_date', store=True,)
    notes = fields.Text(string='Notes', copy=False)

    employee_id = fields.Many2one("hr.employee", string="Employee", required=True, copy=False)

    @api.depends('created', 'validity')
    def _expiration_date(self):
        for record in self:
            if record.created:
                record.expirationDate = date_utils.add(
                    record.created,
                    days=record.validity,
                )
            else:
                record.expirationDate = False

    @api.model
    def _cron_update_overdue(self):
        today = fields.Date.today()

        records = self.search([
            ("dueDate", "<", today),
            ("state", "=", "due"),
        ])

        records.write({
            "state": "overDue",
        })

    def action_paid(self):
        for record in self:
            record.state = 'paid'

    @api.model
    def get_dashboard_stats(self, domain=None):
        domain = list(domain or [])
        active_domain = expression.AND([domain, [("state", "!=", "cancel")]])
        paid_domain = expression.AND([domain, [("state", "=", "paid")]])
        return {
            "total_subscription": float(sum(self.search(active_domain).mapped("price"))),
            "total_received": float(sum(self.search(paid_domain).mapped("price"))),
        }
