import { Route, Routes } from "react-router-dom";
import App from "./App";
import Electronics from "./Electronics";
import Jewelery from "./Jewelery";
import Men from "./Men";
import Women from "./Women";
import ErrorPage from "./ErrorPage";
import CardPage from "./CardPage";
function AppRouter() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<App />}>
					<Route path=':id' element={<CardPage />} />
					<Route path='/electronics' element={<Electronics />} />
					<Route path='/jewelery' element={<Jewelery />} />
					<Route path='/men' element={<Men />} />
					<Route path='/women' element={<Women />} />
					<Route path='*' element={<ErrorPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default AppRouter;
