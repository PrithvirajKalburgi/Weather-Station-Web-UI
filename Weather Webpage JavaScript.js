const url = "http://webapi19sa-1.course.tamk.cloud/v1/weather/";

function getData(name, period) {
    let xhr = new XMLHttpRequest();

    let link = url + name;
    if (period !== "") {
        link += period;
    }

    xhr.open("GET", link, false);
    xhr.send();
    if (xhr.status == 200 && xhr.readyState == 4) {
        return xhr.responseText;
    }
}

function mainTable() {
    let span = document.getElementById("table");
    let html = `<table><tr> 
                    <th>Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Value</th>
                </tr>`

    
    const data = JSON.parse(getData("",""));

    for (let i = 0; i < 30; i++) {
        const element = data[i];
        const time = element.date_time.replace("Z", "T").split("T");
        const type = Object.keys(element.data)[0];
        const value = element.data[type];

        html += `<tr> 
                    <th>${i+1}</th>
                    <th>${time[0]}</th>
                    <th>${time[1]}</th>
                    <th>${type}</th>
                    <th>${value}</th>
                </tr>`
    }

    
    html += "</table>";
    span.innerHTML = html;
}


function drawTable(name, period) {
    let span = document.getElementById("table");
    let html = `<table><tr> 
                    <th>Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Value</th>
                </tr>`

    
    const data = JSON.parse(getData(name, period));

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const time = element.date_time.replace("Z", "T").split("T");
        const value = element[name];       html += `<tr> 
                    <th>${i+1}</th>
                    <th>${time[0]}</th>
                    <th>${time[1]}</th>
                    <th>${value}</th>
                    </tr>`
    }

    
    html += "</table>";
    span.innerHTML = html;

    chart(data, name)
}


function info() {
    const Name = "Prithviraj Kalburgi";
    const Email = "prithviraj.kalburgi@tuni.fi";
    const Groupnumber = 3005;
    let content = document.getElementById('table');
    content.innerHTML = ` <table>
       
     <th>First and Last name</th>
            <th>Email ID </th>
            <th>Course number</th>
        </tr>
        <tr style = "background-color: skyblue;">
            <td>${Name}</td>
            <td>${Email}</td>
            <td>${Groupnumber}</td>
        </tr>
    </table>`;

}



function chart(data, name) {

    let value = [];
    let labels = [];


    let canvas = document.getElementById("canvas");
    if (canvas == null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
    } else {
        canvas.remove();
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
    }
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        labels[i] = element.date_time;
        value[i] = element[name];
    }
        

    const myChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Chart',
                data: value,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



    let div = document.getElementById("chart");
div.appendChild(canvas)
}


function dropDownTimeMenu(name) {
    let span = document.getElementById("timeMenu");

    let menu = document.getElementById("dropDownTimeMenu");
    if (menu == null) {
        menu = document.createElement("select");
        menu.setAttribute("id", "dropDownTimeMenu");
    }
    else {
        menu.remove();
        menu = document.createElement("select");
        menu.setAttribute("id", "dropDownTimeMenu");
    }    

    let html = `
    <option value=" " onclick="drawPage("", "${name}")> Now </option>
    <option value="23" onclick="drawPage("23", "${name}");> 24h </option>
    <option value="47" onclick="drawPage("47", "${name}")> 48h </option>
    <option value="71" onclick="drawPage("71", "${name}")> 72h </option>
    <option value="167" onclick="drawPage("167", "${name}")> 1w</option>`;

    menu.innerHTML = html;
    span.appendChild(menu);
}



window.onload = function() {
    mainTable();
}

function drawPage(period, name) {
    dropDownTimeMenu(name)
    drawTable(name, period);
}

function page() {
    mainTable();
}

function temperature() {
    drawTable("temperature"); 
    
}

function wind() {
    drawTable("wind_speed");
}
