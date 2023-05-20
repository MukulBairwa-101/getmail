const initialState = {
    popupActive:false,
    mails:[],
    mail:null
    

}
const appReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'POPUP_VISIBLE':
          state.popupActive = action.payload

        return  {...state}

        case 'FETCH_MAILS':

            state.mails = action.payload.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));

        return  {...state}

        case 'GET_ONE':

            state.mail = action.payload
            localStorage.setItem("ONE_MAIL",JSON.stringify(action.payload))

            return {...state}

        default:
            return state;   
    }
}


export default appReducer;
