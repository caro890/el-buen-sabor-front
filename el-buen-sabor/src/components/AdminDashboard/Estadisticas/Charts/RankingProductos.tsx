import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useAppSelector } from "../../../../hooks/redux";
import { EstadisticasService } from "../../../../services/EstadisticasService"
import { FC, useEffect, useState } from "react";
import { RankingProductos } from "../../../../types/Estadisticas";
import Chart from "react-google-charts";

interface IPropsRankingProductos {
    business: string
}

export const RankingProductosModule : FC<IPropsRankingProductos> = ({business}) => {
  const service = new EstadisticasService();
  const empresa = useAppSelector((state)=> (state.empresaReducer.empresa));
  const idSucursal = useAppSelector((state) => (state.empresaReducer.idActiveSucursal));

  const [data, setData] = useState<any[]>([]);
  const intialDateFrom = new Date();
  intialDateFrom.setMonth(0);
  intialDateFrom.setDate(1);
  const initialDateTo = new Date();
  initialDateTo.setMonth(11);
  initialDateTo.setDate(31);
  const [dateFrom, setDateFrom] = useState<Date>(intialDateFrom);
  const [dateTo, setDateTo] = useState<Date>(initialDateTo);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if(business=="sucursal"){
        if(idSucursal) {
            let array: RankingProductos[] = await service.getRankingSucursal(idSucursal, dateFrom, dateTo);
            let auxArray: any[] = [];

            array.forEach((ranking: RankingProductos) => {
                auxArray.push([ranking.denominacion, ranking.countVentas])
            });

            auxArray.unshift(["Producto", "Ventas"]);
            setData(auxArray);
        }
    } else {
        if(empresa) {
            let array: RankingProductos[] = await service.getRankingEmpresas(empresa.id, dateFrom, dateTo);
            let auxArray: any[] = [];

            array.forEach((ranking: RankingProductos) => {
                auxArray.push([ranking.denominacion, ranking.countVentas])
            });

            auxArray.unshift(["Producto", "Ventas"]);
            setData(auxArray);
        }
    }
  };

  const handleChangeDateInput = (inputId: string, date: string) => {
    let newDate: Date = new Date(date);
    if(inputId == "dateFrom"){
        setDateFrom(newDate);
    } else {    //dateTo
        setDateTo(newDate);
    }
  };

  const handleClickButtonVer = () => {
    if(dateFrom > dateTo) {
        setError(true);
        return;
    }
    getData();
  };

  return (
    <div className="mb-5">
        <Container>
            <Row className="mb-2">
                Productos más vendidos
            </Row>
            <Row>
                <Col>
                    <Form.Control
                        type="date"
                        id="dateFrom"
                        aria-label="Desde"
                        onChange={(e) => handleChangeDateInput(e.target.id, e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="date"
                        id="dateTo"
                        aria-label="Hasta"
                        onChange={(e) => handleChangeDateInput(e.target.id, e.target.value)}
                    />
                </Col>
                <Col>
                    <Button type="button" onClick={handleClickButtonVer}>VER</Button>
                </Col>
            </Row>
            <Row>
                { error &&
                    <div className="text-danger">Rango de fechas no válido</div>
                }
            </Row>
        </Container>
        <div>
                { data.length>1 &&
                    <Chart 
                        chartType="BarChart"
                        width={"100%"}
                        height={"400px"}
                        data={data}
                        options={{
                            chartArea: { width: "50%" },
                            hAxis: {
                                title: "Cantidad Vendida",
                                minValue: 0,
                            },
                            vAxis: {
                                title: "Producto",
                            }
                        }}
                    />
                }
        </div>
    </div>
  )
}
