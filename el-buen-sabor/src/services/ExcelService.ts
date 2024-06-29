import { EstadisticasService } from "./EstadisticasService"

export const getExcelSucursal = async (idSucursal: number, desde: Date, hasta: Date) => {
    const service = new EstadisticasService();
    service.generateExcelSucursal(idSucursal, desde, hasta).then(data => {
        const fileName = 'estadisticasSucursal.xls';
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    })
    .catch((error) => {
        console.log("", error);
    });
}

export const getExcelEmpresa = async (idEmpresa: number, desde: Date, hasta: Date) => {
    const service = new EstadisticasService();
    service.generateExcelEmpresa(idEmpresa, desde, hasta).then(data => {
        const fileName = 'estadisticasEmpresa.xls';
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    })
    .catch((error) => {
        console.log("", error);
    });
}