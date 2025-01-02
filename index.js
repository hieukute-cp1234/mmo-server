const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

mongoose
    .connect(
        "mongodb+srv://minhhieukutecp30:9OB5TRl5sDJhL4xF@cluster0.ai0se.mongodb.net/"
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }
    )
    .then(() => console.log("Đã kết nối MongoDB"))
    .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

const inventorySchema = new mongoose.Schema({
    product: String,
    quantity: Number,
});
const Inventory = mongoose.model("Inventory", inventorySchema);
// app.get("/input", async (req, res) => {
//     try {
//         const { key } = req.query;
//         if (key !== "95e6173a-1bc8-40a1-95cf-7498f80a5cfc") {
//             return res.status(403).json({ error: "Key không hợp lệ." });
//         }
//         return res.json({ sum: 10 });
//     } catch (error) {
//         return res
//             .status(500)
//             .json({ error: "Lỗi khi tải tài khoản lên kho." });
//     }
// });
app.get("/input", async (req, res) => {
    try {
        const { key, order_id, quantity } = req.query;
        console.log(key);
        if (order_id && quantity) {
            if (key !== "95e6173a-1bc8-40a1-95cf-7498f80a5cfc") {
                return res.status(403).json({ error: "Key không hợp lệ." });
            }
            return res.json([{ product: "A" }, { product: "B" }]);
        } else if (!order_id && !quantity) {
            return res.json({ sum: 20 });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Lỗi khi tải tài khoản lên kho." });
    }
});
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
