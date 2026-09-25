# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'AI Subscription Manager',
    'version': '1.2',
    'summary': 'AI Subscription Manager',
    'depends': ['base', 'hr', 'web'],
    'application': True,
    'data': [
        'security/ir.model.access.csv',
        'data/ir_cron.xml',
        'views/ai_subscription_manager_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'ai_subscription_manager/static/src/**/*',
        ],
    },
}
