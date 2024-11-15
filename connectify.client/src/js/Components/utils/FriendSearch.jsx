import { useState, useEffect } from 'react'
import { Modal, Button, Form, Image, Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { getPeople } from '../../api/search';
import { FaArrowLeft } from 'react-icons/fa';
const FriendSearch = ({ handleFriendSelect, onClose, listToExclude = [] }) => {
    const excludedIds = listToExclude.map(friend => friend.id);
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const getData = async () => {
            const data = await getPeople('', '', '', 'friends', 1);
            if (data) {
                console.log(data.items);
                setFriends(data.items);
            }
        };
        getData();
    },[])
    return (
        <>
            {/* Tag Friends Modal Content */}
            {onClose && <FaArrowLeft
                style={{ color: '#6c757d', backgroundColor: 'white', borderColor: '#6c757d', cursor: 'pointer' }}
                onClick={() => { onClose(); }}
                size={24} // Adjust the size of the icon
            />}
            <h5 className="text-center">Tag Friends</h5>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Search friends..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>
            {/* List of friends with fixed height and overflow */}
            <ListGroup className="mt-3" style={{ height: '300px', overflowY: 'auto' }}>
                {friends.length>0 && friends
                    .filter(friend => friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
                        && !excludedIds.includes(friend.id))
                    .map(friend => (
                        <ListGroup.Item
                            key={friend.id}
                            action
                            onClick={() => { handleFriendSelect(friend); }}
                            className="d-flex align-items-center"
                        >
                            <Image src={friend.avatar} roundedCircle width={40} height={40} className="me-3" />
                            {friend.fullName}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </>
    )
}
export default FriendSearch;