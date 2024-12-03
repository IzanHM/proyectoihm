import MaterialTable from "@material-table/core"
import { Column } from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters"

interface DatosProps {
    datos: {
      nombre: string
      login: string
      password: string
      rol: string
    }[]
  }

function InformeUsuario({datos}: DatosProps) {

    const columnas: Column<{ nombre: string; login: string; password: string; rol: string }>[] = [
        { title: "Nombre", field: "nombre"}, 
        { title: "Login", field: "login", filtering: false},
        { title: "Password", field: "password", filtering: false },
        { title: "Rol", field: "rol", filtering: false },
      ]

    return (
        <>
       <MaterialTable
      title="Informe de Usuario"
      columns={columnas}
      data={datos}
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

export default InformeUsuario