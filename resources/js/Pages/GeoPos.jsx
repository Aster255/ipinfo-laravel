import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { Head, Link, useForm,router } from '@inertiajs/react';
import { useState, useEffect} from 'react';
import TableComponents from "@/Components/TableComponents";
import MyMap from '@/Components/Map';

export default function GeoPos({history}) {
    const historyjson = JSON.parse(history.details);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Showing Details for {history.ip}
                </h2>
            }
        >
            <Link href={`/dashboard`}>
                <PrimaryButton className='m-3'>Back to IP INFO HOME</PrimaryButton>
            </Link>
            {historyjson.latitude && historyjson.longitude &&
            <MyMap lat={historyjson.latitude} lng={historyjson.longitude}></MyMap>
            }
        <table>
            <tr>
            <th>key</th>
            <th>value</th>
            </tr>
            <tr>
            <th>id</th>
            <th>{history.id}</th>
            </tr>
            <tr>
            <th>ip address</th>
            <th>{history.ip}</th>
            </tr>
          
      {Object.entries(historyjson).map(([key, value]) => (
      <tr>   
            <th>{key}</th>
            <th>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</th>
        </tr>
      ))}


    
            

        </table>
        </AuthenticatedLayout>
    );
}
