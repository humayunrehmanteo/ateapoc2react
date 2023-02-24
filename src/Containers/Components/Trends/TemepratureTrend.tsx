import React, { useState, useEffect } from 'react';
import Temperature from '../Charts/Trends/Temperature';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { api_url } from '../../../Config/config';

interface ITemperature {
    cityId: number;
    city: string;
    country: string;
    temperature: number;
    temperatureUnit: string;
    dt: Date,
    createdOn: string
}

interface ITemperatureRecord {
    temperature: ITemperature[];
    city: string;
    country: string;
}

interface IRelatedObject {
    city: string;
    country: string
}

const defaultTemperatureData: ITemperature[] = []

const TemepratureTrend: React.FC = () => {
    const [temperatureData, setTemperatureData]: [ITemperature[], (temperatureData: ITemperature[]) => void] = React.useState(defaultTemperatureData);
    const [relatedObject, setRelatedObject] = React.useState<IRelatedObject>()
    const { id } = useParams<{ id?: string }>();

    // Calling APIs
    React.useEffect(() => {
        // Temperature
        getTemperatureStats();

    }, []);

    const getTemperatureStats = () => {
        axios.get<ITemperatureRecord>(`${api_url}/WeatherStats?CityId=${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            // Set related object
            if (response.data.temperature.length) {
                setRelatedObject({city: response.data?.city, country: response.data.country});
            }
            // Set Graph data
            setTemperatureData(response.data.temperature);

        }).catch(ex => {
            const error =
                ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occurred";
            console.log(error);
        });
    }

    return (
        <Temperature data={temperatureData} relatedObject={relatedObject} />
    );
}

export default TemepratureTrend;
