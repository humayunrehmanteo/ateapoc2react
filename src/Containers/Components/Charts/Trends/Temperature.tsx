import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

interface DataPoint {
    cityId: number;
    city: string;
    country: string;
    temperature: number;
    temperatureUnit: string;
    dt: Date,
    createdOn: string
}

interface IRelatedObject {
    city: string;
    country: string;
}

interface Props {
    data: DataPoint[];
    relatedObject?: IRelatedObject;
}

const Temperature: React.FC<Props> = ({ data, relatedObject }) => {
    const navigate = useNavigate();
    
    const options: Highcharts.Options = {
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        title: {
            text: `<b>Temperature Trend for Last 2 Hours of ${relatedObject?.city} - ${relatedObject?.country}<b>`
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%l:%M %P'
            }
        },
        yAxis: [
            {
                title: {
                    text: 'Temperature (°C)'
                }
            }
        ],
        series: [
            {
                name: 'Temperature',
                type: 'line',
                lineWidth: 2,
                marker: {
                    radius: 4
                },
                data: data.map(({ createdOn, temperature }) => [new Date(moment(createdOn).utcOffset(0, true).format()).getTime(), temperature]),
                yAxis: 0,
                tooltip: {
                    valueSuffix: ' °C'
                }
            }
        ],
        tooltip: {
            formatter: function () {
                const point = this.point as any;
                return `<b>Temprature:</b> ${point.y} ${data[point.index].temperatureUnit === "Celsius" ? "°C" : ""}<br/>Last updated time: ${moment(data[point.index].createdOn).format('DD-MM-YYYY HH:mm')}<br/>Source time: ${moment(data[point.index].dt).format('DD-MM-YYYY HH:mm')}`;
            }
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button onClick={() => navigate('/')}>Back</Button>
            </Grid>
            <Grid item xs={12}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </Grid>
        </Grid>

    );
}

export default Temperature;
