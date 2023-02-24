import React from 'react';
import Wind from '../Charts/Trends/Wind';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { api_url } from '../../../Config/config';

interface IWind {
    cityId: number;
    windSpeed: number;
    windSpeedUnit: string;
    dt: Date,
    createdOn: string
}

interface IWindRecord {
    windSpeed: IWind[];
    city: string;
    country: string;
}

interface IRelatedObject {
    city: string;
    country: string
}

const defaultWindData: IWind[] = []

const WindTrend: React.FC = () => {
    const [windData, setWindData]: [IWind[], (windData: IWind[]) => void] = React.useState(defaultWindData);
    const [relatedObject, setRelatedObject] = React.useState<IRelatedObject>()
    const { id } = useParams<{ id?: string }>();

    // Calling APIs
    React.useEffect(() => {
        // Wind
        getWindStats();
    }, []);

    const getWindStats = () => {
        axios.get<IWindRecord>(`${api_url}/WeatherStats?CityId=${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            // Set related object
            if (response.data.windSpeed.length) {
                setRelatedObject({city: response.data?.city, country: response.data.country});
            }
            setWindData(response.data.windSpeed);
        }).catch(ex => {
            const error =
                ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occurred";
            console.log(error);
        });
    }

  return (
    <Wind data={windData} relatedObject={relatedObject} />
  );
}

export default WindTrend;
