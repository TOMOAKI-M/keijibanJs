const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Thread = require("./modules/Thread");
const PORT = 3001;

app.use(express.json());//忘れやすい
//app.use(express.static("public"));

mongoose.connect("xxxxx")
.then(() => console.log("db connected"))
.catch((err) => console.log(err));

//getメソッド
/*全取得*/
app.get("/api/v1/threads", async(req, res) => {
	try {
		const allThreads = await Thread.find({});
		res.status(200).json(allThreads);
	} catch (err) {
		console.log(err);
	}
});
/*単一取得*/
app.get("/api/v1/threads/:id", async(req, res) => {
	const id = req.params.id;
	try {
		const thread = await Thread.findOne({_id: id});
		res.status(200).json(thread);
	} catch (err) {
		console.log(err);
	}
});

//postメソッド
app.post("/api/v1/thread", async(req, res) => {
	try {
		const createThread = await Thread.create(req.body);
		res.status(200).json(createThread);
	} catch (err) {
		console.log(err);
	}
});

//delメソッド
app.delete("/api/v1/thread/del/:id", async(req, res) => {
	const id = req.params.id;
	try {
		await Thread.findOneAndRemove({_id: id});
		res.json({message: 'The memo has been deleted'});
	} catch (err) {
		console.log(err);
	}
});

//updateメソッド
app.patch('/api/v1/thread/edit/:id', async (req, res) => {
	//console.log(req.params.id);

    const updates = Object.keys(req.body) //リクエストで送った更新データを取得
    const allowedUpdates = ['name', 'title', 'content']  //updateできる項目を限定する
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) //リクエストで送った更新データがupdateできる項目に当てはまっているか

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' }) //当てはまっていなければ、HTTPステータス404とエラーメッセージを返す
    }

    try {
        const thread = await Thread.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!thread) { //「:id」に打ち込んだIDと同じドキュメントを探し、なければHTTPステータス404を返す
            return res.status(404).send()
        }

        res.send(thread) //「:id」に打ち込んだIDと同じドキュメントが見つかればそれアップデートし返す
    } catch (e) {
        res.status(500).send(e)//取得失敗したら、HTTPステータス500を返す
    }
})

app.listen(PORT, console.log("server running"));