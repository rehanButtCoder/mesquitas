import BaseUrl from "./BaseUrl";

export const uploadFile = async (body)=>{
    try{  
        const response = await BaseUrl.post(`/api/files`, body);
        return response;
    }catch(err){
        return err.response
    }
}