module.exports = {
	devServer: {

	proxy: { // 匹配 /dev-api 开头的请求， 
		'/dev-api': { // 目标服务器, 代理访问到 https://localhost:8001 
			target: 'http://localhost:4000', 
			// 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据， 
			// 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
			changOrigin: true, //开启代理
			pathRewrite: { 
			// 会将 /dev-api 替换为 '',也就是 /dev-api 会移除， 
			// 如 /dev-api/db.json 代理到 https://localhost:8080/db.json 
			'^/dev-api': '', 
			}
		}
	}
}, 
lintOnSave: false, // 关闭格式检查
productionSourceMap: false // 打包时不会生成 .map 文件，加快打包速度 
}
