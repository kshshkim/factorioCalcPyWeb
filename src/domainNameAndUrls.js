const domainName = "privatelaw.net";


export default {
    apiUrl: "https://a."+domainName,
    cdnUrl: "https://cdn."+domainName,
    iconUrl: function (name){
        return this.cdnUrl+'/icons/'+name+'.png'}
}