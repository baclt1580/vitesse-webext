import axios from "axios";

let instance = axios.create({
	baseURL: "/api",
	transformRequest: [],
	transformResponse: [responseInject],
	withCredentials: true
})

instance.interceptors.request.use(function (config) {
	let { auth, clear } = useAuth();
	if (is401) {
		throw Error("正在跳转");
	}
	if (!config.url?.startsWith("http://") && !config.url?.startsWith("https://")) {
		config.headers["Blade-Auth"] = auth.accessToken;
	}
	if (config.url?.startsWith("/gis-api")||config.url?.startsWith("/wind-server")) {
		config.baseURL = "";
	}
	config.params = removeEmptyProperties(config.params)
	if ((config.method == "post" || config.method == "patch") && !(config.data instanceof FormData)) {
		if (config.headers) {
			config.headers["Content-Type"] = 'application/json';
			config.headers["x-requested-with"] = "XMLHttpRequest";
		}
		if (config.data !== null) {
			config.data = JSON.stringify(config.data);
		}
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});