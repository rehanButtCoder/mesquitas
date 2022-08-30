import BaseUrl from "./BaseUrl";

export const getEvents = async (body) => {
    try {
        const response = await BaseUrl.get(`/api/admin/event/GetEvents?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const getEventMosques = async () => {
    try {
        const response = await BaseUrl.get(`/api/admin/event/GetMosques`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const saveEvent = async (body) => {
    try {
        const response = await BaseUrl.post(`/api/admin/event/SaveEvent`, body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const getSingleEvent = async (id) => {
    try {
        const response = await BaseUrl.get(`/api/admin/event/GetEvent/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const updateEvent = async (body) => {
    try {
        const response = await BaseUrl.put(`/api/admin/Event/UpdateEvent`, body);
        return response;
    } catch (err) {
        return err.response
    }
}
export const deleteEvent = async (id) => {
    try {
        const response = await BaseUrl.patch(`/api/admin/event/DeleteEvent?eventid=${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}
