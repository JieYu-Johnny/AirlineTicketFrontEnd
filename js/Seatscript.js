const plane = document.querySelector(".plane");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const airline = document.getElementById("airline");
const curnum = 2;

let ticketPrice = +airline.value;
//getSeatAvailable
$(function(){
    $.ajax({
        url: "http://localhost:8085/test/seat",
        type: "get",
        dataType: "json",
        // data: flightId,
        success: function(data) {
            var str=eval(data.result)
            $(".plane").html("");
            for(var i = 0;i<str.length;i++){
                $(".plane").append('<div class="row" id = "row'+i+'">');
                var row = "row"+i;
                for(var j = 0;j<str[i].length;j++){
                    // <div className="seat occupied" id="1_1"></div>
                    if(str[i][j]===1){
                        $("#"+row).append('<div class="seat occupied" id='+i+'_'+j+'></div>');
                    }else{
                        $("#"+row).append('<div class="seat" id='+i+'_'+j+'></div>');
                    }
                }
                $(".plane").append('</div>');
            }
        },
        error: function(error) {
            window.alert("数据获取失败")
            // window.location.href = "./seatSelect.html"
        }

    });
})

//this saves selected airline index and price
const setAirlineData = (airlineIndex, airlinePrice) => {
    localStorage.setItem('selectedAirlineIndex', airlineIndex);
    localStorage.setItem('selectedAirlinePrice', airlinePrice);
}

// to update total count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//function to get data and populate UI
let populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedAirlineIndex = localStorage.getItem('selectedAirlineIndex');

    if(selectedAirlineIndex !== null) {
        airline.selectedIndex = selectedAirlineIndex;
    }
}

populateUI();

//airline select event
//this will be deleted
airline.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setAirlineData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// plane seat select event
plane.addEventListener('click', (e) => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && !e.target.classList.contains('selected') && selectedSeatsCount<curnum){
        e.target.classList.add('selected');
        updateSelectedCount();
    }else if(e.target.classList.contains('seat') && e.target.classList.contains('selected') && !e.target.classList.contains('occupied')){
        e.target.classList.remove('selected');
        updateSelectedCount();
    }


})

function submit(){
    //get selectIndex
    var index = []
    var a = plane.getElementsByClassName("selected");
    for(let i = 0;i<curnum;i++){
        index[i] = a[i].id;
    }

    var data = JSON.stringify(index)
    console.log(data)


    $.ajax({
        url: "http://localhost:8085/test/seat",
        type: "post",
        dataType: "json",
        data: {
            "selectArr": data
        },
        success: function(data) {

        },
        error: function(error) {
            window.alert("数据发送失败")
            // window.location.href = "./seatSelect.html"
        }

    });
}

//set initial count and total
updateSelectedCount();
