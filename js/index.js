document.addEventListener('DOMContentLoaded', async function () {
    let res = await axios.get('/dashboard')
    console.log(res)
})