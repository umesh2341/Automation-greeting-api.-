import services from '../config.js'
const {DataBase}=services;

export const dbService={
    async saveUsers(id,name,email){
        const {data,error}=await DataBase.from('users')
        .upsert([{ id,name, email }], { onConflict: 'email' }).select();
        if(error) throw error;
        return data;
    },

    async addMessage(user_id,role,message){
        const {data,error}=await DataBase.from('chats')
        .insert([{user_id,role,message}]).select()
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
    },
    async SignIn(email,password){
        const {data,error}=await DataBase.auth.signUp({
            email,
            password});
        if(error) throw error;
        return data;
    },
    async LogIn(email,password){
        const {data,error}=await DataBase.auth.signInWithPassword({
            email,
            password,
    });
        if(error) throw error;
        return data
        console.log(data)
    },
    async getUserName(id){
          const {data,error}=await DataBase.from('users').select('name').eq('id',id)
          if(error) throw error;
          return data[0].name;
    }
}

const datas=await dbService.getUserName("5fa32528-3e99-4798-a3c8-1c85aeade940")
console.log(datas[0].name)