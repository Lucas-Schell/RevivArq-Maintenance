import axios from 'axios'
import { Constants } from 'configs/constants';
import { PostPhotos } from 'configs/api_routes'
import { GetPhotos } from 'configs/api_routes'


export const postPhotos = async (photos) => {

    const bodyFormData = new FormData();
    
    for (let index = 0; index < photos.length; index++) {
        bodyFormData.append('avatar',photos[index]);
        bodyFormData.append('name','avatar');
    }
    let route = PostPhotos;
    const response = await axios({
        method: 'post',
        url: route.url,
        timeout: 5000,
        data: bodyFormData,
        headers:{
            "Content-Type": 'multipart/form-data; boundary=--------------------------904308923144875942940971',
            'accept': '*/*'
        } 
    })
    if (response) {
        const api_response = response.data
        //console.log('api_response', api_response)
        //console.log('api_response', api_response)
        //console.log('api_response', api_response)
        //console.log('api_response', api_response)
        //console.log('api_response', api_response)
        //console.log('api_response', api_response)
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }

}

export const getPhotos = async () => {
  var param= '?file='
  var image = 'avatar-157409410385791.jpeg'
  let route = GetPhotos;
  const response = await axios({
      method: 'get',
      url: route.url+param+image,
      timeout: 5000,
      data: {},
      headers:{
          "Content-Type": 'multipart/form-data; boundary=--------------------------904308923144875942940971',
          'accept': '*/*'
      } 
  })
  if (response) {
      
      const api_response = response.data
      console.log(api_response)
      return api_response
  } else {
      return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
  }

}

/*export const postPhotos = async (PostPhotos, data) =>{
    let options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST'
    };
  
    options.body = new FormData();
    for (let key in data) {
      options.body.append(key, data[key]);
    }
  
    return fetch(PostPhotos, options)
        .then(async response => {
          const responseJson = await response.json();
            //You put some checks here
            return responseJson;
        });
  }*/