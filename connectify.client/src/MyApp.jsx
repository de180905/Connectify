import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Feed from './js/Feed';
import GroupIndex from './js/GroupIndex';
import GroupTimeline from './js/GroupTimeline';
import ChatroomsLayout from './js/ChatroomsLayout';
import ChatroomDetail from './js/ChatRoomDetail';
import UserTimeline from './js/UserTimeline';
import LoginLayout from './js/LoginLayout';
import LoginForm from './js/LoginForm';
import RegisterForm from './js/RegisterForm';
import { TokenService, signin } from './js/api/authen';
import VerifyAccount from './js/VerifyAccount';
import * as signalR from '@microsoft/signalr';
import { CONNECTIFY_API_BASE_URL } from './js/api/config';
import * as React from 'react';
import UserSettings from './js/UserSetting';
import AppProvider from './js/Contexts/AppProvider';
import PeopleIndex from './js/PeopleIndex';
import PeopleRequest from './js/PeopleRequest';
import AppLayout from './js/AppLayout';
import ForgotPasswordForm from './js/password/ForgotPasswordForm';
import ResetPasswordForm from './js/password/ResetPasswordForm';
import ResetPasswordSuccess from './js/password/ResetPasswordSuccess';


function MyApp() {
    const [connection, setConnection] = React.useState(null);
    const chatRoomRef = React.useRef(null);
    React.useEffect(() => {
        // Create a new connection
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(CONNECTIFY_API_BASE_URL + '/hubs/chathub', {
                accessTokenFactory: () => TokenService.getAccessToken()
            })
            .withAutomaticReconnect() // Optional: Automatically reconnect if the connection is lost
            .build();

        setConnection(newConnection);
    }, []);

    React.useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected to the SignalR hub');

                    // Receive messages from the hub
                    connection.on('ReceiveMessage', (message) => {

                        if (chatRoomRef.current) {
                            console.log(message);
                            chatRoomRef.current.setMessages((prev) => {
                                return [message, ...prev];
                            }); // Replace newMessages with your messages array
                        }
                    });
                    connection.on('deleteMessage', (messageId) => {
                        if (chatRoomRef.current) {
                            chatRoomRef.current.setMessages((prev) => {
                                return prev.map((message) => {
                                    return message.messageId === messageId ? { ...message, deleted: true, text: null, files: null } :
                                        message.replyToId === messageId ? { ...message, replyToContent: null, relyToDeleted: true } :
                                            message
                                });
                            }); // Replace newMessages with your messages array
                        }
                    });
                })
                .catch(error => console.error('Connection failed: ', error));
        }

        // Clean up the connection when the component unmounts
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [connection]);
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Feed />} />
                        <Route path=":userId" element={<UserTimeline />} />
                        <Route path="/settings" element={<UserSettings />} />
                        <Route path="groups">
                            <Route index element={<GroupIndex />} />
                            <Route path=":groupId" element={<GroupTimeline />} />
                        </Route>
                        <Route path="people">
                            <Route index element={<PeopleIndex />} />
                            <Route path="requests" element={<PeopleRequest />} />
                        </Route>
                        <Route path="chatrooms" element={<ChatroomsLayout />}>
                            <Route index element={<Navigate to={`/chatrooms/1`} replace />} />
                            <Route path=":id" element={<ChatroomDetail ref={chatRoomRef} />} />
                        </Route>
                    </Route>                   
                    <Route path="account" element={<LoginLayout />}>
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route path="forgot-password" element={<ForgotPasswordForm />} />
                        <Route path="reset-password" element={<ResetPasswordForm />} />
                        <Route path="reset-password-success" element={<ResetPasswordSuccess />} />
                    </Route>
                    <Route path="account/verify-email/:email" element={<VerifyAccount />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default MyApp;