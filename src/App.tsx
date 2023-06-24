import './Global.css';

import React, { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Loading from './pages/Loading';

const MainPage = lazy(() => import('./pages/Mainpage'));
const Preview = lazy(() => import('./pages/Preview'));
const SubmitPage = lazy(() => import('./pages/SubmitPage'));

function App() {
	return (
		<div>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/preview" element={<Preview />} />
					<Route path="/submit" element={<SubmitPage />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
