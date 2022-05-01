import './assets/style.scss';
import { ThreadsArea, EditArea, Error } from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
	<div className="board-section">
		<h2>NodejsとMongoDBで掲示板</h2>
		<Router>
			<Routes>
				<Route path="/" element={<ThreadsArea />} />
				<Route path="/edit/:id" element={<EditArea />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</Router>

	</div>
  );
}

export default App;
