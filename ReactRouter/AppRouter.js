import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Events from "./Events";
import Products from "./Products";
import Whoops from "./Whoops";
import Location from "./Location";
import Services from "./Services";
import History from "./History";
function AppRouter() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />}>
					<Route path='services' element={<Services />} /> {/*Вложенность*/}
					<Route path='history' element={<History />} />
					<Route path='location' element={<Location />} />
				</Route>
				<Route path='/events' element={<Events />} />
				<Route path='/products' element={<Products />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='*' element={<Whoops />} />
			</Routes>
		</div>
	);
	//То же самое через useRoutes
	// let element = useRoutes([
	// 	{ path: "/", element: <Home /> },
	// 	{
	// 		path: "about",
	// 		element: <About />,
	// 		children: [
	// 			{
	// 				path: "services",
	// 				element: <Services />,
	// 			},
	// 			{ path: "history", element: <History /> },
	// 			{
	// 				path: "location",
	// 				element: <Location />,
	// 			},
	// 		],
	// 	},
	// 	{ path: "events", element: <Events /> },
	// 	{ path: "products", element: <Products /> },
	// 	{ path: "contact", element: <Contact /> },
	// 	{ path: "*", element: <Whoops /> },
	// 	{
	// 		path: "services",
	// 		redirectTo: "about/services",
	// 	},
	// ]);
	// return element;
}

export default AppRouter;
