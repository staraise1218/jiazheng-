var $wrap = $(".tanchuang-wrap");






/*$(".user_name_btn").on("click", function () {
    $(".tanchuang-wrap").get(0).style.display="flex";
    $(".tanchuang").get(0).innerHTML = `
        <input class="user_name_text" type="text" value="请输入姓名">
        <button class="over">完成</button>`
})
$(".user_tell_number").on("click", function () {
    $(".tanchuang-wrap").get(0).style.display="flex";
    $(".tanchuang").get(0).innerHTML = `
        <input class="tell_number" type="text" value="请输手机号">
        <div class="code">
            <input class="tell_code" type="text" value="请输入验证码">
            <span>获取验证码</span>
        </div>
        <button class="over">完成</button>
    `
})
$(".user_code_click").on("click", function () {
    $(".tanchuang-wrap").get(0).style.display="flex";
    $(".tanchuang").get(0).innerHTML = `
        <input class="user_code" type="text" value="请输入身份证号">
        <button class="over">完成</button>`
})
*/






$(".tanchuang").delegate(".over","click", function () {
    $(".tanchuang-wrap").get(0).style.display="none"
})






