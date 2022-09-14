
// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})


// 配置 axios 基地址
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
   let token = localStorage.getItem('user-token')
   if(token) config.headers.Authorization = token
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if(error.response.status === 401) {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-name')
    location.href = './login.html'
  }
  return Promise.reject(error);
})



// 请提示封装函数
const toastBox = document.querySelector('#myToast')
const toast = new bootstrap.Toast(toastBox, {
  animation: true,
  autohide: true,
  delay: 3000
})

function tip(text) {
toastBox.querySelector('.toast-body').innerHTML = text
toast.show()
}

// 名称 & 退出
const username = document.querySelector('.navbar .font-weight-bold')
const secede = document.querySelector('#logout')
if(username) username.innerHTML = localStorage.getItem('user-name')
if(secede) {
  secede.addEventListener('click' , function () {
     localStorage.removeItem('user-name')
     localStorage.removeItem('user-token')
     location.href = './login.html'
  })
}

