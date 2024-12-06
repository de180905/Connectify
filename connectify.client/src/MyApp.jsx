import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Feed from './js/Components/newsFeedFeature/Feed';
import GroupIndex from './js/Components/groupFeature/GroupIndex';
import GroupTimeline from './js/Components/groupFeature/GroupTimeline';
import UserTimeline from './js/Components/userTimelineFeature/UserTimeline';
import LoginLayout from './js/Components/authenFeature/LoginLayout';
import LoginForm from './js/Components/authenFeature/LoginForm';
import RegisterForm from './js/Components/authenFeature/RegisterForm';
import { TokenService, signin } from './js/api/authen';
import VerifyAccount from './js/Components/authenFeature/VerifyAccount';
import * as signalR from '@microsoft/signalr';
import { CONNECTIFY_API_BASE_URL } from './js/api/config';
import * as React from 'react';
import UserSettings from './js/Components/userSettingFeature/UserSetting';
import AppProvider from './js/Contexts/AppProvider';
import PeopleIndex from './js/Components/peopleFeature/PeopleIndex';
import ResetPasswordForm from './js/Components/password/ResetPasswordForm';
import ResetPasswordSuccess from './js/Components/password/ResetPasswordSuccess';
import UserTimelineMain from './js/Components/userTimelineFeature/UserTimelineMain';
import TimelineGallery from './js/Components/userTimelineFeature/TimelineGallery';
import UserTimelineFriends from './js/Components/userTimelineFeature/UserTimelineFriends';
import Sidebar from './js/Components/appLayout/Sidebar';
import Header from './js/Components/appLayout/Header';
import ChatroomsLayout from './js/Components/chatFeature/ChatroomsLayout';
import ChatroomDetail from './js/Components/chatFeature/ChatroomDetail';
import PeopleRequest from './js/Components/peopleFeature/PeopleRequest';
import ForgotPasswordForm from './js/Components/password/ForgotPasswordForm';
import NotificationForm from './js/Components/notification/NotificationForm';
import { toast, ToastContainer } from 'react-toastify';
import PostView from './js/Components/post/PostView';
import PostReport from './js/Components/report/PostReport';
import ActivityHistory from './js/Components/activityHistory/ActivityHistory';
import PrivateRoute from './js/Components/authenFeature/PrivateRoute';
import UserManagement from './js/Components/UserManagement';
import ReportedPostsManager from './js/Components/ReportedPostsManager';
function MyApp() {
    const [connection, setConnection] = React.useState(null);
    const chatRoomDetailRef = React.useRef(null);
    const chatroomsLayoutRef = React.useRef(null);
    const chatNotificationRef = React.useRef(null);
    const headerRef = React.useRef(null);
    React.useEffect(() => {
        // Create a new connection
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${CONNECTIFY_API_BASE_URL}/hubs/chatHub`, {
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
                    connection.on('ReceiveMessage', (message) => {
                        if (message.chatRoomId == chatRoomDetailRef?.current?.id) {
                            chatRoomDetailRef.current.receiveMessage(message);
                        }
                        connection.invoke('AcknowledgeMessage', parseInt(message.chatRoomId)
                            , message.chatRoomId == chatRoomDetailRef?.current?.id)
                            .then(result => {
                                if (chatroomsLayoutRef.current) {
                                    chatroomsLayoutRef.current.updateAndMoveChatroomToTop(result);
                                }
                                chatNotificationRef.current.updateAndMoveChatroomToTop(result);
                            })
                    });
                    connection.on('deleteMessage', (messageId) => {
                        if (chatRoomDetailRef.current) {
                            chatRoomDetailRef.current.deleteMessage(messageId);
                        }
                    });
                    connection.on('notification', (data) => {
                        if (data) {
                            console.log('send notification data:', data)
                            toast(<NotificationForm
                                id={data.notificationId}
                                name={data.triggeredByUserName}
                                avatar={data.triggeredByUserAvatarUrl}
                                message={data.message}
                                actionLink={data.actionLink} />,
                                {
                                    position: "bottom-right",
                                    autoClose: 15000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                }
                            )
                            if (headerRef.current) {
                                headerRef.current.incrementUnreadNotification();
                            }
                        }
                    });
                    connection.on('ChatroomUpdate', (chatroomId) => {
                        connection.invoke('AcknowledgeMessage', parseInt(chatroomId)
                            , chatroomId == chatRoomDetailRef?.current?.id)
                            .then(result => {
                                if (chatroomsLayoutRef.current) {
                                    chatroomsLayoutRef.current.updateAndMoveChatroomToTop(result);
                                }
                                chatNotificationRef.current.updateAndMoveChatroomToTop(result);
                            })
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
        <Router>
            <AppProvider>
                <Routes>
                    <Route element={
                        (<div id="wrapper">
                            <Header ref={headerRef} chatNotificationRef={chatNotificationRef} />
                            <Sidebar />
                            <Outlet />
                        </div>)}
                    >
                        <Route element={<PrivateRoute />}>
                            <Route index element={<Feed />} />
                            <Route path=":userId" element={<UserTimeline />}>
                                <Route index element={<UserTimelineMain />} />
                                <Route path="photos" element={<TimelineGallery />} />
                                <Route path="friends" element={<UserTimelineFriends />} />
                            </Route>
                            <Route path="/settings" element={<UserSettings />} />
                            <Route path="groups">
                                <Route index element={<GroupIndex />} />
                                <Route path=":groupId" element={<GroupTimeline />} />
                            </Route>
                            <Route path="people">
                                <Route index element={<PeopleIndex />} />
                                <Route path="requests" element={<PeopleRequest />} />
                            </Route>
                            <Route path="chatrooms" element={<ChatroomsLayout ref={chatroomsLayoutRef} />}>
                                <Route path=":id" element={<ChatroomDetail
                                    ref={chatRoomDetailRef}
                                    updateChatroomHasSeen={(id) => {
                                        if (chatroomsLayoutRef.current) {
                                            chatroomsLayoutRef.current.updateChatroomHasSeen(id);
                                        }
                                        chatNotificationRef.current.updateChatroomHasSeen(id);
                                    }}
                                />}
                                />
                            </Route>
                        </Route>
                        <Route path="admin">
                            <Route path="ManageUsers" element={<UserManagement />} />
                            <Route path="ManagePostReports" element={<ReportedPostsManager />} />
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
                    <Route path='post-view/:postId/:commentId' element={<PostView/>}/>
                    <Route path ='activityHistory' element={<ActivityHistory/>}/>
                </Routes>
                <ToastContainer />
            </AppProvider>           
        </Router>

    );
}

export default MyApp;