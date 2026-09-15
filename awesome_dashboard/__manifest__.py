# -*- coding: utf-8 -*-
{
    "name": "Awesome Dashboard",
    "version": "1.0.3",
    "category": "Tutorials",
    "summary": "Empty sandbox for learning OWL in Odoo 18",
    "depends": ["web", "mail", "crm"],
    "application": True,
    "installable": True,
    "license": "LGPL-3",
    "data": [
        "security/ir.model.access.csv",
        "views/views.xml",
        "data/tshirt_order_data.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "awesome_dashboard/static/src/dashboard_action.js",
            "awesome_dashboard/static/src/statistics_service.js",
        ],
        "awesome_dashboard.dashboard": [
            "awesome_dashboard/static/src/dashboard/**/*.js",
            "awesome_dashboard/static/src/dashboard/**/*.xml",
            "awesome_dashboard/static/src/dashboard/**/*.scss",
        ],
    },
}
