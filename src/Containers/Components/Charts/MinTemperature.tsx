import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

interface ITemperature {
    cityId: number;
    countryName: string;
    cityName: string;
    createdOn: string;
    dt: string;
    temperatureUnit: string;
    y: number;
}

interface Props {
    data: ITemperature[];
}

const MinTemperature: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();
    const handlePointClick = (e:any) => {
        navigate(`/trend/temperature/${e.point.cityId}`);
    }

    const options: Highcharts.Options = {
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        title: {
            text: '<b>Minimum Temperature</b>'
        },
        xAxis: {
            categories: data.map(({ cityName }) => cityName)
        },
        yAxis: {
            id: 'temperature',
            title: {
                text: 'Temperature (°C)',
            },
        },
        series: [
            {
                name: 'Temperature',
                data: data,
                yAxis: "temperature",
                type: "line",
                lineWidth: 2,
                marker: {
                    radius: 8
                },
                point: {
                    events: {
                        click: handlePointClick
                    }
                }
            }
        ],
        tooltip: {
            formatter: function () {
                const point = this.point as any;
                return `<b>${data[point.index].countryName} - ${data[point.index].cityName}</b><br/>Temprature: ${point.y} ${data[point.index].temperatureUnit === "Celsius" ? "°C" : ""}<br/>Last updated time: ${moment(data[point.index].createdOn).format('DD-MM-YYYY HH:mm')}<br/>Source time: ${moment(data[point.index].dt).format('DD-MM-YYYY HH:mm')}`;
            }
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <HighchartsReact highcharts={Highcharts} options={options} immutable={true} allowChartUpdate={true} updateArgs={[true, true, true]} />
            </Grid>
        </Grid>
    );
};

export default MinTemperature;
