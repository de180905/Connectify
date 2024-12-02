import React, { useState, useEffect } from "react";
import { Table, Modal, Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { loadUsersForAdmin, lockUser, unlockUser } from "../api/user";
const pageSize = 8;
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loadParams, setLoadParams] = useState({
        searchTerm: '',
        status: 0,
        currentPage: 1
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [lockDuration, setLockDuration] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch users with pagination and filter on status
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await loadUsersForAdmin(loadParams.searchTerm, loadParams.status, loadParams.currentPage, pageSize);
                setUsers(data.items);
                setTotalPages(Math.ceil(data.totalCount / pageSize)); // Assuming data.totalCount is returned
            } catch {

            }
        };

        fetchUsers();
    }, [loadParams]);

    const handleLockUser = async () => {
        try {
            await lockUser(selectedUser.id, lockDuration);
            setShowModal(false);
            setLockDuration(0);
            setUsers(prev => [...prev].filter(u => u.id !== selectedUser.id));
        } catch (error) {
            console.log(error);
            window.alert("Error occurred");
        }
    };

    const handleUnlockUser = async (userId) => {
        try {
            await unlockUser(userId);
            setUsers(prev => [...prev].filter(u => u.id !== userId));
        } catch (error) {
            window.alert("Error occurred");
            console.log(error);
        }
    };

    const openLockModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handlePageChange = (pageNumber) => {
        setLoadParams(prev => { return { ...prev, currentPage: pageNumber } });
    };

    return (
        <div className="flex justify-center" style={{ marginTop: '80px' }}>
            <div className="w-3/4">
                <h1 className="text-center mb-4 text-2xl font-semibold">Users Management</h1>

                {/* Search and Filter Controls */}
                <Row className="mb-4">
                    <Col sm={8}>
                        <InputGroup>
                            <FormControl
                                placeholder="Search by email"
                                value={loadParams.searchTerm}
                                onChange={(e) => setLoadParams(prev => { return { ...prev, searchTerm: e.target.value, currentPage: 1 } })}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={4}>
                        <Form.Select
                            value={loadParams.status}
                            onChange={(e) => setLoadParams(prev => {
                                return { ...prev, status: parseInt(e.target.value), currentPage: 1 }
                            })}
                        >
                            <option value={0}>Active</option>
                            <option value={1}>Locked</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Users Table */}
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>
                                    {!user.roles.includes("Administrator") ? ( // Only show buttons if the user is not an admin
                                        loadParams.status === 1 ? (
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                                                onClick={() => handleUnlockUser(user.id)}
                                            >
                                                Unlock
                                            </button>
                                        ) : (
                                            <button
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                                                onClick={() => openLockModal(user)}
                                            >
                                                Lock
                                            </button>
                                        )
                                    ) : (
                                        <span className="text-gray-500 text-sm italic">Admin</span> // Optional display for admins
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-3">
                    <button
                        className={`px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400`}
                        disabled={loadParams.currentPage === 1}
                        onClick={() => handlePageChange(loadParams.currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">{loadParams.currentPage}</span>
                    <button
                        className={`px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400`}
                        disabled={loadParams.currentPage === totalPages}
                        onClick={() => handlePageChange(loadParams.currentPage + 1)}
                    >
                        Next
                    </button>
                </div>

                {/* Lock User Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Lock User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Are you sure you want to lock <strong>{selectedUser?.name}</strong>?
                        </p>
                        <Form>
                            <Form.Group controlId="lockDuration">
                                <Form.Label>Lock Duration (Minutes)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={lockDuration}
                                    onChange={(e) => setLockDuration(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="px-4 py-2 text-white rounded-md hover:bg-gray-600"
                            style={{ backgroundColor: 'gray' }}
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                            onClick={handleLockUser}
                        >
                            Lock User
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default UserManagement;
