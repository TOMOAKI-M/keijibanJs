import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditArea = () => {

	const [threadData, setThreadData ] = useState({});
	const inputNameEle = useRef(null);
	const inputTitleEle = useRef(null);
	const inputContentEle = useRef(null);
	let { id } = useParams();

	//編集するThreadを読みこむ
	const getThread = async () => {
		try {
			let { data } = await axios.get(`/api/v1/threads/${id}`);
			setThreadData(data);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {

		getThread();

		const formDOM = document.querySelector(".form-section.edit");

		formDOM.addEventListener("submit", async (e) => {
			e.preventDefault();

			if(inputNameEle.current.value && inputTitleEle.current.value && inputContentEle.current.value) {
				try {
					await axios.patch(`/api/v1/thread/edit/${id}`, {
						name: inputNameEle.current.value,
						title: inputTitleEle.current.value,
						content: inputContentEle.current.value
					});

					inputNameEle.current.value = "";
					inputTitleEle.current.value = "";
					inputContentEle.current.value = "";

					document.location.href = "/";

				} catch (err) {
					console.log(err);
				}
			}
		});
	}, []);

	return (
		<form className="form-section edit">
			<p className="ttl">編集画面</p>
			<p>名前</p>
			<input type="text" placeholder="名前" id="inputNameEdit" defaultValue={threadData.name} ref={inputNameEle} />
			<p>タイトル</p>
			<input type="text" placeholder="タイトル" id="inputTitleEdit" defaultValue={threadData.title} ref={inputTitleEle} />
			<p>内容</p>
			<textarea id="inputContentEdit" rows="10" cols="30" defaultValue={threadData.content} ref={inputContentEle}></textarea>
			<br />
			<button id="submitButtonEdit" type="submit" className="btn">編集する</button>
		</form>
	)
}

export default EditArea