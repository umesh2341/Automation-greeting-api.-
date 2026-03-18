import services from '../config.js'

const {DataBase}=services;

export const dbService={
    async saveUsers(name,email){
        const {data,error}=await DataBase.from('users')
        .upsert([{ name, email }], { onConflict: 'email' })
        if(error) throw error;
        return data;
    },

    async addMessage(uid,message){
        const {data,error}=await DataBase.from('chats')
        .insert([{user_id:uid,message}])
        if(error) throw error;
        return data;
    },
    async getHistory(uid){
        const {data,error}=await DataBase.from('chats')
        .select('*').eq('user_id',uid)
        .order('createdc_at',{ascending:false})
        .limit(10);
        if(error) throw error;
        return data;
    }
}