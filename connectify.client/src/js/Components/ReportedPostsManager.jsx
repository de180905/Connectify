import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Row, Col } from "react-bootstrap";
import { getReportDetailsByPostId, getReportedPosts, deleteReportedPost } from "../api/postReport"; // Import deleteReportedPost API
const pageSize = 8;
const ReportedPostsManager = () => {
    const [reportedPosts, setReportedPosts] = useState([]);
    const [loadParams, setLoadParams] = useState({
        currentPage: 1,
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [reportDetails, setReportDetails] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch reported posts with pagination
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getReportedPosts(loadParams.currentPage, pageSize);
                setReportedPosts(data.items);
                setTotalPages(Math.ceil(data.totalCount / pageSize)); // Assuming `totalCount` is returned
            } catch (error) {
                console.error("Failed to fetch reported posts", error);
            }
        };

        fetchPosts();
    }, [loadParams]);

    const openDetailsModal = async (post) => {
        try {
            const details = await getReportDetailsByPostId(post.postId);
            setSelectedPost(post);
            setReportDetails(details);
            setShowModal(true);
        } catch (error) {
            console.error("Failed to fetch report details", error);
        }
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm("Are you sure you want to remove this post?")) {
            try {
                await deleteReportedPost(postId); // Call the delete API
                setReportedPosts((prev) => prev.filter((post) => post.postId !== postId)); // Remove from the state
                alert("Post removed successfully.");
            } catch (error) {
                console.error("Failed to delete the post", error);
                alert("Failed to delete the post. Please try again.");
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        setLoadParams((prev) => ({ ...prev, currentPage: pageNumber }));
    };

    return (
        <div className="flex justify-center" style={{ marginTop: "80px" }}>
            <div className="w-3/4 w-50">
                <h1 className="text-center mb-4 text-2xl font-semibold">Reported Posts Management</h1>

                {/* Reported Posts Table */}
                <Table striped bordered hover className="text-center w-100">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post ID</th>
                            <th>Content</th>
                            <th>Report Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedPosts.map((post, index) => (
                            <tr key={post.postId}>
                                <td>{index + 1 + (loadParams.currentPage - 1) * 10}</td>
                                <td>
                                    <a
                                        href={`/post-view/${post.postId}/-1`} // Replace with your post URL
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        {post.postId}
                                    </a>
                                </td>
                                <td>{post.content}</td>
                                <td>
                                    <button
                                        className="btn-link"
                                        onClick={() => openDetailsModal(post)}
                                    >
                                        {post.reportCount}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="px-4 py-2 rounded-md hover:bg-red-600 text-sm"
                                        onClick={() => handleDeletePost(post.postId)}
                                        style={{color: 'red'}}
                                    >
                                        Remove Post
                                    </button>
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

                {/* Report Details Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Report Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <strong>Post Content:</strong> {selectedPost?.content}
                        </p>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportDetails.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail.reportReason}</td>
                                        <td>{detail.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ReportedPostsManager;
