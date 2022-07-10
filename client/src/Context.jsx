import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import openSocket from 'socket.io-client';
import App from './components/App';

const contextData = createContext(/* defaultValue */);
export const useData = () => useContext(contextData);


export default function Context() {

	const [socket, setSocket] = useState();


	useEffect(() => {
		if (!socket) {
			setSocket(openSocket('http://localhost:3000'));
		}
	}, []);


	const value = useMemo(() => ({
		socket,
	}), [socket]);


	return !socket ? null : (
		<contextData.Provider value={value}>
			<App />
		</contextData.Provider>
	);
};