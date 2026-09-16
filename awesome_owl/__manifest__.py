# -*- coding: utf-8 -*-
{
    "name": "Awesome Owl",
    "version": "1.1",
    "category": "Tutorials",
    "summary": "Empty sandbox for learning OWL in Odoo 18",
    "depends": ["web"],
    "application": True,
    "installable": True,
    "license": "LGPL-3",
    "data": [
        "views/awesome_owl_menus.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "awesome_owl/static/src/**/*.js",
            "awesome_owl/static/src/**/*.xml",
        ],
    },
}
