export default `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura de Ventas</title>
    <style>
        body {
            width: 216mm;
            font-family: Arial;
            display: grid;
            grid-template-columns: auto auto;
            padding-top: 30mm;
        }

        * {
            font-size: 12px;
            margin: 0;
        }

        h1 {
            display: inline;
        }

        h2 {
            display: inline;
            font-weight: normal;
        }

        header {
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: auto auto;
        }

        .bill1 {
            width: 108mm;
            margin: 0;
            margin-right: 10mm;
        }
        .bill2 {
            width: 108mm;
            margin: 0;
            margin-left: 10mm;
        }
        .containerCode {
            grid-column: 1;
            grid-row: 1;
            margin: 2mm;
            margin-left: 0;
        }

        .containerDate {
            grid-column: 3;
            grid-row: 1;
            margin: 2mm;
            margin-right: 0;
        }

        .containerClient {
            grid-column: 1 span;
            grid-row: 2;
            margin: 2mm;
            margin-left: 0;
        }

        table {
            width: 100%;
            text-align: center;
            margin-top: 2mm;
        }

        table > tr {
            display: grid;
            grid-template-columns: 15mm 1fr 15mm 15mm;
            grid-template-rows: auto;
            column-gap: 2mm;
        }

        .cellQuantity {
            grid-column: 1;
            grid-row: 1;
        }

        .cellProduct {
            grid-column: 2;
            grid-row: 1;
            text-align: left;
        }

        .cellPrice {
            grid-column: 3;
            grid-row: 1;
        }

        .cellTotal {
            grid-column: 4;
            grid-row: 1;
        }

        footer {
            display: grid;
            grid-template-columns: 1fr auto;
            padding-right: 4mm;
            margin-top: 3mm;
        }

        .containerTotal {
            grid-column: 2;
            text-align: right;
        }

        .containerTotal>div {
            margin: 1mm;
        }
    </style>
</head>

<body>
    <div class="bill1">
        <header>
            <div class="containerCode">
                <h1>Código: </h1>
                <h2 class="code"></h2>
            </div>
            <div class="containerDate">
                <h1>Fecha: </h1>
                <h2 class="date"></h2>
            </div>
            <div class="containerClient">
                <h1>Cliente: </h1>
                <h2 class="client"></h2>
            </div>
        </header>
        <table class="dtSale">
            <tr>
                <th class="cellQuantity">Cantidad</th>
                <th class="cellProduct">Producto</th>
                <th class="cellPrice">Precio</th>
                <th class="cellTotal">Total</th>
            </tr>
        </table>
        <footer>
            <div class="containerTotal">
                <div>
                    <h1>Total: </h1>
                    <h2 class="total"></h2>
                </div>
            </div>
        </footer>
    </div>
    <div class="bill2">
        <header>
            <div class="containerCode">
                <h1>Código: </h1>
                <h2 class="code2"></h2>
            </div>
            <div class="containerDate">
                <h1>Fecha: </h1>
                <h2 class="date2"></h2>
            </div>
            <div class="containerClient">
                <h1>Cliente: </h1>
                <h2 class="client2"></h2>
            </div>
        </header>
        <table class="dtSale2">
            <tr>
                <th class="cellQuantity">Cantidad</th>
                <th class="cellProduct">Producto</th>
                <th class="cellPrice">Precio</th>
                <th class="cellTotal">Total</th>
            </tr>
        </table>
        <footer>
            <div class="containerTotal">
                <div>
                    <h1>Total: </h1>
                    <h2 class="total2"></h2>
                </div>
            </div>
        </footer>
    </div>
</body>

</html>`