// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
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