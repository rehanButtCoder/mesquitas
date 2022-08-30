import BaseUrl from "./BaseUrl";

export const getDua = async (body)=>{
    try{  
        const response = await BaseUrl.get(`/api/admin/dua/GetDuas?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`);
        return response;
    }catch(err){
        return err.response
    }
}
export const getDuaId = async ()=>{
    try{  
        const response = await BaseUrl.get(`/api/lookups/GetDuaTypes`);
        return response;
    }catch(err){
        return err.response
    }
}

export const saveDua = async (body)=>{
    try{  
        const response = await BaseUrl.post(`/api/admin/dua/SaveDua`, body);
        return response;
    }catch(err){
        return err.response
    }
}

export const updateDua = async (body)=>{
    try{  
        const response = await BaseUrl.put(`/api/admin/dua/UpdateDua`, body);
        return response;
    }catch(err){
        return err.response
    }
}

export const singleDua = async (id)=>{
    try{  
        const response = await BaseUrl.get(`/api/admin/dua/GetDua/${id}`);
        return response;
    }catch(err){
        return err.response
    }
}

export const deleteDua = async (id)=>{
    try{  
        const response = await BaseUrl.patch(`/api/admin/dua/DeleteDua?duaId=${id}`);
        return response;
    }catch(err){
        return err.response
    }
}