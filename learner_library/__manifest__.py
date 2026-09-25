# -*- coding: utf-8 -*-
{
    'name': 'Learner Library',
    'version': '18.0.1.0.0',
    'summary': 'Learner Library',
    'license': 'LGPL-3',
    'depends': ['contacts'],
    'installable': True,
    'application': True,
    'data': [
        'security/ir.model.access.csv',
        'data/ir_sequence_data.xml',
        'views/library_book_views.xml',
        'views/res_partner_views.xml',
        'views/library_menus.xml',
    ],
}
