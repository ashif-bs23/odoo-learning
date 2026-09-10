from odoo import models


class EstatePropertyXlsx(models.AbstractModel):
    _name = "report.estate.property_xlsx"
    _inherit = "report.report_xlsx.abstract"
    _description = "Estate Property XLSX Report"

    def generate_xlsx_report(self, workbook, data, properties):
        sheet = workbook.add_worksheet("Properties")
        header = workbook.add_format({"bold": True, "bg_color": "#D3D3D3", "border": 1})
        cell = workbook.add_format({"border": 1})
        money = workbook.add_format({"border": 1, "num_format": "#,##0.00"})

        columns = [
            "Name",
            "Type",
            "Postcode",
            "Status",
            "Expected Price",
            "Selling Price",
            "Bedrooms",
            "Living Area",
            "Salesperson",
            "Buyer",
        ]
        for col, title in enumerate(columns):
            sheet.write(0, col, title, header)
            sheet.set_column(col, col, 18)

        status_labels = dict(properties._fields["state"].selection)
        for row, prop in enumerate(properties, start=1):
            sheet.write(row, 0, prop.name or "", cell)
            sheet.write(row, 1, prop.property_type_id.display_name or "", cell)
            sheet.write(row, 2, prop.postcode or "", cell)
            sheet.write(row, 3, status_labels.get(prop.state, prop.state or ""), cell)
            sheet.write_number(row, 4, prop.expected_price or 0.0, money)
            sheet.write_number(row, 5, prop.selling_price or 0.0, money)
            sheet.write_number(row, 6, prop.bedrooms or 0, cell)
            sheet.write_number(row, 7, prop.living_area or 0, cell)
            sheet.write(row, 8, prop.user_id.display_name or "", cell)
            sheet.write(row, 9, prop.buyer_id.display_name or "", cell)
