import { useEffect } from "react";
import axios from "axios";

const FormArea = (props) => {

	const load = props.load;

	useEffect(() => {

		const inputNameDOM = document.getElementById("inputName");
		const inputTextDOM = document.getElementById("inputTitle");
		const inputContentDOM = document.getElementById("inputContent");
		const formDOM = document.querySelector(".form-section");
		let inputName = "";
		let inputText = "";
		let inputContentText = "";

		inputNameDOM.addEventListener("change", (e) => {
			inputName = e.target.value;
		})
		inputTextDOM.addEventListener("change", (e) => {
			inputText = e.target.value;
		})
		inputContentDOM.addEventListener("change", (e) => {
			inputContentText = e.target.value;
		})

		formDOM.addEventListener("submit", async (e) => {
			e.preventDefault();

			if(inputName && inputText && inputContentText) {
				try {
					await axios.post("/api/v1/thread", {
						name: inputName,
						title: inputText,
						content: inputContentText
					});

					inputName = "";
					inputText = "";
					inputContentText = "";
					inputNameDOM.value = "";
					inputTextDOM.value = "";
					inputContentDOM.value = "";
					load();

				} catch (err) {
					console.log(err);
				}
			}
		});
	}, []);

	return (
		<form className="form-section">
			<p className="ttl">新規投稿</p>
			<p>名前</p>
			<input type="text" placeholder="名前" id="inputName" />
			<p>タイトル</p>
			<input type="text" placeholder="タイトル" id="inputTitle" />
			<p>内容</p>
			<textarea id="inputContent" rows="10" cols="30"></textarea>
			<br />
			<button id="submitButton" type="submit" className="btn">送信</button>
		</form>
	)
}

export default FormArea