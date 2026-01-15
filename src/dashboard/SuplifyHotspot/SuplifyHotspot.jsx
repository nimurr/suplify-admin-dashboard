import React, { useState } from 'react';
import { Modal, message } from 'antd';
import {
    useCreateSuplifyHotspotMutation,
    useDeleteSuplifyHotspotMutation,
    useGetSuplifyHotspotQuery,
    useUpdateSuplifyHotspotMutation
} from '../../redux/features/SuplifyHotspot/SuplifyHotspot';
import url from '../../redux/api/baseUrl';
import toast from 'react-hot-toast';

const SuplifyHotspot = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const { data, isLoading, refetch } = useGetSuplifyHotspotQuery({ page, limit });
    const [createSuplifyHotspot] = useCreateSuplifyHotspotMutation();
    const [updateSuplifyHotspot] = useUpdateSuplifyHotspotMutation();
    const [deleteSuplifyHotspot] = useDeleteSuplifyHotspotMutation();


    /* ------------------ MODAL STATES ------------------ */
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    /* ------------------ FORM STATE ------------------ */
    const [form, setForm] = useState({
        name: '',
        address: '',
        attachments: null,
    });

    const totalPage = data?.data?.attributes?.totalPages || 1;
    const totalResult = data?.data?.attributes?.totalResults || 0;
    const results = data?.data?.attributes?.results || [];

    /* ------------------ HANDLERS ------------------ */

    const resetForm = () => {
        setForm({ name: '', address: '', attachments: null });
    };

    const handleCreate = async () => {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('address', form.address);
        formData.append('attachments', form.attachments);
        if (!form.attachments) {
            toast.error('Please upload an image');
        }

        try {
            const res = await createSuplifyHotspot(formData).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message);
                setCreateOpen(false);
                resetForm();
                refetch();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }


        // message.success('Hotspot created');
        // setCreateOpen(false);
        // resetForm();
    };

    const openEditModal = (item) => {
        setSelectedItem(item);
        setForm({
            name: item.name,
            address: item.address,
            attachments: null,
        });
        setEditOpen(true);
    };

    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('address', form.address);
        if (form.attachments) {
            formData.append('attachments', form.attachments);
        }

        try {
            const res = await updateSuplifyHotspot({ data: formData, id: selectedItem._SuplifyHotspotId }).unwrap();
            console.log(res);
            if (res?.code == 200) {
                refetch();
                toast.success(res?.message);
                setEditOpen(false);
                resetForm();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }

        // message.success('Hotspot updated');
        // setEditOpen(false);
        // resetForm();
    };

    const handleDelete = async () => {

        try {
            const res = await deleteSuplifyHotspot({ id: selectedItem._SuplifyHotspotId }).unwrap();
            console.log(res);
            if (res?.code == 200) {
                refetch();
                toast.success(res?.message);
                setDeleteOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }

    };


    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center flex-wrap gap-2 justify-between">
                <h3 className="text-2xl font-semibold">Suplify Hotspot</h3>
                <button
                    onClick={() => {
                        setCreateOpen(true);
                        resetForm();
                    }}
                    className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] font-semibold text-[white] py-3 px-8 rounded-lg"
                >
                    Create
                </button>
            </div>

            {
                isLoading &&
                <div className='grid xl:grid-cols-4 lg:grid-cols-2 gap-3 grid-cols-1'>
                    {
                        [...Array(4)].map((_, index) => (
                            <div class="mx-auto w-full max-w-sm rounded-md border border-[#8400ff2a]  p-4">
                                <div class="flex animate-pulse space-x-4">
                                    <div class="size-10 rounded-full bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                        <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="col-span-2 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                                <div class="col-span-1 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            </div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                        </div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="col-span-2 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                                <div class="col-span-1 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            </div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                        </div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="col-span-2 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                                <div class="col-span-1 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            </div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                        </div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="col-span-2 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                                <div class="col-span-1 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            </div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                            <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }


            {/* Cards */}
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
                {results.map((item) => (
                    <div
                        className="border border-[#eee] p-3 rounded-md text-center"
                        key={item.id}
                    >
                        <img
                            className="w-full min-h-[200px] object-cover rounded-lg"
                            src={
                                item.attachments?.[0]?.attachment?.includes('amazonaws')
                                    ? item.attachments[0].attachment
                                    : url + item.attachments?.[0]?.attachment
                            }
                            alt={item.name}
                        />

                        <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
                        <h4 className="text-sm text-[#888]">{item.address}</h4>

                        <div className="flex justify-center gap-2 mt-3">
                            <button
                                onClick={() => openEditModal(item)}
                                className="px-8 py-3 rounded bg-[#4040df] text-[white] text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedItem(item);
                                    setDeleteOpen(true);
                                }}
                                className="px-8 py-3 rounded bg-[#df3838] text-[white] text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination (UNCHANGED) */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-gray-600">
                    Page {page} of {totalPage} • {totalResult} results
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-md border text-sm
                            ${page === 1
                                ? 'cursor-not-allowed bg-gray-100 text-[#646464]'
                                : 'hover:bg-gray-100'}
                        `}
                    >
                        Prev
                    </button>

                    {[...Array(totalPage)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`px-4 py-2 rounded-md border text-sm
                                    ${page === pageNumber
                                        ? 'bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg'
                                        : 'hover:bg-gray-100'}
                                `}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPage}
                        className={`px-4 py-2 rounded-md border text-sm
                            ${page === totalPage
                                ? 'cursor-not-allowed bg-gray-100 text-[#646464]'
                                : 'hover:bg-gray-100'}
                        `}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* ---------------- CREATE MODAL ---------------- */}
            <Modal
                title="Create Hotspot"
                open={createOpen}
                onOk={handleCreate}
                onCancel={() => setCreateOpen(false)}
                okText="Create"
            >
                <div className="space-y-4">
                    <input
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Address"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                    <input
                        type="file"
                        onChange={(e) =>
                            setForm({ ...form, attachments: e.target.files[0] })
                        }
                    />
                </div>
            </Modal>

            {/* ---------------- EDIT MODAL ---------------- */}
            <Modal
                title="Edit Hotspot"
                open={editOpen}
                onOk={handleEdit}
                onCancel={() => setEditOpen(false)}
                okText="Update"
            >
                <div className="space-y-4">
                    <input
                        className="w-full border px-3 py-2 rounded"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="w-full border px-3 py-2 rounded"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                    <input
                        type="file"
                        onChange={(e) =>
                            setForm({ ...form, attachments: e.target.files[0] })
                        }
                    />
                </div>
            </Modal>

            {/* ---------------- DELETE MODAL ---------------- */}
            <Modal
                title="Delete Hotspot"
                open={deleteOpen}
                onOk={handleDelete}
                onCancel={() => setDeleteOpen(false)}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                <p>
                    Are you sure you want to delete{' '}
                    <strong>{selectedItem?.name}</strong>?
                </p>
            </Modal>
        </div>
    );
};

export default SuplifyHotspot;
