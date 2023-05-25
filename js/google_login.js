window.onload = function () {
    // 製作假按鈕
    const googleButton = document.createElement("div");
    // console.log(googleButton);
    google.accounts.id.initialize({
        client_id: "1009962510587-tekusjs8llvchnjikbp26let96r64d6r.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        googleButton,
        { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog

    //抓取原本按鈕
    let googleLogin = document.querySelector('.Google_login');
    // console.log(googleLogin);

    googleLogin.addEventListener('click', function (e) {
        e.preventDefault();
        googleButton.querySelector("div[role=button]").click();
    })
}


function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    // console.log(response.credential);

    //首先拿到token然後以點為分隔符轉為數組
    let token = response.credential.split(".");
    // console.log(token);

    // 拿到第二段token也就是负载的那段，
    // google這個回傳的token是用base64URL編碼
    // window.atob是base64解碼，有的帳號會不行所以需要先用正則取代
    // base64URL跟base64差在- +  和   _ /
    // 进行window.atob方法的 base64的解算，
    // 由于atob()方法解码无法对中文解析，所以要再用escape()方法对其重新编码 
    // 然后再用decodeURIComponent字符串解码方法，解析出字符串，然后再转成JSON对象

    let str = token[1];
    let new_str = str.replace(/\-/g, "+").replace(/\_/g, "/"); //g為全域
    let responsePayload = JSON.parse(decodeURIComponent(escape(window.atob(new_str))));


    // console.log(responsePayload);
    // console.log("ID: " + responsePayload.sub);
    // console.log('Family Name: ' + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);
    let name = responsePayload.name;
    let email = responsePayload.email;
    doSubmit(name, email);
}

function doSubmit(name, email) {

    axios.post(php_url + 'google_login.php', {
        email: email,
        name: name

    }).then((response) => {
        console.log("QQQ", response);
        alert("登入成功");
        location.href = response.data.redirect;
    })
        .catch((error) => console.log(error))
}
