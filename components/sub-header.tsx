"use client";
import React, { useEffect, useState } from 'react';
import { Search } from "lucide-react";


const languages = [
	{ value: 'es', label: 'Español', icon: '🇪🇸' },
	{ value: 'pt', label: 'Portugués', icon: '🇧🇷' },
];

export default function SubHeader() {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [language, setLanguage] = useState(languages[0].value);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 40 && currentScrollY > lastScrollY) {
				setShow(false);
			} else if (currentScrollY <= 40 || currentScrollY < lastScrollY) {
				setShow(true);
			}
			setLastScrollY(currentScrollY);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	return (
		<div
			className="w-full bg-black h-10 flex items-center justify-end px-4"
			style={{ minHeight: '40px' }}
		>
			<div className="flex items-center gap-4">
				<div className="relative" style={{ minWidth: 160 }}>
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
					<input
						type="text"
						placeholder="Buscar..."
						value={search}
						onChange={e => setSearch(e.target.value)}
						className="bg-gray-900 text-white rounded-md border border-gray-600 px-8 py-2 text-sm focus:outline-none focus:ring w-full"
						style={{ minWidth: 160 }}
					/>
				</div>
				<select
					value={language}
					onChange={e => setLanguage(e.target.value)}
					className="bg-gray-900 text-white rounded-md border border-gray-600 px-3 py-2 text-sm focus:outline-none ml-2"
					style={{ minWidth: 160 }}
				>
					{languages.map(l => (
						<option key={l.value} value={l.value}>
							{l.icon + ' ' + l.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}