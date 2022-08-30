import BaseUrl from "./BaseUrl";

export const getMosques = async (body)=>{
    try{  
        const response = await BaseUrl.get(`/api/admin/mosque/GetMosques?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`);
        return response;
    }catch(err){
        return err.response
    }
}

export const getProvinces = async ()=>{
    try{  
        const response = await BaseUrl.get(`/api/lookups/GetProvinces`);
        return response;
    }catch(err){
        return err.response
    }
}

export const SingleMosque = async (id)=>{
    try{  
        const response = await BaseUrl.get(`/api/admin/mosque/GetMosque/${id}`);
        return response;
    }catch(err){
        return err.response
    }
}

export const saveMosque = async (body)=>{
    try{  
        const response = await BaseUrl.post(`/api/admin/mosque/SaveMosque`, body);
        return response;
    }catch(err){
        return err.response
    }
}

export const updateMosque = async (body)=>{
    try{  
        const response = await BaseUrl.put(`/api/admin/mosque/UpdateMosque`, body);
        return response;
    }catch(err){
        return err.response
    }
}

export const deleteMosque = async (id)=>{
    try{  
        const response = await BaseUrl.patch(`/api/admin/mosque/DeleteMosque?mosqueId=${id}`);
        return response;
    }catch(err){
        return err.response
    }
}
