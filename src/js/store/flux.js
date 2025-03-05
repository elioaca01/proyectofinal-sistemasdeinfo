const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: JSON.parse(localStorage.getItem("token")) || null
		},
		actions: {
			addToken: (tk) =>{
				setStore({token:tk})
				localStorage.setItem("token",JSON.stringify(tk))
				// console.log(getStore().token)
				console.log(localStorage.getItem("token"))
			},
 			close: () =>{
				setStore({
					token:null
				})
				localStorage.removeItem("token")
			}
		}
	};
};

export default getState;
