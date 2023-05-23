// 愛心收藏
var heartsList = document.querySelectorAll('.bi-suit-heart');
    heartPopup = document.getElementsByClassName('heart_popup')[0];
    heartRemove = document.getElementsByClassName('heart_remove')[0];


heartsList.forEach(function (heart) {

    // 綁定滑鼠懸停事件
    heart.addEventListener('mouseenter', function (e) {
        if (!heart.classList.contains("bi-suit-heart-fill") || !heart.classList.contains("bi-suit-heart-clicked")) {
            heart.classList.remove("bi-suit-heart");
            heart.classList.add("bi-suit-heart-fill");
            e.stopPropagation();
        }
    });

    // 綁定滑鼠離開事件
    heart.addEventListener('mouseleave', function (e) {
        if (!heart.classList.contains("bi-suit-heart-fill") || !heart.classList.contains("bi-suit-heart-clicked")) {
            heart.classList.remove("bi-suit-heart-fill");
            heart.classList.add("bi-suit-heart");
            e.stopPropagation();
        }
    });

    heart.addEventListener('click', function (e) {
        if (!heart.classList.contains("bi-suit-heart-clicked")) {
            heart.classList.remove("bi-suit-heart");
            heart.classList.add("bi-suit-heart-fill");
            heart.classList.add("bi-suit-heart-clicked");
            heartPopup.classList.add("active");
            setTimeout(() => {
                heartPopup.classList.remove("active");
            }, 1500); // 3000 毫秒後自動隱藏，可以根據需要調整時間
            e.preventDefault();
            e.stopPropagation();
        } else {
            heart.classList.remove("bi-suit-heart-fill");
            heart.classList.add("bi-suit-heart");
            heart.classList.remove("bi-suit-heart-clicked");
            heartRemove.classList.add("active");
            setTimeout(() => {
                heartRemove.classList.remove("active");
            }, 1500); // 3000 毫秒後自動隱藏，可以根據需要調整時間
            e.preventDefault();
            e.stopPropagation();
        }
    });

});