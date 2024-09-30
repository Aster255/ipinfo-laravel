import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { Head, Link, useForm,router } from '@inertiajs/react';
import { useState, useEffect} from 'react';
import TableComponents from "@/Components/TableComponents";
import PaginationComponents from '@/Components/PaginationComponents';

const columns = [
    { header: "id", key: "id" },
    { header: "ip", key: "ip" },
];

export default function Dashboard({errors,History}) {
    const [IP, setIP]= useState("");

    const [selectedIds, setSelectedIds] = useState([])

    const handleSelect = (id) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter(selectedId => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    };

    const handleDelete = () => {
        if (selectedIds.length === 0) return;
        axios.post(route('delete-ip-history'), { ids: selectedIds })
            .then(response => {
                router.reload();
            })
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route('ipinfo'), {
            IP
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    IP INFO Home
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
                </form>
                {selectedIds.length?
                <div className="mt-4 flex items-center justify-end">

                <button
                onClick={handleDelete}
            className={
                `inline-flex items-center rounded-md border border-gray-300 bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25`
            }
        >
            Delete Selected
        </button>
        
                </div>:<></>
                }
                <h1>Recent IP Lookups</h1>
                <TableComponents
                            columns={columns}
                            data={History.data}
                            renderActions={(rowData) => (
                                <>
                                    <Link href={`/ip-geopos/${rowData.id}`}>
                                        <PrimaryButton>View</PrimaryButton>
                                    </Link>

                                   <vr/>select
                                   <input
                                    type="checkbox"
                                    checked={selectedIds.includes(rowData.id)}
                                    onChange={() => handleSelect(rowData.id)}
                                    />
                                </>
                            )}
                ></TableComponents>

            <PaginationComponents paginationData={History} />
            
            </div>
        </AuthenticatedLayout>
    );
}
