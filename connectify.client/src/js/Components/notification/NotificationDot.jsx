const NotificationDot = ({ number }) => {
    return (
        number > 0 &&
        <div className="absolute top-0 right-0 -m-1 bg-red-600 text-white text-xs px-1 rounded-full">
            {number}
        </div>
    )
}
export default NotificationDot;