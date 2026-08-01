import { lazy } from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './layout';

// // Lazy load feature components
// const ProductList = lazy(() => import('@org/shop-feature-products').then(m => ({ default: m.ProductList })));
// const ProductDetail = lazy(() => import('@org/shop-feature-product-detail').then(m => ({ default: m.ProductDetail })));
const Header = lazy(() => import(`./components/Header`))
const Hero = lazy(() => import(`./components/Hero`))


export function App() {
	return (
		<Layout>
			<Header />
			<Hero />
		</Layout>
	);
}

export default App;
