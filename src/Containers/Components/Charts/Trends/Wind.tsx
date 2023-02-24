import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@mui/material';
import moment from 'moment';

interface DataPoint {
    cityId: number;
    windSpeed: number;
    windSpeedUnit: string;
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

const Wind: React.FC<Props> = ({ data, relatedObject }) => {
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
            text: `<b>Wind Speed Trend for Last 2 Hours of ${relatedObject?.city} - ${relatedObject?.country}</b>`
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
                    text: 'Wind Speed (m/s)'
                },
            }
        ],
        series: [
            {
                name: 'Wind Speed',
                type: 'line',
                lineWidth: 2,
                marker: {
                    radius: 8
                },
                data: data.map(({ createdOn, windSpeed }) => [new Date(moment(createdOn).utcOffset(0, true).format()).getTime(), windSpeed]),
                xAxis: 0,
                tooltip: {
                    valueSuffix: ' m/s'
                }
            }
        ],
        tooltip: {
            formatter: function () {
                const point = this.point as any;
                return `<b>Wind Speed:</b> ${point.y} ${data[point.index].windSpeedUnit}<br/>Last updated time: ${moment(data[point.index].createdOn).format('DD-MM-YYYY HH:mm')}<br/>Source time: ${moment(data[point.index].dt).format('DD-MM-YYYY HH:mm')}`;
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

export default Wind;
