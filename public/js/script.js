function bmi() {
    bbb = document.getElementById("b");
    bbb.addEventListener("click", () => {
        a = document.getElementById('height').value;
        num = parseInt(a);
        ba = document.getElementById('weight').value;
        num1 = parseInt(ba);
        ge = document.getElementById('Age').value;
        num3 = parseInt(ge);
        result = 10 * num1 + 6.25 * num - (5 * num3) + 5;
        document.getElementById("textarea").innerHTML = "your maintanance calories is : " + result;
    });
}