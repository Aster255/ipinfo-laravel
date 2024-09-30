import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { Head, Link, useForm,router } from '@inertiajs/react';
import { useState, useEffect} from 'react';
import TableComponents from "@/Components/TableComponents";

const columns = [
    { header: "id", key: "id" },
    { header: "ip", key: "ip" },
];

export default function Dashboard({errors,History}) {
    const [IP, setIP]= useState("");
    const submit = (e) => {
        e.preventDefault();
        router.post(route('ipinfo'), {
            IP
        });
    };
    console.log(History);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard IPINFO
                </h2>
            }
        >
            <Head title="IPINFO" />

            <div className="py-12">
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="IP" value="IP" />

                    <TextInput
                        id="IP"
                        type="text"
                        name="IP"
                        value={IP}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setIP(e.target.value)}
                    />

                    <InputError message={errors.IP} className="mt-2" />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4">
                        FIND IP DETALS
                    </PrimaryButton>
                </div>
                <h1>Recent IP Lookups</h1>
                <TableComponents
                            columns={columns}
                            data={History.data}
                            renderActions={(rowData) => (
                                <>
                                <Link href="/ip-geopos/{rowData.id}">
                                <PrimaryButton>View</PrimaryButton>
                                </Link>
                                    
                                </>
                            )}
                ></TableComponents>
            </form>
            </div>
        </AuthenticatedLayout>
    );
}
