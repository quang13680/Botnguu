const login = require("fca-horizon-remake");
const fs = require('fs');
const path = require('path');

// Đường dẫn tuyệt đối tới file appstate.json
const appStatePath = path.join(__dirname, 'appstate.json');

// Kiểm tra xem file appstate có tồn tại không
if (!fs.existsSync(appStatePath)) {
    console.error("LỖI: Không tìm thấy file appstate.json tại " + appStatePath);
    process.exit(1);
}

const appState = JSON.parse(fs.readFileSync(appStatePath, 'utf8'));

login({ appState }, (err, api) => {
    if(err) {
        console.error("Lỗi đăng nhập:", err);
        return;
    }
    
    console.log("Bot đã online! Đang chờ lệnh từ bạn...");

    api.listen((err, message) => {
        if(err) return;

        // Chỉ phản hồi nếu tin nhắn là "!ping"
        if (message.body === "!ping") {
            api.sendMessage("Pong! Bot vẫn đang hoạt động ổn định.", message.threadID);
            console.log(`Đã nhận lệnh !ping từ ID: ${message.threadID}`);
        }
    });
});
