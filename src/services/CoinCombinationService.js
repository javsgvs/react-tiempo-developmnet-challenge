import axios from "axios";

export class CoinCombinationService{
    
    baseURL = "http://localhost:8080/coinRestAPI/getCombination/1";

    async getCombination(dollars){
        //axios.get(this.baseURL+dollars).then(res=>res.data);
        return axios.get(this.baseURL+dollars).then(res=>JSON.stringify(res.data));
    }
}