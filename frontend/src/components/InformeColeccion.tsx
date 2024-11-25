import MaterialTable from "@material-table/core"
import { Column } from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters"

interface DatosProps {
    datos: {
      nombre: string
      marca: string
      tipo: string
      precio: number
    }[]
  }

  function InformeColeccion({datos}: DatosProps) {

    const columnas: Column<{ nombre: string; marca: string; tipo: string; precio: number }>[] = [
        { title: "Nombre", field: "nombre", filtering: false },
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo" },
        { title: "Precio (€)", field: "precio", type: "numeric", filtering: false },
      ]

  return (
    <>
<MaterialTable
      title="Informe de Colección"
      columns={columnas}
      data={datos}
      renderSummaryRow={({ column, data }) =>
        column.field === "precio"
          ? {
              value: data.reduce((agg, row) => agg + row.precio, 0),
              style: { background: "red" },
            }
          : undefined
      }
      options={{
        exportMenu: [
          {
          label: "Exportar a PDF",
          exportFunc: (cols, datas) => ExportPdf(cols, datas, "ColeccionesPDF"),
          },
          {
          label: "Exportar a CSV",
          exportFunc: (cols, datas) => ExportCsv(cols, datas, "ColeccionesCSV"),
          },
          ],
          headerStyle: {
            background: '#168859',
           },
        draggable: true,
        columnsButton: true,
        filtering: true,
      }}
      />
    </>
  )
}

export default InformeColeccion