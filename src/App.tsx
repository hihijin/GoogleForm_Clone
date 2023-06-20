import './Global.css';

import React, {
	lazy,
	Suspense,
} from 'react';

import {
	Route,
	Routes,
} from 'react-router-dom';

import Loading from './pages/Loading';

const MainPage = lazy(() => import('./pages/Mainpage'));

function App() {
	return (
		<div>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<MainPage />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
