import random

from odoo import http
from odoo.http import request


class AwesomeDashboard(http.Controller):
    @http.route("/awesome_dashboard/statistics", type="json", auth="user")
    def get_statistics(self):
        sizes = ("s", "m", "l", "xl")
        orders_by_size = {size: 0 for size in sizes}
        grouped = request.env["awesome_dashboard.tshirt_order"].read_group(
            [], ["size"], ["size"]
        )
        for group in grouped:
            if group.get("size"):
                orders_by_size[group["size"]] = group["size_count"]
        return {
            "nb_new_orders": random.randint(10, 200),
            "total_amount": random.randint(100, 1000),
            "average_quantity": random.randint(4, 12),
            "nb_cancelled_orders": random.randint(0, 50),
            "average_time": random.randint(4, 123),
            "orders_by_size": orders_by_size,
        }
