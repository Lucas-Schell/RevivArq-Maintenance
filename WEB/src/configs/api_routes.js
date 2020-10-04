import { api } from "configs/";

// Authentication
export const api_login = () => {
    return { method: "post", url: `${api}/login` };
};
export const api_verify_token = () => {
    return { method: "get", url: `${api}/login/token` };
};

export const authentication = {
    login: api_login,
    verify: api_verify_token
};
// API Instagram
export const api_get_gallery = () => {
    return { method: "get", url: `${api}/InstaGaleria` };
};

export const instagramGaleria = {
    method: "get",
    url: `${api}/InstaGaleria`
};
// User CRUD
export const api_list_users = () => {
    return { method: "get", url: `${api}/users` };
};
export const api_create_user = () => {
    return { method: "post", url: `${api}/users` };
};
export const api_read_user = (id) => {
    return { method: "get", url: `${api}/users/${id}` };
};
export const api_update_user = () => {
    return { method: "put", url: `${api}/auth_user` };
};
export const api_delete_user = (id) => {
    return { method: "post", url: `${api}/users/${id}` };
};

export const crud_user = {
    create: api_create_user,
    read: api_read_user,
    update: api_update_user,
    delete: api_delete_user,
    list: api_list_users
};

// Reforms
//export const api_get_reforms_id	 		=                   { method: 'get', url: `${api}/reform/id` }

export const api_get_reforms = () => {
    return { method: "get", url: `${api}/reform` };
};

export const GetReforms = {
    method: "get",
    url: `${api}/reform`
};

export const UpdateReforms = {
    method: "put",
    url: `${api}/reform`
};
export const PostReform = {
    method: "post",
    url: `${api}/reform`
};

export const PostGeneratePassCode = {
    method: "post",
    url: `${api}/recover/generatePassCode`
};

export const PostSendNewPassword = {
    method: "post",
    url: `${api}/recover/recoveryPassword`
};

// Photos
export const PostPhotos = {
    method: "post",
    url: `${api}/photos/`
};

export const GetPhotos = {
    method: "get",
    url: `${api}/photos/image/`
};
export const api_auth_user = {
    method: "get",
    url: `${api}/auth_user`
};

export const api_get_user = {
    method: "get",
    url: `${api}/auth_user/user`
};
