{
    "name": "Awesome Clicker",
    "version": "1.0",
    "category": "Game",
    "summary": "Clicker game for learning OWL in Odoo 18",
    "depends": ["web"],
    "application": True,
    "installable": True,
    "license": "LGPL-3",
    "assets": {
        "web.assets_backend": [
            "awesome_clicker/static/src/**/*.js",
            "awesome_clicker/static/src/**/*.xml",
        ],
    },
}