document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const msg = document.getElementById("message").value;

    document.getElementById("result").textContent =
        `${name} さん、メッセージありがとうございました！`;
});
