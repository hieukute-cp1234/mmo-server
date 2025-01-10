const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 3000;

// mongoose
//     .connect(
//         "mongodb+srv://minhhieukutecp30:9OB5TRl5sDJhL4xF@cluster0.ai0se.mongodb.net/"
//         // {
//         //     useNewUrlParser: true,
//         //     useUnifiedTopology: true,
//         // }
//     )
//     .then(() => console.log("Đã kết nối MongoDB"))
//     .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// const inventorySchema = new mongoose.Schema({
//     product: String,
//     quantity: Number,
// });
// const Inventory = mongoose.model("Inventory", inventorySchema);
app.get("/input", async (req, res) => {
    try {
        const { key } = req.query;
        // if (key !== "95e6173a-1bc8-40a1-95cf-7498f80a5cfc") {
        //     return res.status(403).json({ error: "Key không hợp lệ." });
        // }
        return res.json({ sum: 10 });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Lỗi khi tải tài khoản lên kho." });
    }
});
app.get("/input", async (req, res) => {
    try {
        const { key, order_id, quantity } = req.query;
        console.log(key);
        if (order_id && quantity) {
            // if (key !== "95e6173a-1bc8-40a1-95cf-7498f80a5cfc") {
            //     return res.status(403).json({ error: "Key không hợp lệ." });
            // }
            const value1 =
                '0lessnewsman40765|EDIit9MTO0eu|repetitious.hype@taikhoanfb.shop|csrf=2YHIHOtFAcWOMjuTjVtmQZyfjPMXkQTI;rur="CCO054681719421250541753306868:01f76fe2890a0ba7e6f020d6fa8f3497d450cdd45ad2ab98683c084909fdb66ca18659ad";mid=ZqAjbwAEAAHEZA-d9MbCLIo9eIKR;ds_user_id=68171942125;th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";ig_did=FEF472AD-CFFF-4788-9614-9A60BC2C4875;sessionid=68171942125%3AnLSBhEQ0ArpFLQ%3A12%3AAYeyF0hTo1cQzx4XxxWjwgFLoobdx_9zqeqSUEsZkQ|CKKJKBXR4DAMMWGINAFW7MAJU7HYHFJM';
            const value2 =
                'lowlevelslogan52382|pFL8OlXZqc8z|repetitious.cane@taikhoanfb.shop|csrf=8n0EwsIsOB99t6BNBuFd7wkVhYCVH5B1;rur="EAG054679982473190541753325088:01f78dfbe1efa87d8e136387933b8742eb4cd98d300c5acef455661feafd9369c3947532";mid=ZqBqmwAEAAFc8XxAw87cwZpaTnpT;ds_user_id=67998247319;th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";th_eu_pref="";ig_did=F499E4A0-4BFF-4267-B999-99AD7F01D4DA;sessionid=67998247319%3ArTyu6gfwaSDr3S%3A2%3AAYd8cla7qCCZVUbW08DIK3d3UQYRL8ovGIAc2NmU2A|JKTJ6YHELVNFXCXMJIS36HRXOXBR4YWF';
            return res.json([{ product: value1 }, { product: value2 }]);
        } else if (!order_id && !quantity) {
            return res.json({ sum: 2 });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Lỗi khi tải tài khoản lên kho." });
    }
});

app.post("/check-transactions", async (req, res) => {
    try {
        const {
            content,
            id: transactionID,
            transferAmount,
            accountNumber,
        } = req.body;

        console.log(req.body);

        const extractMemoTransaction = (note) => {
            if (!note) return "";
            const matchString = note.match(/M3TS([a-zA-Z0-9]+)/);

            if (matchString && matchString[1]) {
                return matchString[1];
            }
            return "";
        };

        const userEncode = extractMemoTransaction(content);
        console.log("userEncode", userEncode);

        const trander = userEncode;

        if (!trander) {
            return;
        }

        const history = {
            user: trander,
            memo: content || "",
            status: 1,
            value: transferAmount / 25946,
            from: "",
            to: accountNumber,
            type: 2,
            wallet: "BANKING",
            txn: transactionID,
        };

        console.log("history", history);

        // const balancePrevious = trander?.balance;
        // const userUpdate = await usersRepository.updateBalancePlus(
        //     trander?.balance || 0,
        //     history.value,
        //     history.user as unknown as mongoose.Schema.Types.ObjectId
        // );

        // if (!userUpdate) {
        //     return;
        // }

        // const [findAdmin, findCoin] = await Promise.all([
        //     usersRepository.getUserByRole(3),
        //     coinRepository.getCoinByName("USDT"),
        // ]);

        // const baseFlow = {
        //     userId: findAdmin?._id as unknown as ObjectId,
        //     orderId: null,
        //     unit: findCoin?._id as unknown as ObjectId,
        //     status: EStatusFlow.COMPLETE,
        // };

        // const inflowIntro: InflowUser = {
        //     ...baseFlow,
        //     receiveId: history.user as unknown as ObjectId,
        //     amount: history.value,
        //     reason:
        //         history.type === ETypeTransaction.USDT
        //             ? EInflowUser.DEPOSIT_USDT
        //             : EInflowUser.DEPOSIT_BANKING,
        //     type: ETypeFlow.INFLOW,
        //     previousBalance: balancePrevious,
        //     newBalance: roundNumber(
        //         +(balancePrevious || 0) + +(history.value || 0)
        //     ),
        //     fromUserRef: null,
        // };

        // await flowMoneyRepository.saveInflowUser(inflowIntro);

        // await historiesTransactionRepository.updateHistoriesTransaction({
        //     historyId: newHistory._id as unknown as string,
        //     data: { status: EStatusTransaction.DONE },
        // });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Lỗi khi tải tài khoản lên kho." });
    }
});
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
