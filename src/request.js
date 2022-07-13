export class Request {
    constructor(url){
        this.url = url;
    }
    async get(){
        const response = await fetch(this.url); //fetch(this.url) resolve ettiğinde bize response objemiz gelecek daha sonra bu response objemsinin içinden de json objesini alacağız.
        const responseData = await response.json();//bu da bize promise döndürecek ve bu promise bize resolve ettiğinde json verimizi vermiş olacak

        return responseData;
    }
    async post(data){
        const response = await fetch(this.url,{
            method : "POST",
            body : JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const responseData = await response.json();

        return responseData;
    }
    async put(id,data){
        const response = await fetch(this.url + "/" + id,{
            method : "PUT",
            body : JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const responseData = await response.json();

        return responseData;
    }
    async delete(id){
        const response = await fetch(this.url + "/" + id,{
            method : "DELETE",
        });
        return "Veri Silindi";
    }
}