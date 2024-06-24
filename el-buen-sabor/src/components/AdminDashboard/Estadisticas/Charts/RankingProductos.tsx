import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useAppSelector } from "../../../../hooks/redux";
import { EstadisticasService } from "../../../../services/EstadisticasService"
import { FC, useEffect, useState } from "react";
import Chart from "react-google-charts";

interface IPropsRankingProductos {
    business: string
}

export const RankingProductosModule : FC<IPropsRankingProductos> = ({business}) => {
  const service = new EstadisticasService();
  const empresa = useAppSelector((state)=> (state.empresaReducer.empresa));
  const sucursal = useAppSelector((state) => (state.sucursalReducer.sucursal));

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
  });

  const getData = async () => {
    if(business=="sucursal"){
        if(sucursal) {
            let array: any[] = await service.getBestProductsRanking(sucursal.id, dateFrom, dateTo);
            array.unshift(["Ventas", "Producto"]);
            setData(array);
        }
    } else {
        if(empresa) {
            let array: any[] = await service.getRankingEmpresas(empresa.id, dateFrom, dateTo);
            array.unshift(["Ventas", "Producto"]);
            setData(array);
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
    <div>
        <div>
           Productos más vendidos {business=="sucursal" ? sucursal?.nombre : empresa?.nombre}
        </div>
        <Container>
            <Row>
                <Col>
                    <Form.Control
                        type="date"
                        id="dateFrom"
                        aria-label="Desde"
                        /*defaultValue={dateFrom.toDateString()}*/
                        onChange={(e) => handleChangeDateInput(e.target.id, e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="date"
                        id="dateTo"
                        aria-label="Hasta"
                        /*defaultValue={dateFrom.toDateString()}*/
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
            <Chart 
                chartType="BarChart"
                width={"100%"}
                height={"400px"}
                data={data}
                options={{
                    chartArea: { width: "50%" },
                    hAxis: {
                        title: "Productos",
                        minValue: 0,
                    },
                    vAxis: {
                        title: "Cantidad Vendida",
                    }
                }}
            />
        </div>
    </div>
  )
}
