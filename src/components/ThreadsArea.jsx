import { useState, useEffect } from "react";
import axios from "axios";
import { FormArea } from "./index";


const ThreadsArea = () => {

	const [threadData, setThreadData ] = useState([]);

	//Threadのすべてを読みこむ
	const getAllThreads = async () => {
		try {
			let { data } = await axios.get("/api/v1/threads");
			setThreadData(data);
		} catch (err) {
			console.log(err);
		}
	}

	const deleteThread = async (e) => {
		//if ( window.confirm("削除しますか？") ) {
			const id = e.currentTarget.parentNode.id;
			await axios.delete(`/api/v1/thread/del/${id}`);
			getAllThreads();
		//}
	}

	// let editId = "";
	// const editThread = async (e) => {
	// 	editId = e.currentTarget.parentNode.id;
	// 	const formDOM = document.querySelector(".form-section.edit");
	// 	const formDOMName = document.querySelector(".id_"+editId+" .name");
	// 	const formDOMTtl = document.querySelector(".id_"+editId+" .ttl");
	// 	const formDOMBody = document.querySelector(".id_"+editId+" .body");

	// 	formDOM.id = editId;
	// 	document.getElementById("inputNameEdit").value = formDOMName.textContent;
	// 	document.getElementById("inputTitleEdit").value = formDOMTtl.textContent;
	// 	document.getElementById("inputContentEdit").value = formDOMBody.textContent;
	// }

	useEffect(() => {
		getAllThreads();
	}, []);

	return (
		<>
			<div className="thread-section" id="thread">
				{threadData.map((val, index) => {
					return (
						<div className={"single-thread id_" + val._id} id={val._id} key={index.toString()}>
							<p className="name">{val.name}</p>
							<h3 className="ttl">{val.title}</h3>
							<p className="body">{val.content}</p>
							<button className="btn del" onClick={deleteThread}>削除</button>
							<a href={"/edit/"+val._id} className="btn edit">編集</a>
						</div>
					)
				})}
			</div>
			<FormArea load={getAllThreads} />
		</>
	)
}

export default ThreadsArea