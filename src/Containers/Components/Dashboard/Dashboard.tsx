import React from 'react';
import { Grid } from '@mui/material';
import MinTemperature from '../Charts/MinTemperature';
import WindSpeed from '../Charts/WindSpeed';
import axios from 'axios';
import { api_url, refresh_time } from '../../../Config/config';

interface ITemperature {
    cityId: number;
    countryName: string;
    cityName: string;
    createdOn: string;
    dt: string;
    temperatureUnit: string;
    temperature: number;
    y: number;
}

interface ITemperatureRecord {
    temperatureRecords: ITemperature[]
}

const defaultTemperatureData: ITemperature[] = []

interface IWind {
    cityId: number;
    countryName: string;
    cityName: string;
    createdOn: string;
    dt: string;
    windSpeedUnit: string;
    windSpeed: number;
    y: number;
}

interface IWindRecord {
    maxWindSpeedRecords: IWind[]
}

const defaultWindData: IWind[] = []


function Dashboard() {
    // To handle API response
    const [temperatureData, setTemperatureData]: [ITemperature[], (temperatureData: ITemperature[]) => void] = React.useState(defaultTemperatureData);
    const [windData, setWindData]: [IWind[], (windData: IWind[]) => void] = React.useState(defaultWindData);

    // Poller Reference
    const intervalref = React.useRef<number | null>(null);

    // Calling APIs
    React.useEffect(() => {
        // Fetch Data for the first time when component mounts
        getMinTemperature();
        getHighestWind();

        // Start the poller
        if (intervalref.current !== null) return;
        intervalref.current = window.setInterval(() => {
            getMinTemperature();
            getHighestWind();
        }, refresh_time);

        return () => {
            if (intervalref.current !== null) {
                window.clearInterval(intervalref.current);
            }
        };

    }, []);

    const getMinTemperature = () => {
        axios.get<ITemperatureRecord>(`${api_url}/MinTempRecord`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            setTemperatureData(response.data.temperatureRecords);
        }).catch(ex => {
            const error =
                ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occurred";
            console.log(error);
        });
    }

    const getHighestWind = () => {
        axios.get<IWindRecord>(`${api_url}/HighestWindSpeedRecord`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            setWindData(response.data.maxWindSpeedRecords);
        }).catch(ex => {
            const error =
                ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occurred";
            console.log(error);
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MinTemperature data={temperatureData} />
            </Grid>
            <Grid item xs={12}>
                <WindSpeed data={windData} />
            </Grid>
        </Grid>

    );
}

export default Dashboard;
