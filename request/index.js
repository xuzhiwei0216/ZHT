export const request=(params)=>{
    //定义公共的url
    const baseURL="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
           ...params,
           url:baseURL+params.url,
           success:(result)=>{
               resolve(result.data.message);
           },
           fail:(err)=>{
               reject(err);
           }
        });
    })
}