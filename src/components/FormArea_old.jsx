import { useEffect } from "react";
import axios from "axios";

const FormArea = (props) => {

	const load = props.load;
	//console.log("111:", load)

	useEffect(() => {

		const threadSectionDom = document.querySelector(".thread-section");
		const inputTextDOM = document.getElementById("inputTitle");
		const inputContentDOM = document.getElementById("inputContent");
		const formDOM = document.querySelector(".form-section");
		let inputText = "";
		let inputContentText = "";

		//console.log(threadSectionDom);

		//postメソッド
		inputTextDOM.addEventListener("change", (e) => {
			inputText = e.target.value;
		})
		inputContentDOM.addEventListener("change", (e) => {
			inputContentText = e.target.value;
		})

		formDOM.addEventListener("submit", async (e) => {
			e.preventDefault();

			if(inputText && inputContentText) {
				try {
					await axios.post("/api/v1/thread", {
						title: inputText,
						content: inputContentText
					});

					load(threadSectionDom);
					//console.log("add data");

				} catch (err) {
					console.log(err);
				}
			}
		});
	}, []);


	//useEffect(() => {
		// const threadSectionDom = document.querySelector(".thread-section");
		// const formDOM = document.querySelector(".form-section");
		// const inputTextDOM = document.getElementById("inputTitle");
		// const inputContentDOM = document.getElementById("inputContent");
		// let inputText = "";
		// let inputContentText = "";

		//console.log("123:", props.a)


		//postメソッド
		// inputTextDOM.addEventListener("change", (e) => {
		// 	inputText = e.target.value;
		// })
		// inputContentDOM.addEventListener("change", (e) => {
		// 	inputContentText = e.target.value;
		// })

		// formDOM.addEventListener("submit", async (e) => {
		// 	e.preventDefault();

		// 	if(inputText && inputContentText) {
		// 		console.log(inputText)
		// 		console.log(inputContentText)

		// 		try {
		// 			await axios.post("/api/v1/thread", {
		// 				title: inputText,
		// 				content: inputContentText
		// 			});

		// 			load(threadSectionDom);
		// 			console.log("add data");

		// 		} catch (err) {
		// 			console.log(err);
		// 		}
		// 	}
		// });

		//postメソッド
		// inputTextDOM.addEventListener("change", (e) => {
		// 	inputText = e.target.value;
		// });
		// inputContentDOM.addEventListener("change", (e) => {
		// 	inputContentText = e.target.value;
		// });

		// formDOM.addEventListener("submit", async (e) => {
		// 	e.preventDefault();

		// 	//console.log("2:",aa)

		// 	if(inputText && inputContentText) {
		// 		console.log(inputText)
		// 		console.log(inputContentText)
		// 		try {
		// 			await axios.post("/api/v1/thread", {
		// 				title: inputText,
		// 				content: inputContentText
		// 			});

		// 			load(threadSectionDom);
		// 			console.log("add data");

		// 		} catch (err) {
		// 			console.log(err);
		// 		}
		// 	}
		// });
	//}, [load]);

	return (
		<form className="form-section">
			<p>タイトル</p>
			<input type="text" placeholder="タイトル" id="inputTitle" />
			<p>内容</p>
			<textarea id="inputContent" rows="10" cols="30"></textarea>
			<br />
			<button id="submitButton" type="submit">送信</button>
		</form>
	)
}

export default FormArea