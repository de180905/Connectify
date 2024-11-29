import { useCallback, useEffect, useRef } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import { Link } from 'react-router-dom';
Modal.setAppElement('#root');
const UserList = forwardRef(({}, ref) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const loadUsersFuncRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [trigger, setTrigger] = useState({ pageNumber: 1 });
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = useCallback(async () => {
        if (!loadUsersFuncRef.current) {
            return;
        }
        setIsLoading(true);
        const usersPaging = await loadUsersFuncRef.current(trigger.page, 5);
        const users = usersPaging.items;
        if (trigger.page === 1) {
            setUsers(users); // Replace with new users on page 1
        } else {
            setUsers(prev => [...prev, ...users]); // Append users on other pages
        }
        setIsLoading(false);
    }, [loadUsersFuncRef.current, trigger.page]);

    useEffect(() => {
        fetchData();
    }, [trigger, fetchData]);
    useImperativeHandle(ref, () => ({
        open: () => {
            setModalIsOpen(true);
        },
        close: () => setModalIsOpen(false),
        setLoadUsersFunc: (func) => {
            loadUsersFuncRef.current = func;
        }
    }));
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
                content: {
                    width: '400px',  // Adjust width as needed
                    height: '300px', // Adjust height to make the modal shorter
                    margin: 'auto',  // Center the modal horizontally and vertically
                    padding: '20px', // Adjust padding for content
                },
            }}
            overlayClassName="my-overlay"
        >
            <button onClick={() => setModalIsOpen(false)} className="absolute top-0 right-0 p-4 text-red-600">
                <i className="fas fa-times fa-2x"></i>
            </button>
            <div>
                <h2 className="text-xl font-semibold mb-4 text-center">User List</h2>
                <div className="flex flex-col items-start space-y-4 overflow-auto">
                    {users.map((user) => (
                        <Link to={`/${user.id}`}>
                            <div key={user.id} className="flex items-center space-x-4 w-full">
                                <img
                                    src={user.avatar || 'default-avatar-url'} // Replace with actual avatar URL or default
                                    alt={user.fullName}
                                    className="rounded-full w-12 h-12 object-cover"
                                />
                                <p className="text-lg">{user.fullName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Modal>

    )
});
export default UserList;