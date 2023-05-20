export const popupActive =(data)=>{
    return {
        type:'POPUP_VISIBLE',
        payload:data
    }
}
export const fetchMails = (data)=>{
    return {
        type:'FETCH_MAILS',
        payload:data
    }
}

export const getOne = (data)=>{
    return {
        type:'GET_ONE',
        payload:data
    }
}


