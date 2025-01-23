function append(value) {
    const display = document.getElementById("display");
    display.value += value;

}

function abcd()
{
    document.getElementById("display").value="";
    
}

function calculate() {
    const display = document.getElementById("display");
    try {

        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}



