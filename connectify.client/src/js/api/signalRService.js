import * as signalR from "@microsoft/signalr";

//tạo kết nối signalR
const connection  = new signalR.HubConnectionBuilder()
.withUrl("https://localhost:5173/hubs/notificationHub", {
    accessTokenFactory: ()=>localStorage.getItem("token"),
    transport: signalR.HttpTransportType.WebSockets
})
.withAutomaticReconnect() // tự đống kết nối nếu bị ngắt
.configureLogging(signalR.LogLevel.Information)
.build()

//kết nối vouws SignalR Hub
const startConnection = async ()=>{
    try{

    }catch(error){
        console.error("Error connection to signalR: ", error)
        setTimeout(startConnection, 5000) // thử kết nối lại sau 5s
    }
}
// Ngắt kết nối 
const stopConnection = async ()=>{
    try{

    }catch(error){
        console.error("Error disconnecting from SignalR: ", error)
    }
}
// lắng nghe sự kiện nhận thông báo từ server
const onReceiveNotification = (callback)=>{
    connection.on("ReceiveNotification", (message)=>{
        callback(message)
    })
}

export {startConnection, stopConnection, onReceiveNotification}