# -*- coding: utf-8 -*-
{
    "name": "Gallery View",
    "version": "1.0",
    "category": "Tutorials/AwesomeGallery",
    "summary": "Starting module for Master the Odoo web framework, chapter 3: Create a Gallery View",
    "depends": ["web", "contacts"],
    "application": True,
    "installable": True,
    "license": "LGPL-3",
    "data": [
        "views/views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "awesome_gallery/static/src/**/*",
        ],
    },
}