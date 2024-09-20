import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Feed from './js/Feed';
import GroupLayout from './js/GroupLayout';
import GroupIndex from './js/GroupIndex';
import GroupTimeline from './js/GroupTimeline';
import ChatroomsLayout from './js/ChatroomsLayout';
import ChatroomDetail from './js/ChatRoomDetail';
import UserTimeline from './js/UserTimeline';

function MyApp() {
    return (
        <Router>
            <Routes>
                <Route index element={<Feed/>}/>

                {/* User profile */}
                <Route path=":userId" element={<UserTimeline />} />

                {/* Groups section */}
                <Route path="groups" element={<GroupLayout />}>
                    <Route index element={<GroupIndex />} />
                    <Route path=":groupId" element={<GroupTimeline/>} />
                </Route>

                {/* Friends section */}
                <Route path="friends">
                    <Route path="list"/>
                    <Route path="requests"/>
                <Route path="suggestions" />
                </Route>

                {/* Chatroom */}
                <Route path="chatrooms" element={<ChatroomsLayout />}>
                    {/* Redirect to the first chatroom if no id is provided */}
                    <Route index element={<Navigate to={`/chatrooms/1`} replace />} />
                    {/* Nested route for individual chatroom */}
                    <Route path=":id" element={<ChatroomDetail />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default MyApp;